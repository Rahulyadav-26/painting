import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getOrdersByUserId, createOrder, isUtrAlreadyUsed } from "@/lib/orderService";
import { validateUpiUtr } from "@/lib/utrValidator";
import { calculateVerifiedOrderPricing } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const orders = await getOrdersByUserId(user.id);
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to retrieve orders." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Authentication required to place an order." }, { status: 401 });
    }

    const body = await request.json();
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      totalPrice,
      utrNumber,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order must contain at least one artwork item." }, { status: 400 });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      return NextResponse.json({ error: "Incomplete shipping address information." }, { status: 400 });
    }

    // Security Fix (SEC-01): Payment method validation & strict authentication
    const rawMethod = String(paymentMethod || "").trim();
    const isUpiPayment = rawMethod.toLowerCase().includes("upi");
    const isCodPayment = rawMethod.toLowerCase().includes("cod") || rawMethod.toLowerCase().includes("cash on delivery");

    // Only Dynamic UPI QR (with validated UTR) or COD can be placed directly via /api/orders.
    // Card/online gateway payments MUST go through /api/payment/verify-razorpay-payment.
    if (!isUpiPayment && !isCodPayment) {
      return NextResponse.json(
        { error: "Invalid payment method. Online card payments must be authenticated via the secure payment gateway." },
        { status: 400 }
      );
    }

    let verifiedUtr: string | undefined = undefined;

    if (isUpiPayment) {
      const validation = validateUpiUtr(utrNumber);
      if (!validation.isValid) {
        return NextResponse.json(
          { error: validation.error || "A valid 12-digit bank transaction reference (UTR) is strictly required to verify your UPI payment." },
          { status: 400 }
        );
      }

      verifiedUtr = validation.normalizedUtr!;

      // Check for duplicate UTR fraud
      if (isUtrAlreadyUsed(verifiedUtr)) {
        return NextResponse.json(
          {
            error:
              "This UPI Transaction (UTR) number has already been recorded for another order. Each payment requires a unique bank reference.",
          },
          { status: 409 }
        );
      }
    }

    // Security Fix (SEC-02): Calculate and verify item pricing server-side
    let verifiedPricing;
    try {
      verifiedPricing = calculateVerifiedOrderPricing(items);
    } catch (err: any) {
      return NextResponse.json({ error: err.message || "Invalid artwork items in order." }, { status: 400 });
    }

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
      paymentMethod: isUpiPayment ? rawMethod : "Cash on Delivery (COD)",
      paymentStatus: "Pending Verification",
      status: isUpiPayment ? "Payment Verification Pending" : "Confirmed",
      utrNumber: isUpiPayment ? verifiedUtr : undefined,
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to process order." }, { status: 500 });
  }
}
