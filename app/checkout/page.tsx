"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ArrowLeft,
  Sparkles,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
  Check,
  UserCheck,
  Zap,
  HelpCircle,
  X,
  Clock,
  Smartphone,
  Hourglass,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import { formatPrice } from "@/lib/utils";
import { loadRazorpayScript } from "@/lib/loadRazorpay";
import UpiQrPaymentModal from "@/components/checkout/UpiQrPaymentModal";

type PaymentMethod = "upi_qr" | "razorpay" | "cod";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickLoginLoading, setQuickLoginLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentTransactionId, setPaymentTransactionId] = useState("");

  // UPI Dynamic QR Modal State
  const [showUpiQrModal, setShowUpiQrModal] = useState(false);
  const [generatedOrderRef, setGeneratedOrderRef] = useState("");

  // Razorpay Sandbox modal state
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [pendingGatewayOrder, setPendingGatewayOrder] = useState<any>(null);
  const [simulatedSubMethod, setSimulatedSubMethod] = useState<"upi" | "card" | "netbanking">("upi");

  const { items, totalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated, isLoading: authLoading, checkAuth, login } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  // Form states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("Flat 402, Lotus Residency, 12th Main Road");
  const [apartment, setApartment] = useState("Indiranagar");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560038");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi_qr");

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, [checkAuth]);

  // Pre-fill user data once authenticated
  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.name) setFullName(user.name);
    }
  }, [user]);

  const handleQuickDemoLogin = async () => {
    setQuickLoginLoading(true);
    const res = await login("collector@mintedwhimsy.com", "ArtPass123!");
    setQuickLoginLoading(false);
    if (res.success) {
      addToast("Signed in as Demo Collector! 🎨", "success");
    } else {
      addToast(res.error || "Failed to sign in demo collector", "error");
    }
  };

  if (!mounted || authLoading) {
    return (
      <MainLayout>
        <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#FFF5F7]">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-[#FF7096] rounded-full animate-spin mb-4" />
          <p className="text-xs font-semibold text-gray-500">
            Verifying your collector session & security credentials...
          </p>
        </div>
      </MainLayout>
    );
  }

  const subtotal = totalPrice();
  const qualifiesForFreeShipping = subtotal >= 5000;
  const shippingFee = subtotal === 0 || qualifiesForFreeShipping ? 0 : 350;
  const grandTotal = subtotal + shippingFee;

  // 1. Unauthenticated Gateway State: User MUST login/signup before buying
  if (!isAuthenticated || !user) {
    return (
      <MainLayout>
        <div className="bg-[#FFF5F7] py-12 px-4 min-h-[85vh]">
          <div className="max-w-4xl mx-auto">
            {/* Header info */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7096] uppercase tracking-widest bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 mb-3">
                <Lock size={12} /> Authentication Required
              </span>
              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
              >
                Sign In to Complete Your Art Purchase
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                To guarantee artwork provenance, issue your personalized Certificate of
                Authenticity, and provide live transit tracking, every collector must be logged in.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Sign In / Sign Up Call to Action */}
              <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl space-y-6">
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <span>Atelier Collector Access</span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Choose one of the secure authentication options below to continue to checkout.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/login?redirect=/checkout"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7096] to-[#E0659B] text-white font-semibold text-xs shadow-md shadow-pink-200 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <LogIn size={15} />
                    <span>Sign In to Existing Account</span>
                  </Link>

                  <Link
                    href="/register?redirect=/checkout"
                    className="w-full py-3.5 px-6 rounded-2xl bg-white border border-pink-300 text-gray-800 hover:bg-pink-50 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus size={15} />
                    <span>Create a New Collector Account</span>
                  </Link>
                </div>

                {/* Quick 1-click test button */}
                <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-pink-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      Quick Evaluation Mode
                    </span>
                    <span className="text-[10px] bg-pink-100 text-[#FF7096] px-2 py-0.5 rounded-full font-bold">
                      One-Click
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Instantly sign in as seeded collector (<code>collector@mintedwhimsy.com</code>) to
                    test checkout immediately.
                  </p>
                  <button
                    onClick={handleQuickDemoLogin}
                    disabled={quickLoginLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-900 text-white font-medium text-xs hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {quickLoginLoading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles size={13} className="text-pink-300" />
                    )}
                    <span>Continue with One-Click Demo Account</span>
                  </button>
                </div>

                {/* Guarantees */}
                <div className="space-y-2.5 pt-4 border-t border-pink-100 text-xs text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                    <span>Personalized Certificate of Authenticity tied to your profile</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck size={16} className="text-blue-500 shrink-0" />
                    <span>Direct insured tracking notifications & delivery coordination</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-[#FF7096] shrink-0" />
                    <span>Lifetime digital access to 300 DPI high-res artwork archives</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Preview */}
              <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                  <h3 className="font-bold text-sm text-gray-900">Your Art Selection</h3>
                  <span className="text-xs text-gray-500 font-medium">
                    {items.reduce((sum, it) => sum + it.quantity, 0)} Items
                  </span>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-6 text-xs text-gray-400">
                    <p>No items in cart.</p>
                    <Link href="/shop" className="text-[#FF7096] font-semibold hover:underline mt-2 inline-block">
                      Browse Gallery
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                      {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-900 truncate">
                              {product.title}
                            </h4>
                            <p className="text-[11px] text-gray-500">
                              by {product.artist} • Qty {quantity}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-gray-800">
                            {formatPrice((product.salePrice ?? product.price) * quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-pink-100 pt-3 space-y-1.5 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insured Delivery</span>
                        <span className="text-emerald-600 font-semibold">
                          {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-pink-100 text-sm font-bold text-gray-900">
                        <span>Grand Total</span>
                        <span className="text-[#D6657E] text-lg font-black">
                          {formatPrice(grandTotal)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // If cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FFF5F7]">
          <div className="text-5xl mb-4">🛍️</div>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            No Artworks in Cart
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Please select at least one painting before heading to checkout.
          </p>
          <Link href="/shop" className="btn-pill btn-primary text-xs px-6 py-2.5">
            Browse Paintings
          </Link>
        </div>
      </MainLayout>
    );
  }

  // 2. Order Complete Screen
  if (orderComplete) {
    return (
      <MainLayout>
        <div className="bg-[#FFF5F7] py-16 min-h-[80vh] flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center border border-pink-100 shadow-xl animate-in fade-in duration-300">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                paymentMethod === "upi_qr"
                  ? "bg-amber-50 text-amber-600 border border-amber-200"
                  : "bg-emerald-50 text-emerald-500"
              }`}
            >
              {paymentMethod === "upi_qr" ? (
                <Hourglass size={40} className="text-amber-600 animate-spin" />
              ) : (
                <CheckCircle size={44} className="text-emerald-500" />
              )}
            </div>

            <span
              className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border ${
                paymentMethod === "upi_qr"
                  ? "text-amber-800 bg-amber-100 border-amber-300"
                  : "text-[#FF7096] bg-pink-50 border-pink-100"
              }`}
            >
              {paymentMethod === "upi_qr"
                ? "Payment Authentication in Progress"
                : "Payment Confirmed & Verified"}
            </span>

            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-2"
            >
              {paymentMethod === "upi_qr"
                ? "Order Placed — Bank Credit Authentication Pending"
                : "Thank You for Supporting Original Art!"}
            </h1>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {paymentMethod === "upi_qr" ? (
                <>
                  Your order <strong className="text-gray-900 font-mono">{orderId}</strong> has been
                  registered with UTR <strong className="text-gray-900 font-mono">{paymentTransactionId}</strong>.
                  Our atelier accounts team is independently verifying credit receipt of{" "}
                  <strong className="text-gray-900">{formatPrice(grandTotal)}</strong> at{" "}
                  <strong>9926398315@axl</strong>. Your high-resolution certificate and custom art packaging
                  will be released once the bank settlement is confirmed.
                </>
              ) : (
                <>
                  Your order <strong className="text-gray-900 font-mono">{orderId}</strong> has been
                  successfully verified and recorded to your collector profile (
                  <strong>{user.email}</strong>). We are preparing the certificate of authenticity and
                  bespoke art packaging.
                </>
              )}
            </p>

            <div className="bg-[#FFF8F5] p-5 rounded-2xl border border-pink-100 text-left text-xs mb-8 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-bold text-gray-900 font-mono">{orderId}</span>
              </div>
              {paymentTransactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction Ref / UTR:</span>
                  <span className="font-mono text-emerald-600 font-semibold">
                    {paymentTransactionId}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Collector:</span>
                <span className="font-semibold text-gray-800">
                  {fullName} ({user.email})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-semibold text-gray-800">
                  {city}, {pincode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Gateway:</span>
                <span className="font-semibold uppercase text-[#FF7096]">
                  {paymentMethod === "upi_qr"
                    ? "Dynamic UPI QR (Verified)"
                    : paymentMethod === "razorpay"
                    ? "Razorpay Gateway"
                    : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Archive Delivery:</span>
                <span className="font-semibold text-emerald-600">
                  Digital Certificate sent to {user.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account" className="btn-pill btn-primary text-xs px-7 py-3">
                View in My Account Orders
              </Link>
              <Link
                href="/shop"
                className="btn-pill bg-white text-gray-700 border border-pink-200 hover:bg-pink-50 text-xs px-6 py-3"
              >
                Continue Exploring Art
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // 3. Payment Success Callback for Dynamic UPI QR
  const handleUpiQrSuccess = async (details: {
    upiId: string;
    utrNumber: string;
    orderRef: string;
  }) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: {
            fullName,
            phone,
            address,
            apartment,
            city,
            state,
            pincode,
          },
          paymentMethod: `Dynamic UPI QR (${details.upiId})`,
          utrNumber: details.utrNumber,
          subtotal,
          shippingFee,
          totalPrice: grandTotal,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Payment verification failed. Invalid transaction reference.");
      }

      setOrderId(data.order.id);
      setPaymentTransactionId(details.utrNumber);
      clearCart();
      setShowUpiQrModal(false);
      setOrderComplete(true);
      addToast("Order submitted for bank credit verification! 🎨", "info");
    } catch (err: any) {
      console.error("UPI order error:", err);
      addToast(err.message || "Payment declined.", "error");
      throw err; // Propagate to modal so it immediately displays the decline reason
    }
  };

  // 4. Razorpay Verification Handler
  const handleVerifyRazorpayPayment = async (verificationPayload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature?: string;
  }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/payment/verify-razorpay-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...verificationPayload,
          items,
          shippingAddress: {
            fullName,
            phone,
            address,
            apartment,
            city,
            state,
            pincode,
          },
          subtotal,
          shippingFee,
          totalPrice: grandTotal,
          paymentMethod: `Razorpay (${simulatedSubMethod.toUpperCase()})`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        addToast(data.error || "Payment verification failed.", "error");
        setLoading(false);
        return;
      }

      setOrderId(data.order.id);
      setPaymentTransactionId(data.paymentId || verificationPayload.razorpay_payment_id);
      clearCart();
      setLoading(false);
      setShowSandboxModal(false);
      setOrderComplete(true);
      addToast("Payment Verified & Order Confirmed! 🎨", "success");
    } catch (err) {
      console.error("Verification error:", err);
      addToast("Failed to verify payment with server.", "error");
      setLoading(false);
    }
  };

  // 5. Checkout Submit Handler
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      addToast("Please fill in all required shipping fields.", "warning");
      return;
    }

    // Method A: Dynamic UPI QR Code (Primary & Direct)
    if (paymentMethod === "upi_qr") {
      const newRef = `MW-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderRef(newRef);
      setShowUpiQrModal(true);
      return;
    }

    // Method B: Cash on Delivery
    if (paymentMethod === "cod") {
      setLoading(true);
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            shippingAddress: {
              fullName,
              phone,
              address,
              apartment,
              city,
              state,
              pincode,
            },
            paymentMethod: "Cash on Delivery (COD)",
            subtotal,
            shippingFee,
            totalPrice: grandTotal,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          addToast(data.error || "Failed to process order.", "error");
          setLoading(false);
          return;
        }

        setOrderId(data.order.id);
        clearCart();
        setLoading(false);
        setOrderComplete(true);
        addToast("COD Order confirmed! 🎨", "success");
      } catch (err) {
        console.error("COD submit error:", err);
        addToast("Network error. Please try again.", "error");
        setLoading(false);
      }
      return;
    }

    // Method C: Razorpay Flow
    setLoading(true);
    try {
      const orderRes = await fetch("/api/payment/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          amount: grandTotal,
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        addToast(orderData.error || "Unable to initiate payment with Razorpay.", "error");
        setLoading(false);
        return;
      }

      if (!orderData.isSandbox) {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          addToast("Could not load Razorpay SDK. Check your internet connection.", "error");
          setLoading(false);
          return;
        }

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Minted Whimsy Atelier",
          description: "Original Artwork Acquisition & Provenance Certificate",
          order_id: orderData.orderId,
          prefill: {
            name: fullName,
            email: email,
            contact: phone,
          },
          theme: {
            color: "#FF7096",
          },
          handler: async function (response: any) {
            await handleVerifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              addToast("Payment window closed", "info");
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setLoading(false);
      } else {
        setPendingGatewayOrder(orderData);
        setShowSandboxModal(true);
        setLoading(false);
      }
    } catch (err) {
      console.error("Razorpay initiation error:", err);
      addToast("Payment gateway connection error. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-10 min-h-[85vh]">
        <div className="section-container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/cart" className="hover:text-[#FF7096] flex items-center gap-1 font-medium">
                <ArrowLeft size={14} /> Back to Cart
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Secure Checkout</span>
            </div>

            {/* Authenticated user pill */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-pink-200 text-xs shadow-xs">
              <UserCheck size={14} className="text-emerald-500" />
              <span className="text-gray-600">
                Logged in as <strong className="text-gray-900">{user.name || user.email}</strong>
              </span>
              <span className="text-[10px] bg-pink-100 text-[#FF7096] px-2 py-0.5 rounded-full font-bold">
                Patron
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Checkout Form (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Step 1: Contact Information */}
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF7096] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  Collector Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Account Email (Verified) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      readOnly
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 cursor-not-allowed font-medium"
                      title="Bound to your authenticated patron account"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      Digital authenticity certificates will be delivered here
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Phone Number (Delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF7096] text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  Art Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-600 font-medium mb-1">Collector Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-gray-600 font-medium mb-1">Street Address / House No. *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat, Studio, or Street"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Locality / Landmark</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF7096]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Gateway Selection */}
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FF7096] text-white flex items-center justify-center text-xs">
                      3
                    </span>
                    Payment Selection
                  </h2>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck size={12} /> 256-Bit Encrypted
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Dynamic UPI QR Option (Default & Recommended) */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "upi_qr"
                        ? "border-[#FF7096] bg-pink-50/40 ring-2 ring-pink-200"
                        : "border-pink-100 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi_qr"}
                      onChange={() => setPaymentMethod("upi_qr")}
                      className="accent-[#FF7096] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                          <QrCode size={15} className="text-[#FF7096]" />
                          Dynamic UPI QR Code (Direct Bank Transfer)
                        </span>
                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#FF7096] to-[#E0659B] px-2.5 py-0.5 rounded-full shadow-xs">
                          Fast & Recommended
                        </span>
                      </div>
                      <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">
                        Instant Dynamic QR code generated with the <strong>exact order amount ({formatPrice(grandTotal)})</strong> and live 5-minute countdown timer. Scan using <strong>Google Pay, PhonePe, Paytm, or BHIM</strong>.
                      </p>

                      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700 font-bold">
                          GPay
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-purple-700 font-bold">
                          PhonePe
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-blue-700 font-bold">
                          Paytm
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-green-700 font-bold">
                          BHIM UPI
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold ml-auto flex items-center gap-1">
                          <Clock size={11} /> 5-Min Live Timer
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Razorpay Gateway Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-[#FF7096] bg-pink-50/40 ring-2 ring-pink-200"
                        : "border-pink-100 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="accent-[#FF7096] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                          <Zap size={14} className="text-[#FF7096]" />
                          Cards & NetBanking (Razorpay)
                        </span>
                      </div>
                      <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">
                        Pay with <strong>Credit / Debit Cards (Visa, Mastercard, RuPay)</strong> or <strong>NetBanking (50+ Banks)</strong>.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#FF7096] bg-pink-50/40 ring-2 ring-pink-200"
                        : "border-pink-100 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#FF7096] mt-0.5"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        <Banknote size={14} className="text-gray-600" />
                        Cash on Delivery (COD)
                      </span>
                      <p className="text-gray-500 text-[11px] mt-1">
                        Inspect the original painting upon physical courier delivery before making payment.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5 sticky top-28">
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-4">
                <h3 className="font-bold text-sm text-gray-900 border-b border-pink-100 pb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-gray-500 font-normal">
                    {items.reduce((acc, it) => acc + it.quantity, 0)} Paintings
                  </span>
                </h3>

                {/* Items preview */}
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Qty: {quantity} • {product.size}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-gray-800">
                        {formatPrice((product.salePrice ?? product.price) * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost breakdown */}
                <div className="border-t border-pink-100 pt-3 flex flex-col gap-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Artworks Subtotal</span>
                    <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Insured Art Packaging & Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-800">{formatPrice(shippingFee)}</span>
                    )}
                  </div>
                  <div className="flex justify-between pt-2 border-t border-pink-100 text-sm">
                    <span className="font-bold text-gray-900">Total Payable</span>
                    <span className="text-xl font-black text-[#D6657E]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-pill btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Connecting Payment Gateway...
                    </>
                  ) : paymentMethod === "upi_qr" ? (
                    <>
                      <QrCode size={16} />
                      Generate Dynamic UPI QR • {formatPrice(grandTotal)}
                    </>
                  ) : paymentMethod === "razorpay" ? (
                    <>
                      <Zap size={16} />
                      Pay with Razorpay • {formatPrice(grandTotal)}
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Complete COD Order • {formatPrice(grandTotal)}
                    </>
                  )}
                </button>

                {/* Guarantees */}
                <div className="pt-2 text-[11px] text-gray-500 space-y-2 border-t border-pink-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#3FA66B] shrink-0" />
                    <span>Signed Certificate of Authenticity Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-[#4A90D9] shrink-0" />
                    <span>Custom Wooden Crate & Insurance Covered</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Dynamic UPI QR Payment Modal with Live Timer */}
      {showUpiQrModal && (
        <UpiQrPaymentModal
          isOpen={showUpiQrModal}
          amount={grandTotal}
          orderRef={generatedOrderRef}
          customerName={fullName}
          customerEmail={email}
          onPaymentSuccess={handleUpiQrSuccess}
          onClose={() => setShowUpiQrModal(false)}
        />
      )}

      {/* Razorpay Sandbox Simulation Modal */}
      {showSandboxModal && pendingGatewayOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pink-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSandboxModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3395FF] to-[#0D6EFD] text-white flex items-center justify-center font-bold text-lg shadow-md">
                $
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-gray-900 text-base">Razorpay Checkout</h3>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    Test Mode
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Minted Whimsy Atelier • {pendingGatewayOrder.orderId}
                </p>
              </div>
            </div>

            <div className="bg-[#FFF8F5] p-3.5 rounded-2xl border border-pink-100 flex items-center justify-between mb-5">
              <span className="text-xs text-gray-600 font-medium">Payable Amount:</span>
              <span className="text-xl font-black text-gray-900">
                {formatPrice(grandTotal)}
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Select Simulation Instrument:
              </label>

              <div
                onClick={() => setSimulatedSubMethod("upi")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  simulatedSubMethod === "upi"
                    ? "border-[#3395FF] bg-blue-50/50 ring-1 ring-blue-300 font-bold text-gray-900"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <QrCode size={16} className="text-blue-500" />
                <span>UPI Transfer (Google Pay / PhonePe / BHIM)</span>
              </div>

              <div
                onClick={() => setSimulatedSubMethod("card")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  simulatedSubMethod === "card"
                    ? "border-[#3395FF] bg-blue-50/50 ring-1 ring-blue-300 font-bold text-gray-900"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <CreditCard size={16} className="text-purple-500" />
                <span>Test Card (Visa 4111 2222 3333 4444)</span>
              </div>

              <div
                onClick={() => setSimulatedSubMethod("netbanking")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  simulatedSubMethod === "netbanking"
                    ? "border-[#3395FF] bg-blue-50/50 ring-1 ring-blue-300 font-bold text-gray-900"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Building size={16} className="text-emerald-500" />
                <span>Net Banking (HDFC / ICICI / SBI)</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  const testPaymentId = `pay_rzp_${Date.now()}_${Math.random()
                    .toString(36)
                    .substring(2, 8)}`;
                  handleVerifyRazorpayPayment({
                    razorpay_order_id: pendingGatewayOrder.orderId,
                    razorpay_payment_id: testPaymentId,
                    razorpay_signature: `sig_sandbox_valid_${Date.now()}`,
                  });
                }}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#3395FF] to-[#0D6EFD] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                <span>Authorize & Pay {formatPrice(grandTotal)}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSandboxModal(false);
                  addToast("Payment cancelled by buyer", "info");
                }}
                className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-700 text-center"
              >
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
