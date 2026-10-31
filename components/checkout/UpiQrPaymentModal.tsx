"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  X,
  QrCode,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { validateUpiUtr } from "@/lib/utrValidator";

interface UpiQrPaymentModalProps {
  isOpen: boolean;
  amount: number;
  orderRef: string;
  customerName: string;
  customerEmail: string;
  onPaymentSuccess: (details: {
    upiId: string;
    utrNumber: string;
    orderRef: string;
  }) => Promise<void>;
  onClose: () => void;
}

const MERCHANT_UPI =
  process.env.NEXT_PUBLIC_MERCHANT_UPI_ID || "9926398315@axl";
const MERCHANT_NAME =
  process.env.NEXT_PUBLIC_MERCHANT_NAME || "Deepesh sharma";

export default function UpiQrPaymentModal({
  isOpen,
  amount,
  orderRef,
  customerName,
  customerEmail,
  onPaymentSuccess,
  onClose,
}: UpiQrPaymentModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes
  const [copied, setCopied] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);

  // Generate NPCI Standard UPI URI
  const upiUri = `upi://pay?pa=${MERCHANT_UPI}&pn=${encodeURIComponent(
    MERCHANT_NAME
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
    `Artwork Order ${orderRef}`
  )}&tr=${orderRef}`;

  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL(upiUri, {
        width: 320,
        margin: 2,
        color: {
          dark: "#1A1A1A",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "M",
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Failed to generate UPI QR:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      generateQR();
      setTimeLeft(300);
      setVerifying(false);
      setUtrNumber("");
      setErrorMsg(null);
    }
  }, [isOpen, amount, orderRef]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCopyUpi = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(MERCHANT_UPI);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmPayment = async () => {
    setErrorMsg(null);
    const cleanUtr = utrNumber.trim();

    // 1. Strict Banking Validation Layer (Immediate 0ms decline for wrong/dummy details)
    const validation = validateUpiUtr(cleanUtr);
    if (!validation.isValid) {
      setErrorMsg(`Payment Declined: ${validation.error || "Invalid 12-digit UPI transaction reference (UTR)."}`);
      return;
    }

    setVerifying(true);

    try {
      await onPaymentSuccess({
        upiId: MERCHANT_UPI,
        utrNumber: validation.normalizedUtr!,
        orderRef,
      });
      // onPaymentSuccess closes modal upon successful recording
    } catch (err: any) {
      // Immediate decline feedback from server
      setErrorMsg(`Payment Declined: ${err.message || "Transaction reference could not be authenticated by bank gateway."}`);
    } finally {
      setVerifying(false);
    }
  };

  if (!isOpen) return null;

  const isExpired = timeLeft <= 0;
  const progressPct = ((300 - timeLeft) / 300) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-pink-100 relative my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="Close modal"
        >
          <X size={20} />
        </button>

        <div>
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FF7096] uppercase tracking-wider bg-pink-50 px-3.5 py-1 rounded-full border border-pink-100 mb-2">
              <QrCode size={13} /> Secure Bank Transfer
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl font-bold text-gray-900"
            >
              Scan & Pay via UPI
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Scan with Google Pay, PhonePe, Paytm, or BHIM.
            </p>
          </div>

          {/* Amount & Timer Banner */}
          <div className="bg-[#FFF8F5] rounded-2xl p-4 border border-pink-100 mb-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-gray-500 font-medium block">
                Exact Order Amount
              </span>
              <span className="text-2xl font-black text-[#D6657E]">
                {formatPrice(amount)}
              </span>
            </div>

            {/* Countdown Timer */}
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs font-bold justify-end mb-1">
                <Clock
                  size={15}
                  className={
                    timeLeft < 60
                      ? "text-red-500 animate-pulse"
                      : "text-[#FF7096]"
                  }
                />
                <span
                  className={
                    timeLeft < 60
                      ? "text-red-600 font-mono"
                      : "text-gray-900 font-mono"
                  }
                >
                  {isExpired ? "EXPIRED" : formatTimer(timeLeft)}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 block">
                {isExpired ? "Session timed out" : "QR expires in"}
              </span>
            </div>
          </div>

          {/* Timer Progress Bar */}
          <div className="w-full bg-pink-100 h-1.5 rounded-full overflow-hidden mb-5">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft < 60 ? "bg-red-500" : "bg-[#FF7096]"
              }`}
              style={{ width: `${100 - progressPct}%` }}
            />
          </div>

          {/* QR Code Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-inner flex flex-col items-center justify-center relative mb-5">
            {isExpired ? (
              <div className="py-12 text-center space-y-3">
                <AlertCircle size={40} className="text-red-500 mx-auto" />
                <p className="text-xs text-gray-600 font-medium">
                  This dynamic QR code has expired to prevent duplicate billing.
                </p>
                <button
                  onClick={() => {
                    setTimeLeft(300);
                    generateQR();
                  }}
                  className="btn-pill btn-primary text-xs px-5 py-2 inline-flex items-center gap-1.5"
                >
                  <RefreshCw size={14} /> Regenerate New QR
                </button>
              </div>
            ) : (
              <>
                {qrCodeUrl ? (
                  <div className="relative">
                    <Image
                      src={qrCodeUrl}
                      alt="Scan UPI QR"
                      width={240}
                      height={240}
                      className="rounded-xl"
                      priority
                    />
                    {/* Centered Brand Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white shadow-md border-2 border-pink-200 flex items-center justify-center text-base font-bold text-[#FF7096]">
                        $
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-60 h-60 flex items-center justify-center text-xs text-gray-400">
                    Generating high-resolution QR...
                  </div>
                )}

                {/* Beneficiary Details */}
                <div className="mt-2 text-center">
                  <span className="text-[11px] text-gray-600 font-medium">
                    Payee: <strong>{MERCHANT_NAME}</strong>
                  </span>
                </div>

                {/* Supported UPI Apps Row */}
                <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                    GPay
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-purple-700">
                    PhonePe
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">
                    Paytm
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-green-700">
                    BHIM
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                    Cred
                  </span>
                </div>
              </>
            )}
          </div>

          {/* UPI ID Copy & Mobile Intent Button */}
          <div className="space-y-3 mb-5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">
                  Beneficiary UPI ID
                </span>
                <span className="font-mono font-bold text-gray-800 text-xs truncate block">
                  {MERCHANT_UPI}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyUpi}
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-[11px] font-semibold text-gray-700 flex items-center gap-1 shrink-0 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-500" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Direct Pay Button */}
            <a
              href={upiUri}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FFF5F7] border border-pink-200 text-[#FF7096] hover:bg-pink-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors sm:hidden"
            >
              <Smartphone size={14} />
              <span>Tap to Pay via Installed UPI App</span>
            </a>
          </div>

          {/* Error / Immediate Decline Alert Message */}
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={18} className="shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-red-800 text-xs block">Payment Declined</span>
                <p className="text-[11px] text-red-600 mt-0.5 leading-relaxed">
                  {errorMsg.replace(/^Payment Declined:\s*/i, "")}
                </p>
              </div>
            </div>
          )}

          {/* Verification Security Layer Advisory */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-[11px] text-blue-900 leading-relaxed">
            <strong>🔒 Anti-Fraud Payment Authentication:</strong>
            <p className="mt-0.5 text-blue-800">
              Enter the exact <strong>12-digit UTR</strong> from your bank transaction receipt. Invalid, synthetic, or duplicate references are rejected immediately.
            </p>
          </div>

          {/* UTR Input & Confirmation */}
          <div className="border-t border-pink-100 pt-3 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Enter 12-Digit UPI Transaction / UTR Number *
              </label>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => {
                  setUtrNumber(e.target.value.replace(/[^0-9a-zA-Z]/g, ""));
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Paste 12-digit UTR from your bank SMS / UPI app"
                maxLength={18}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 transition-all ${
                  errorMsg
                    ? "bg-red-50/50 border-2 border-red-400 text-red-900 focus:ring-red-400"
                    : "bg-[#FFF8F5] border border-pink-200 text-gray-900 focus:ring-[#FF7096]"
                }`}
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Found on your payment success screen under &quot;UPI Ref No.&quot; or &quot;UTR&quot;
              </p>
            </div>

            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={verifying || isExpired || !utrNumber.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7096] to-[#E0659B] text-white font-bold text-xs shadow-md shadow-pink-200 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {verifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Reference with Bank Gateway...</span>
                </>
              ) : (
                <>
                  <span>Submit UTR for Verification</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Anti-fraud verified transaction ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
