"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { useToastStore } from "@/store/toastStore";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      addToast("Please enter a valid email address.", "warning");
      return;
    }
    setLoading(true);
    // Simulate async
    await new Promise((r) => setTimeout(r, 900));
    setEmail("");
    setLoading(false);
    addToast("You're on the list! 🎨 Welcome to Minted Whimsy.", "success");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D6657E] via-[#F4B6C2] to-[#FFE3DC]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <div className="text-4xl mb-4">✉️</div>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
          >
            Get First Access to New Art
          </h2>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            Join our community of 2,000+ art lovers. Be the first to know about
            new arrivals, studio stories, and exclusive subscriber discounts.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-label="Email address for newsletter"
              className={[
                "flex-1 rounded-full px-5 py-3.5 text-[#2B2B2B]",
                "bg-white/90 placeholder-[#7A6F6F]",
                "focus:outline-none focus:ring-2 focus:ring-white/60",
                "text-sm font-medium",
              ].join(" ")}
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              icon={<Send size={16} />}
              iconPosition="right"
              className="bg-[#2B2B2B] from-[#2B2B2B] to-[#2B2B2B] hover:bg-[#1a1a1a] shrink-0"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-white/60 text-xs mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
