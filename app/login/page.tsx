"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, AlertCircle, UserCheck, LogOut } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuthStore } from "@/store/authStore";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const { user, login, logout, isAuthenticated, isLoading, checkAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please fill in both your email and password.");
      return;
    }

    setLoading(true);
    const result = await login(trimmedEmail, password);
    setLoading(false);

    if (result.success) {
      // Use window.location.href to guarantee fresh cookies and updated server session state
      window.location.href = redirectUrl;
    } else {
      setError(result.error || "Unable to sign in. Please verify your credentials.");
    }
  };


  const handleSwitchAccount = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#FFF5F7] to-[#FDE2EE] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-6 relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF7096] to-[#FFA0B4] text-white shadow-md mb-4 text-2xl">
              🎨
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-bold text-gray-900 tracking-tight"
            >
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Sign in to manage your collection, artwork orders & digital downloads
            </p>
          </div>

          {/* Active Session Notice if already logged in */}
          {isAuthenticated && user && (
            <div className="mb-6 p-4 rounded-2xl bg-pink-50 border border-pink-200 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <UserCheck size={18} className="text-[#FF7096] shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">
                      Already signed in as {user.name || "Patron"}
                    </p>
                    <p className="text-gray-500 text-[11px] font-mono">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  disabled={loggingOut}
                  className="text-[11px] text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 shrink-0"
                >
                  <LogOut size={12} />
                  <span>{loggingOut ? "Signing out..." : "Switch"}</span>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-pink-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = redirectUrl;
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#FF7096] text-white font-semibold text-xs hover:opacity-95 text-center transition-all shadow-xs"
                >
                  Continue to {redirectUrl === "/account" ? "Your Dashboard" : "Checkout"} →
                </button>
              </div>
            </div>
          )}

          {/* Tab Switcher: Sign In vs Create Account */}
          <div className="flex bg-[#FFF0F4] p-1 rounded-2xl mb-6 border border-pink-100">
            <span className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#FF7096] rounded-xl shadow-xs cursor-default">
              Sign In
            </span>
            <Link
              href={`/register${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="flex-1 py-2 text-center text-xs font-bold text-gray-600 hover:text-[#FF7096] transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Checkout Banner */}
          {redirectUrl.includes("checkout") && (
            <div className="mb-6 p-3.5 rounded-2xl bg-pink-50 border border-pink-200 text-[#D6657E] text-xs flex items-center gap-2.5">
              <Sparkles size={16} className="shrink-0 text-[#FF7096]" />
              <span>Please sign in to complete your artwork checkout and receive your Certificate of Authenticity.</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs space-y-2">
              <div className="flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0 text-red-500" />
                <span className="font-medium">{error}</span>
              </div>
              {error.toLowerCase().includes("invalid") && (
                <div className="pt-2 border-t border-red-100 flex items-center justify-between text-[11px] text-gray-700">
                  <span>New user? First create your account:</span>
                  <Link
                    href={`/register${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                    className="font-bold text-[#FF7096] hover:underline flex items-center gap-1"
                  >
                    <span>Register Here</span>
                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          )}


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="artcollector@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#FFF8F9] border border-pink-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7096] transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7096] to-[#E0659B] text-white font-semibold text-xs shadow-md shadow-pink-200 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer separator */}
          <div className="mt-8 pt-6 border-t border-pink-100 text-center">
            <p className="text-xs text-gray-600">
              New to Minted Whimsy?{" "}
              <Link
                href={`/register${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="font-bold text-[#FF7096] hover:underline inline-flex items-center gap-0.5 ml-1"
              >
                Create an Account
              </Link>
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>256-bit encrypted secure session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </MainLayout>
  );
}
