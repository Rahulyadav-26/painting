import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getOrderById } from "@/lib/orderService";
import { deliverOrderDigitalProducts } from "@/lib/emailService";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required to access order delivery." },
        { status: 401 }
      );
    }

    const { id: orderId } = await context.params;
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Security Check: Order must belong to the user or user must be an ADMIN
    if (order.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Access forbidden: You can only access your own orders." },
        { status: 403 }
      );
    }

    // Must be paid/verified to receive the product
    if (order.paymentStatus !== "Verified") {
      return NextResponse.json(
        {
          error:
            "This order payment has not been verified yet. Products are dispatched automatically once payment is verified.",
        },
        { status: 400 }
      );
    }

    // Deliver product PDF directly to the authenticated user's login email
    const delivery = await deliverOrderDigitalProducts(orderId, user.email);

    return NextResponse.json({
      success: true,
      message: `Product PDF has been dispatched to ${user.email}`,
      delivery,
    });
  } catch (error: any) {
    console.error("POST /api/orders/[id]/send-email error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch product email.", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
