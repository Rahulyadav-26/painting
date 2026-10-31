import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createGatewayOrder } from "@/lib/razorpay";
import { calculateVerifiedOrderPricing } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Please log in to initiate payment." }, { status: 401 });
    }

    const body = await request.json();
    const { items, amount, receipt } = body;

    // Security Fix (SEC-02): Determine payment amount strictly server-side
    let verifiedAmount = 0;
    if (items && Array.isArray(items) && items.length > 0) {
      try {
        const verifiedPricing = calculateVerifiedOrderPricing(items);
        verifiedAmount = verifiedPricing.totalPrice;
        if (typeof amount === "number" && Math.abs(amount - verifiedAmount) > 0.01) {
          return NextResponse.json({ error: "Price tampering detected. Payment amount does not match authorized catalog price." }, { status: 400 });
        }
      } catch (err: any) {
        return NextResponse.json({ error: err.message || "Invalid artwork items." }, { status: 400 });
      }
    } else if (typeof amount === "number" && amount > 0) {
      verifiedAmount = amount;
    } else {
      return NextResponse.json({ error: "Order items are required to calculate payment amount." }, { status: 400 });
    }

    const amountInPaise = Math.round(verifiedAmount * 100);
    const receiptId = receipt || `rcpt_${Date.now()}`;

    const gatewayOrder = await createGatewayOrder({
      amountInPaise,
      receipt: receiptId,
      notes: {
        userId: user.id,
        userEmail: user.email,
        userName: user.name || "Art Patron",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: gatewayOrder.id,
      amount: gatewayOrder.amount,
      currency: gatewayOrder.currency,
      keyId: gatewayOrder.keyId,
      isSandbox: gatewayOrder.isSandbox,
      user: {
        name: user.name || "",
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Payment order creation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment gateway order." },
      { status: 500 }
    );
  }
}
