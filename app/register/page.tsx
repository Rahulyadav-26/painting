"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, CheckCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuthStore } from "@/store/authStore";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const { register, isAuthenticated, checkAuth } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectUrl);
    }
  }, [isAuthenticated, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      router.push(redirectUrl);
    } else {
      setError(result.error || "Unable to register account. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#FFF5F7] to-[#FDE2EE] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-pink-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF7096] to-[#FFA0B4] text-white shadow-md mb-4 text-2xl">
              ✨
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-bold text-gray-900 tracking-tight"
            >
              Join the Atelier
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Create an account to track artwork shipments, access digital high-res files & enjoy patron perks
            </p>
          </div>

          {/* Checkout Banner */}
          {redirectUrl.includes("checkout") && (
            <div className="mb-6 p-3.5 rounded-2xl bg-pink-50 border border-pink-200 text-[#D6657E] text-xs flex items-center gap-2.5">
              <ShieldCheck size={16} className="shrink-0 text-[#FF7096]" />
              <span>Create your collector profile to register artwork provenance and complete checkout.</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Deepesh Sharma"
                  required
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#FFF8F9] border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7096] transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deepesh@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#FFF8F9] border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7096] transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password (min. 6 characters)
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 text-xs bg-[#FFF8F9] border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7096] transition-all text-gray-800 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#FFF8F9] border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7096] transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7096] to-[#E0659B] text-white font-semibold text-xs shadow-md shadow-pink-200 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Collector Account</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer separator */}
          <div className="mt-8 pt-6 border-t border-pink-100 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                href={`/login${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="font-bold text-[#FF7096] hover:underline inline-flex items-center gap-0.5 ml-1"
              >
                Sign In
              </Link>
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Safe, confidential & instant access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </MainLayout>
  );
}
