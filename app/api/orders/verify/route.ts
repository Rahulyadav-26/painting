import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { updateOrderPaymentVerification, getAllOrders } from "@/lib/orderService";

const ADMIN_VERIFICATION_PIN = process.env.ADMIN_VERIFICATION_PIN || "992639";

/**
 * Helper to authenticate curator admin request
 */
async function authenticateAdmin(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return { error: "Authentication required or session expired. Please log in as an administrator.", status: 401, user: null };
  }

  // Strict Role Check: Must be ADMIN
  if (user.role !== "ADMIN") {
    return {
      error: "Access Forbidden: Only authenticated curators with ADMIN privileges are authorized to access the payment verification ledger.",
      status: 403,
      user: null,
    };
  }

  return { error: null, status: 200, user };
}

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateAdmin(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const allOrders = await getAllOrders();
    return NextResponse.json({ success: true, orders: allOrders });
  } catch (error) {
    console.error("GET /api/orders/verify error:", error);
    return NextResponse.json({ error: "Failed to fetch orders." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateAdmin(request);
    if (auth.error || !auth.user) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { orderId, action, adminPin, note } = body;

    if (!orderId || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "orderId and valid action ('approve' | 'reject') are required." },
        { status: 400 }
      );
    }

    // Optional 2-Factor Curator Security PIN authentication
    if (adminPin && adminPin !== ADMIN_VERIFICATION_PIN) {
      return NextResponse.json(
        { error: "Invalid Atelier Curator Security PIN. Action aborted." },
        { status: 401 }
      );
    }

    const updated = await updateOrderPaymentVerification(orderId, action, {
      id: auth.user.id,
      email: auth.user.email,
      note: note || (action === "approve" ? "Bank credit matched and authenticated" : "Uncredited / invalid reference rejected"),
    });

    if (!updated) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message:
        action === "approve"
          ? "Payment verified by authorized admin. Certificate of Authenticity and order confirmed."
          : "Payment rejected. Order cancelled.",
      order: updated,
    });
  } catch (error) {
    console.error("POST /api/orders/verify error:", error);
    return NextResponse.json({ error: "Verification update failed." }, { status: 500 });
  }
}
