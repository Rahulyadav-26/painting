"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  LogOut,
  LogIn,
  UserPlus,
  Clock,
  ArrowRight,
  Truck,
  AlertCircle,
  Check,
  X,
  Hourglass,
  Lock,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";

type AccountTab = "orders" | "addresses" | "membership" | "approvals";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchUserOrders = () => {
    if (isAuthenticated && user) {
      setOrdersLoading(true);
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.orders) {
            setOrders(data.orders);
          }
        })
        .catch((err) => console.error("Error fetching orders:", err))
        .finally(() => setOrdersLoading(false));
    }
  };

  const fetchAdminOrders = () => {
    setAdminLoading(true);
    fetch("/api/orders/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) {
          setAdminOrders(data.orders);
        }
      })
      .catch((err) => console.error("Error fetching admin orders:", err))
      .finally(() => setAdminLoading(false));
  };

  useEffect(() => {
    fetchUserOrders();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (activeTab === "approvals") {
      fetchAdminOrders();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleVerifyAction = async (orderId: string, action: "approve" | "reject") => {
    const pin = typeof window !== "undefined"
      ? window.prompt(
          action === "approve"
            ? "Enter Atelier Curator Security PIN to authenticate and confirm bank credit (Default: 992639):"
            : "Enter Atelier Curator Security PIN to authenticate rejection of this payment (Default: 992639):",
          "992639"
        )
      : null;
    if (!pin) return;

    setActionLoadingId(orderId);
    try {
      const res = await fetch("/api/orders/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action, adminPin: pin }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminOrders();
        fetchUserOrders();
      } else {
        alert(data.error || "Authentication / verification action failed.");
      }
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-[#FFF5F7] py-20 min-h-[70vh] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-[#FF7096] rounded-full animate-spin mb-4" />
          <p className="text-xs font-semibold text-gray-500">Checking your atelier credentials...</p>
        </div>
      </MainLayout>
    );
  }

  // Guest State (Not Logged In)
  if (!isAuthenticated || !user) {
    return (
      <MainLayout>
        <div className="bg-[#FFF5F7] py-16 min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-pink-100 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF7096] to-[#FFA0B4] flex items-center justify-center text-white text-3xl mx-auto mb-5 shadow-md">
              🎨
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            >
              Collector Atelier Portal
            </h1>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed">
              Sign in to manage your digital painting downloads, certificates of authenticity, and physical artwork shipping.
            </p>

            <div className="space-y-3">
              <Link
                href="/login?redirect=/account"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7096] to-[#E0659B] text-white font-semibold text-xs shadow-md shadow-pink-200 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <LogIn size={15} />
                <span>Sign In to Account</span>
              </Link>

              <Link
                href="/register?redirect=/account"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#FFF5F7] border border-pink-200 text-gray-800 hover:bg-pink-100 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={15} />
                <span>Create a New Account</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-pink-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Patron authentication with secure token session</span>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Authenticated State
  const displayName = user.name || "Art Patron";
  const userInitial = displayName.charAt(0).toUpperCase();
  const memberSince = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  const latestShipping = orders.length > 0 ? orders[0].shippingAddress : null;
  const isCuratorAdmin = user.role === "ADMIN";

  return (
    <MainLayout>
      <div className="bg-[#FFF5F7] py-12 min-h-[80vh]">
        <div className="section-container">
          {/* User Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB6C1] to-[#FF7096] flex items-center justify-center text-white text-3xl font-bold shadow-md shrink-0">
              {userInitial}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {displayName}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7096] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                  {isCuratorAdmin ? "Curator Admin" : "Patron Member"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {user.email} • Member since {memberSince}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/wishlist"
                className="btn-pill bg-[#FFF8F5] border border-pink-100 text-xs text-gray-700 hover:bg-pink-50 px-4 py-2 flex items-center gap-1.5"
              >
                <Heart size={14} className="text-[#FF7096]" />
                Wishlist ({wishlistCount})
              </Link>

              <button
                onClick={handleLogout}
                className="btn-pill bg-white border border-red-100 text-xs text-red-500 hover:bg-red-50 px-4 py-2 flex items-center gap-1.5 transition-colors"
                title="Sign Out"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Account Tabs */}
          <div className="flex items-center gap-2 border-b border-pink-100 pb-3 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "orders"
                  ? "bg-[#FF7096] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              📦 My Art Orders & Downloads ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "addresses"
                  ? "bg-[#FF7096] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              📍 Delivery Addresses
            </button>
            <button
              onClick={() => setActiveTab("membership")}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "membership"
                  ? "bg-[#FF7096] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              ✨ Collector Perks
            </button>

            {/* Admin Verification Panel Tab */}
            {isCuratorAdmin && (
              <button
                onClick={() => setActiveTab("approvals")}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === "approvals"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                <ShieldCheck size={13} className="text-amber-500" />
                <span>Bank Payment Approvals</span>
              </button>
            )}
          </div>

          {/* Orders Tab Content */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-6">
              {ordersLoading ? (
                <div className="bg-white rounded-3xl p-10 border border-pink-100 text-center">
                  <div className="w-8 h-8 border-3 border-pink-200 border-t-[#FF7096] rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-gray-500">Loading your art acquisitions...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-pink-100 text-center max-w-lg mx-auto shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-2xl mx-auto mb-3">
                    🎨
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">No Orders Yet</h3>
                  <p className="text-xs text-gray-500 mb-6">
                    You haven&apos;t acquired any paintings yet. Explore our curated collections to start your gallery.
                  </p>
                  <Link href="/shop" className="btn-pill btn-primary text-xs px-6 py-2.5">
                    Browse Paintings
                  </Link>
                </div>
              ) : (
                orders.map((order) => {
                  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  const isPending =
                    order.paymentStatus === "Pending Verification" ||
                    order.status === "Payment Verification Pending";
                  const isRejected =
                    order.paymentStatus === "Rejected" ||
                    order.status === "Cancelled";

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm transition-all hover:border-pink-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block font-mono">
                              Order #{order.id}
                            </span>
                            {order.trackingNumber && (
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                                Tracking: {order.trackingNumber}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">Placed on {orderDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {isPending ? (
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200">
                              <Hourglass size={13} className="text-amber-600" /> Payment Under Verification
                            </span>
                          ) : isRejected ? (
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full flex items-center gap-1 border border-red-200">
                              <AlertCircle size={13} className="text-red-500" /> Payment Rejected (Uncredited)
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
                              <ShieldCheck size={13} /> {order.status || "Confirmed & Verified"}
                            </span>
                          )}

                          <span className="text-sm font-black text-gray-900">
                            {formatPrice(order.totalPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shrink-0">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl">
                                  🎨
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 text-xs">
                              <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                              <p className="text-gray-500">
                                by {item.artist} • Qty {item.quantity || 1}
                              </p>

                              {isPending ? (
                                <p className="text-amber-700 font-medium mt-1 flex items-center gap-1">
                                  <Lock size={12} /> Digital Certificate will be unlocked once bank receipt is confirmed at 9926398315@axl.
                                </p>
                              ) : isRejected ? (
                                <p className="text-red-600 font-medium mt-1">
                                  Payment reference could not be matched with bank statement.
                                </p>
                              ) : (
                                <p className="text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                  <Check size={12} /> Digital Certificate of Authenticity issued and sent to {order.userEmail || user.email}
                                </p>
                              )}
                            </div>
                            {item.slug && (
                              <Link
                                href={`/product/${item.slug}`}
                                className="text-xs text-[#FF7096] font-semibold hover:underline flex items-center gap-1 shrink-0"
                              >
                                View Piece <ExternalLink size={12} />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-[11px] text-gray-500 flex-wrap gap-2">
                        {order.shippingAddress && (
                          <span className="flex items-center gap-1">
                            <Truck size={12} className="text-[#FF7096]" />
                            Ships to: {order.shippingAddress.address},{" "}
                            {order.shippingAddress.city} {order.shippingAddress.pincode}
                          </span>
                        )}
                        <span className="text-gray-500 font-mono">
                          Payment: {order.paymentMethod} {order.utrNumber ? `• UTR: ${order.utrNumber}` : ""}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Admin Bank Approvals Tab */}
          {activeTab === "approvals" && isCuratorAdmin && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-amber-500" />
                    Atelier Bank Payment Verification Ledger
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Cross-reference buyer UTR numbers with your bank SMS / app for <strong>9926398315@axl</strong>.
                  </p>
                </div>
                <button
                  onClick={fetchAdminOrders}
                  className="text-xs text-[#FF7096] font-semibold hover:underline"
                >
                  Refresh Ledger
                </button>
              </div>

              {adminLoading ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  Loading ledger records...
                </div>
              ) : adminOrders.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {adminOrders.map((ord) => {
                    const isPending =
                      ord.paymentStatus === "Pending Verification" ||
                      ord.status === "Payment Verification Pending";
                    const isVerified = ord.paymentStatus === "Verified";
                    const isRejected = ord.paymentStatus === "Rejected";

                    return (
                      <div
                        key={ord.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isPending
                            ? "border-amber-200 bg-amber-50/40"
                            : isVerified
                            ? "border-emerald-100 bg-white"
                            : "border-red-100 bg-gray-50 opacity-70"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <span className="font-mono font-bold text-xs text-gray-900 block">
                              Order #{ord.id} • {ord.userName} ({ord.userEmail})
                            </span>
                            <span className="text-[11px] text-gray-500">
                              Placed on {new Date(ord.createdAt).toLocaleString("en-IN")}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-gray-900">
                              {formatPrice(ord.totalPrice)}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                isPending
                                  ? "bg-amber-100 text-amber-800 border-amber-300"
                                  : isVerified
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }`}
                            >
                              {ord.paymentStatus || ord.status}
                            </span>
                          </div>
                        </div>

                        {/* UTR Information */}
                        <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">
                              Claimed UPI Reference (UTR)
                            </span>
                            <span className="font-mono font-bold text-gray-900 text-sm">
                              {ord.utrNumber || "None (COD/Gateway)"}
                            </span>
                          </div>

                          {/* Action Buttons for Pending Orders */}
                          {isPending && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleVerifyAction(ord.id, "approve")}
                                disabled={actionLoadingId === ord.id}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors disabled:opacity-50"
                              >
                                <Check size={13} />
                                <span>Credit Confirmed in Bank</span>
                              </button>

                              <button
                                onClick={() => handleVerifyAction(ord.id, "reject")}
                                disabled={actionLoadingId === ord.id}
                                className="px-3 py-1.5 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 font-semibold text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                              >
                                <X size={13} />
                                <span>No Credit (Reject)</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Audit Information */}
                        {ord.verifiedBy && (
                          <div className={`text-[10px] px-2.5 py-1.5 rounded-xl border my-2 flex items-center justify-between ${
                            ord.paymentStatus === "Verified" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"
                          }`}>
                            <span><strong>Audit Note:</strong> {ord.verificationNote || (ord.paymentStatus === "Verified" ? "Bank credit matched on 9926398315@axl" : "Uncredited")}</span>
                            <span>Authenticated by: <strong>{ord.verifiedBy}</strong></span>
                          </div>
                        )}

                        <div className="text-[11px] text-gray-500">
                          Items: {ord.items.map((i: any) => `${i.title} (x${i.quantity})`).join(", ")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab Content */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm relative">
                <span className="absolute top-4 right-4 text-[10px] font-bold text-[#FF7096] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                  Primary Address
                </span>
                <h3 className="font-bold text-sm text-gray-900 mb-2">Registered Atelier Shipping</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {latestShipping?.fullName || displayName}
                  <br />
                  {latestShipping?.address || "Flat 402, Lotus Residency, 12th Main Road"}
                  <br />
                  {latestShipping?.apartment ? `${latestShipping.apartment}, ` : "Indiranagar, "}
                  {latestShipping?.city || "Bengaluru"},{" "}
                  {latestShipping?.state || "Karnataka"} – {latestShipping?.pincode || "560038"}
                  <br />
                  Email: {user.email}
                  {latestShipping?.phone && (
                    <>
                      <br />
                      Phone: {latestShipping.phone}
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Membership Tab */}
          {activeTab === "membership" && (
            <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={24} className="text-[#FF7096]" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-bold text-gray-900"
                >
                  Collector Atelier Membership
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                As a registered collector with Minted Whimsy, your perks include:
              </p>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Instant High-Resolution digital copy sent directly to your email upon verified payment</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>24-Hour VIP Private Access to all new weekly paintings before public release</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Complimentary insured shipping on all orders over $35</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
