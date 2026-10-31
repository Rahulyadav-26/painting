import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { verifyGatewaySignature } from "@/lib/razorpay";
import { createOrder } from "@/lib/orderService";
import { calculateVerifiedOrderPricing } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized session. Please log in again." }, { status: 401 });
    }

    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      shippingAddress,
      subtotal,
      shippingFee,
      totalPrice,
      paymentMethod = "Razorpay (Online Payment)",
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment gateway identifiers." },
        { status: 400 }
      );
    }

    const verification = verifyGatewaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!verification.isValid) {
      return NextResponse.json(
        { error: verification.error || "Payment verification failed. Invalid gateway signature." },
        { status: 400 }
      );
    }

    // Security Fix (SEC-02): Calculate and verify item pricing server-side
    let verifiedPricing;
    try {
      verifiedPricing = calculateVerifiedOrderPricing(items);
    } catch (err: any) {
      return NextResponse.json({ error: err.message || "Invalid artwork items in order." }, { status: 400 });
    }

    // Payment is authentic and verified -> Save confirmed order to user account
    const methodDescription = verification.isSandbox
      ? `[TEST MODE] ${paymentMethod} • Txn: ${razorpay_payment_id}`
      : `${paymentMethod} • Txn: ${razorpay_payment_id}`;

    const newOrder = await createOrder({
      userId: user.id,
      userEmail: user.email,
      userName: user.name || shippingAddress.fullName,
      items: verifiedPricing.items,
      subtotal: verifiedPricing.subtotal,
      shippingFee: verifiedPricing.shippingFee,
      totalPrice: verifiedPricing.totalPrice,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        address: shippingAddress.address.trim(),
        apartment: shippingAddress.apartment?.trim() || "",
        city: shippingAddress.city?.trim() || "",
        state: shippingAddress.state?.trim() || "",
        pincode: shippingAddress.pincode?.trim() || "",
      },
      paymentMethod: methodDescription,
      paymentStatus: "Verified",
      status: "Confirmed",
    });

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and order recorded.",
      order: newOrder,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal error processing payment verification." },
      { status: 500 }
    );
  }
}
