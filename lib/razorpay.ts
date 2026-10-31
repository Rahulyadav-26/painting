import Razorpay from "razorpay";
import crypto from "crypto";

const key_id = process.env.RAZORPAY_KEY_ID || "";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "";

export const isRazorpayConfigured = Boolean(
  key_id &&
  key_secret &&
  key_id.startsWith("rzp_") &&
  !key_id.includes("placeholder")
);

export const razorpayInstance = isRazorpayConfigured
  ? new Razorpay({
      key_id,
      key_secret,
    })
  : null;

export interface CreateOrderParams {
  amountInPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}

export async function createGatewayOrder(params: CreateOrderParams) {
  if (isRazorpayConfigured && razorpayInstance) {
    try {
      const order = await razorpayInstance.orders.create({
        amount: params.amountInPaise,
        currency: "INR",
        receipt: params.receipt,
        notes: params.notes,
      });

      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        isSandbox: false,
        keyId: key_id,
      };
    } catch (err) {
      console.error("Razorpay order creation failed, falling back to simulated sandbox:", err);
    }
  }

  // Sandbox Mode: Generates a valid test order ID for simulation
  const mockOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  return {
    id: mockOrderId,
    amount: params.amountInPaise,
    currency: "INR",
    isSandbox: true,
    keyId: key_id || "rzp_test_mintedwhimsy_sandbox",
  };
}

export interface VerificationResult {
  isValid: boolean;
  isSandbox: boolean;
  error?: string;
}

export function verifyGatewaySignature(params: {
  orderId: string;
  paymentId: string;
  signature?: string;
}): VerificationResult {
  const { orderId, paymentId, signature } = params;

  if (!orderId || !paymentId || !signature) {
    return {
      isValid: false,
      isSandbox: false,
      error: "Missing required signature verification parameters.",
    };
  }

  // 1. Production or Configured Live Gateway
  if (isRazorpayConfigured && key_secret) {
    try {
      const body = `${orderId}|${paymentId}`;
      const expectedSignature = crypto
        .createHmac("sha256", key_secret)
        .update(body)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf8");
      const actualBuf = Buffer.from(signature, "utf8");

      if (expectedBuf.length !== actualBuf.length) {
        return { isValid: false, isSandbox: false, error: "Invalid signature length." };
      }

      const isValid = crypto.timingSafeEqual(expectedBuf, actualBuf);
      return { isValid, isSandbox: false };
    } catch (err) {
      console.error("Gateway signature verification failed:", err);
      return { isValid: false, isSandbox: false, error: "Internal verification error." };
    }
  }

  // 2. Production Environment Guard: Never allow sandbox simulation in production
  if (process.env.NODE_ENV === "production") {
    console.error("CRITICAL: Payment gateway is unconfigured in production. Sandbox simulation denied.");
    return {
      isValid: false,
      isSandbox: false,
      error: "Payment gateway is not properly configured on production server.",
    };
  }

  // 3. Strict Sandbox / Development Simulation Guard
  // In development, only allow if orderId, paymentId, and signature match strict sandbox simulation schemas
  const isSandboxOrder = orderId.startsWith("order_test_");
  const isSandboxPayment = paymentId.startsWith("pay_rzp_");
  const isSandboxSig = signature.startsWith("sig_sandbox_valid_");

  if (isSandboxOrder && isSandboxPayment && isSandboxSig) {
    return { isValid: true, isSandbox: true };
  }

  return {
    isValid: false,
    isSandbox: true,
    error: "Invalid sandbox test signature format. Forged signatures rejected.",
  };
}
