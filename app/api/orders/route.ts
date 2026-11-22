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

    const effectiveAddress = {
      fullName: (shippingAddress?.fullName || user.name || "Valued Collector").trim(),
      phone: (shippingAddress?.phone || "").trim() || "N/A",
      address: (shippingAddress?.address || "").trim() || "Digital Delivery (Instant Download)",
      apartment: (shippingAddress?.apartment || "").trim(),
      city: (shippingAddress?.city || "").trim() || "Digital",
      state: (shippingAddress?.state || "").trim() || "Digital",
      pincode: (shippingAddress?.pincode || "").trim() || "000000",
    };

    // Security Fix (SEC-01): Payment method validation & strict authentication
    const rawMethod = String(paymentMethod || "").trim();
    const isUpiPayment = rawMethod.toLowerCase().includes("upi");
    const isPhysicalPayment = rawMethod.toLowerCase().includes("physical");

    // All direct orders require verified prepaid payment (UPI QR with validated UTR).
    // Online card payments go through /api/payment/verify-razorpay-payment.
    // There is NO unpaid COD option — user must pay first.
    if (!isUpiPayment) {
      return NextResponse.json(
        { error: "Prepaid payment required. Please pay first online via UPI QR or Cards/NetBanking. There is no Cash on Delivery (COD) option." },
        { status: 400 }
      );
    }

    if (isPhysicalPayment) {
      if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.pincode || !shippingAddress?.phone) {
        return NextResponse.json(
          { error: "Complete delivery address (street, city, state, pincode) and 10-digit mobile number are required for Physical Delivery." },
          { status: 400 }
        );
      }
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
      verifiedPricing = calculateVerifiedOrderPricing(items, rawMethod);
    } catch (err: any) {
      return NextResponse.json({ error: err.message || "Invalid artwork items in order." }, { status: 400 });
    }

    const newOrder = await createOrder({
      userId: user.id,
      userEmail: user.email,
      userName: user.name || effectiveAddress.fullName,
      items: verifiedPricing.items,
      subtotal: verifiedPricing.subtotal,
      shippingFee: verifiedPricing.shippingFee,
      totalPrice: verifiedPricing.totalPrice,
      shippingAddress: effectiveAddress,
      paymentMethod: rawMethod || "Dynamic UPI QR (Prepaid)",
      paymentStatus: "Pending Verification",
      status: "Payment Verification Pending",
      utrNumber: verifiedUtr,
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to process order." }, { status: 500 });
  }
}
