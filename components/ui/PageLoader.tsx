"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export interface PageLoaderProps {
  /** Main loading text (defaults to "Loading cuteness...") */
  text?: string;
  /** Whether to cycle through cute painting-studio phrases (default: false) */
  cyclePhrases?: boolean;
  /** Whether this is a full-screen overlay or an inline loader */
  fullscreen?: boolean;
  /** Whether to show the slender progress bar (default: true) */
  showProgress?: boolean;
  /** Whether to show atelier watermark below (default: false) */
  showSubtitle?: boolean;
  /** Progress percentage (0 - 100), or undefined for auto-simulated progress */
  progress?: number;
  /** Callback fired when auto-progress completes */
  onComplete?: () => void;
  /** Custom background color or styling class */
  className?: string;
}

const ART_PHRASES = [
  "Loading cuteness...",
  "Mixing pastel pigments...",
  "Drying delicate watercolors...",
  "Adding golden brushstrokes...",
  "Framing handmade art...",
  "Sprinkling artist whimsy...",
];

export default function PageLoader({
  text = "Loading cuteness...",
  cyclePhrases = false,
  fullscreen = true,
  showProgress = true,
  showSubtitle = false,
  progress: externalProgress,
  onComplete,
  className = "",
}: PageLoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Auto-simulate loading progress if not externally controlled
  useEffect(() => {
    if (externalProgress !== undefined) return;

    let timeoutId: NodeJS.Timeout | null = null;
    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth organic progress step
        const diff = Math.floor(Math.random() * 6) + 5;
        const next = Math.min(prev + diff, 100);
        if (next >= 100) {
          clearInterval(interval);
          timeoutId = setTimeout(() => {
            onComplete?.();
          }, 450);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [externalProgress, onComplete]);

  // Cycle phrases if enabled
  useEffect(() => {
    if (!cyclePhrases) return;
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ART_PHRASES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [cyclePhrases]);

  const currentProgress =
    externalProgress !== undefined ? externalProgress : internalProgress;
  const displayText = cyclePhrases ? ART_PHRASES[phraseIndex] : text;

  // Floating gentle sparkles
  const sparkles = [
    { id: 1, x: "-65px", y: "-35px", size: 6, delay: 0, duration: 3.2 },
    { id: 2, x: "65px", y: "-45px", size: 7, delay: 0.5, duration: 3.6 },
    { id: 3, x: "-75px", y: "25px", size: 5, delay: 1.0, duration: 3.4 },
    { id: 4, x: "70px", y: "35px", size: 6, delay: 0.3, duration: 4.0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`
        ${fullscreen ? "fixed inset-0 z-[9999]" : "relative w-full py-16"}
        flex flex-col items-center justify-center
        select-none overflow-hidden
        ${className}
      `}
      style={{
        backgroundColor: "#FFF0F4",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #FFF5F7 0%, #FFF0F4 65%, #FDE6EC 100%)
        `,
      }}
    >
      {/* Floating Sparkles */}
      <div className="relative">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.1, 0.5],
              y: [-5, -28],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(${s.x}, ${s.y})`,
              pointerEvents: "none",
            }}
          >
            <svg
              width={s.size}
              height={s.size}
              viewBox="0 0 24 24"
              fill="#FF7096"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}

        {/* ── Centerpiece: Cute Doodle Illustration ── */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
        >
          <svg
            width="120"
            height="85"
            viewBox="0 0 120 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              {/* Soft pink translucent fill for the lenses */}
              <radialGradient
                id="lensGradient"
                cx="50%"
                cy="45%"
                r="65%"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="55%" stopColor="#FFDEE7" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#FFC2D2" stopOpacity="0.5" />
              </radialGradient>
            </defs>

            {/* Left Round Circle / Lens */}
            <motion.ellipse
              cx="44"
              cy="44"
              rx="15.5"
              ry="15"
              fill="url(#lensGradient)"
              stroke="#FF7096"
              strokeWidth="2.1"
              strokeLinecap="round"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Right Round Circle / Lens */}
            <motion.ellipse
              cx="76"
              cy="44"
              rx="15.5"
              ry="15"
              fill="url(#lensGradient)"
              stroke="#FF7096"
              strokeWidth="2.1"
              strokeLinecap="round"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            />

            {/* Center Bridge / Knot */}
            <motion.path
              d="M 58.5 44 C 59.5 41 60.5 41 61.5 44"
              stroke="#FF7096"
              strokeWidth="2.1"
              strokeLinecap="round"
              fill="none"
            />
            {/* Center Bow Knot */}
            <ellipse
              cx="60"
              cy="43.5"
              rx="2.2"
              ry="1.8"
              fill="#FF7096"
            />

            {/* Left Lens Glare Highlight */}
            <path
              d="M 35 40 A 9.5 9.5 0 0 1 45 35"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Right Lens Glare Highlight */}
            <path
              d="M 67 40 A 9.5 9.5 0 0 1 77 35"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Vertical Antenna / Pin on Left Circle */}
            <g>
              <line
                x1="44"
                y1="29"
                x2="44"
                y2="12"
                stroke="#FF7096"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <line
                x1="41.5"
                y1="12"
                x2="46.5"
                y2="12"
                stroke="#FF7096"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              {/* Twinkling star / sparkle at antenna tip */}
              <motion.circle
                cx="44"
                cy="12"
                r="1.8"
                fill="#FF7096"
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>

            {/* Left Curled Ribbon Leg */}
            <motion.path
              d="M 57 48 C 53 56 48 61 44 67 C 42 71 45 74 48 73"
              stroke="#FF7096"
              strokeWidth="1.9"
              strokeLinecap="round"
              fill="none"
              animate={{
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "57px 48px" }}
            />

            {/* Right Curled Ribbon Leg */}
            <motion.path
              d="M 63 48 C 67 56 72 61 76 67 C 78 71 75 74 72 73"
              stroke="#FF7096"
              strokeWidth="1.9"
              strokeLinecap="round"
              fill="none"
              animate={{
                rotate: [2, -2, 2],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "63px 48px" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* ── Main Loading Text (High Contrast & Elegant Typography) ── */}
      <div className="mt-4 flex flex-col items-center">
        <motion.div
          key={displayText}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.3 }}
          className="flex items-center text-[#D6456E] text-base md:text-[18px] font-medium tracking-wide"
          style={{
            fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)",
            textShadow: "0 1px 2px rgba(214, 69, 110, 0.08)",
          }}
        >
          <span>{displayText.replace(/\.{3}$/, "")}</span>

          {/* Staggered bouncing animated dots */}
          <span className="inline-flex ml-0.5 space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [0.35, 1, 0.35],
                  y: [0, -3.5, 0],
                }}
                transition={{
                  duration: 1.15,
                  repeat: Infinity,
                  delay: i * 0.22,
                  ease: "easeInOut",
                }}
                className="font-bold text-[#D6456E]"
              >
                .
              </motion.span>
            ))}
          </span>
        </motion.div>

        {showSubtitle && (
          <p className="mt-1 text-xs text-[#B57C90] tracking-widest uppercase font-light">
            Minted Whimsy Atelier
          </p>
        )}
      </div>

      {/* ── Slender Progress Bar (Minimalist & Delicate) ── */}
      {showProgress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 flex flex-col items-center"
        >
          <div className="relative w-36 h-[2.5px] bg-[#FFD4E2] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#FFA0B4] via-[#FF7096] to-[#D6456E]"
              style={{
                width: `${currentProgress}%`,
                boxShadow: "0 0 6px rgba(255, 112, 150, 0.4)",
              }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
            {/* Soft shimmer wave */}
            <motion.div
              className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              animate={{
                x: [-24, 144],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <span className="mt-2 text-[10px] font-medium text-[#C48498] tabular-nums tracking-widest">
            {Math.round(currentProgress)}%
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
