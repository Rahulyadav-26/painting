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
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { items, totalPrice, clearCart } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  // Form states
  const [email, setEmail] = useState("artcollector@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [fullName, setFullName] = useState("Rahul Verma");
  const [address, setAddress] = useState("Flat 402, Lotus Residency, 12th Main Road");
  const [apartment, setApartment] = useState("Indiranagar");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560038");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("collector@okhdfcbank");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FFF5F7]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF69B4]" />
        </div>
      </MainLayout>
    );
  }

  const subtotal = totalPrice();
  const qualifiesForFreeShipping = subtotal >= 5000;
  const shippingFee = subtotal === 0 || qualifiesForFreeShipping ? 0 : 350;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      addToast("Please fill in all required shipping fields.", "warning");
      return;
    }

    setLoading(true);
    // Simulate order processing
    await new Promise((r) => setTimeout(r, 1200));

    const generatedId = `MW-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    clearCart();
    setLoading(false);
    setOrderComplete(true);
  };

  // If order complete screen
  if (orderComplete) {
    return (
      <MainLayout>
        <div className="bg-[#FFF5F7] py-16 min-h-[80vh] flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center border border-pink-100 shadow-xl">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={44} className="text-emerald-500" />
            </div>

            <span className="text-xs font-bold text-[#FF69B4] uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full">
              Order Confirmed
            </span>

            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-2"
            >
              Thank You for Supporting Original Art!
            </h1>

            <p className="text-sm text-gray-600 mb-6">
              Your order <strong className="text-gray-900 font-mono">{orderId}</strong> has been
              received by the artists. We are preparing the certificate of authenticity and custom
              art packaging.
            </p>

            <div className="bg-[#FFF8F5] p-5 rounded-2xl border border-pink-100 text-left text-xs mb-8 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping to:</span>
                <span className="font-semibold text-gray-800">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-semibold text-gray-800">
                  {city}, {pincode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span className="font-semibold uppercase text-[#FF69B4]">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Dispatch:</span>
                <span className="font-semibold text-emerald-600">2-3 Business Days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop" className="btn-pill btn-primary text-xs px-7 py-3">
                Continue Exploring Art
              </Link>
              <Link
                href="/account"
                className="btn-pill bg-white text-gray-700 border border-pink-200 hover:bg-pink-50 text-xs px-6 py-3"
              >
                View Order History
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // If cart is empty
  if (items.length === 0) {
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

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-10 min-h-[85vh]">
        <div className="section-container">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/cart" className="hover:text-[#FF69B4] flex items-center gap-1 font-medium">
              <ArrowLeft size={14} /> Back to Cart
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Secure Checkout</span>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Checkout Form (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Step 1: Contact Information */}
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF69B4] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Phone Number (with SMS updates) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF69B4] text-white flex items-center justify-center text-xs">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-gray-600 font-medium mb-1">Street Address / House No. *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">Locality / Area</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8F5] border border-pink-100 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF69B4] text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  Payment Method
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#FF69B4] bg-pink-50/50 shadow-sm text-[#FF69B4]"
                        : "border-pink-100 bg-[#FFF8F5] text-gray-600"
                    }`}
                  >
                    <QrCode size={20} className="mx-auto mb-1.5" />
                    <span className="text-xs font-semibold block">UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === "card"
                        ? "border-[#FF69B4] bg-pink-50/50 shadow-sm text-[#FF69B4]"
                        : "border-pink-100 bg-[#FFF8F5] text-gray-600"
                    }`}
                  >
                    <CreditCard size={20} className="mx-auto mb-1.5" />
                    <span className="text-xs font-semibold block">Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-[#FF69B4] bg-pink-50/50 shadow-sm text-[#FF69B4]"
                        : "border-pink-100 bg-[#FFF8F5] text-gray-600"
                    }`}
                  >
                    <Building size={20} className="mx-auto mb-1.5" />
                    <span className="text-xs font-semibold block">NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#FF69B4] bg-pink-50/50 shadow-sm text-[#FF69B4]"
                        : "border-pink-100 bg-[#FFF8F5] text-gray-600"
                    }`}
                  >
                    <Banknote size={20} className="mx-auto mb-1.5" />
                    <span className="text-xs font-semibold block">COD</span>
                  </button>
                </div>

                {/* Method Specific Details */}
                {paymentMethod === "upi" && (
                  <div className="bg-[#FFF8F5] p-4 rounded-2xl border border-pink-100 text-xs">
                    <label className="block text-gray-700 font-semibold mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi, name@okhdfcbank"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      Supports Google Pay, PhonePe, Paytm, BHIM & all major banking UPI apps.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="bg-[#FFF8F5] p-4 rounded-2xl border border-pink-100 text-xs space-y-3">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-pink-200 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Expiry MM/YY</label>
                        <input
                          type="text"
                          placeholder="08/28"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-pink-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-pink-200 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="bg-[#FFF8F5] p-4 rounded-2xl border border-pink-100 text-xs">
                    <label className="block text-gray-700 font-semibold mb-1.5">
                      Select Your Bank
                    </label>
                    <select className="w-full px-3.5 py-2 rounded-xl bg-white border border-pink-200 focus:outline-none">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-[#FFF8F5] p-4 rounded-2xl border border-pink-100 text-xs text-gray-700">
                    <p className="font-semibold mb-1">Cash / Pay on Delivery Available</p>
                    <p className="text-gray-500 text-[11px]">
                      You can pay via Cash or UPI QR scan directly to the courier when your artwork
                      arrives in its custom protective crate.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col gap-4">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-lg font-bold text-gray-900 border-b border-pink-100 pb-3"
                >
                  Order Summary ({items.length} works)
                </h3>

                {/* Items preview list */}
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
                      Securing Your Artwork...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Complete Order • {formatPrice(grandTotal)}
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
    </MainLayout>
  );
}
