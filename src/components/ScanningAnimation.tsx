import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScanningAnimationProps {
  fileName: string;
  phase: "uploading" | "scanning" | "done";
  uploadProgress: number;
  onComplete: () => void;
}

const scanSteps = [
  "ফাইল আপলোড হচ্ছে...",
  "VirusTotal-এ পাঠাচ্ছি...",
  "৭০+ অ্যান্টিভাইরাস ইঞ্জিন চেক করছে...",
  "পারমিশন বিশ্লেষণ চলছে...",
  "সন্দেহজনক URL খুঁজছি...",
  "রিপোর্ট তৈরি হচ্ছে...",
];

const ScanningAnimation = ({ fileName, phase, uploadProgress, onComplete }: ScanningAnimationProps) => {
  const [stepIdx, setStepIdx] = useState(0);

  // Cycle scan messages while phase === "scanning"
  useEffect(() => {
    if (phase !== "scanning") return;
    const t = setInterval(() => {
      setStepIdx((s) => (s + 1) % scanSteps.length);
    }, 2500);
    return () => clearInterval(t);
  }, [phase]);

  // When done, give the meter a beat then continue
  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  // Display progress: real upload progress, then indeterminate during scan
  const displayProgress = phase === "uploading" ? uploadProgress : phase === "done" ? 100 : 95;
  const headline =
    phase === "uploading"
      ? "আপলোড হচ্ছে ভাই, একটু ধৈর্য রাখো 📤"
      : phase === "done"
      ? "হয়ে গেছে! রিপোর্ট রেডি ✅"
      : "স্ক্যান চলছে ভাই, একটু অপেক্ষা করো... আমি তোমার অ্যাপটা ভালো করে চেক করছি 🔥";

  return (
    <section className="pt-32 pb-20">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center relative overflow-hidden"
        >
          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green to-transparent animate-scan-line" />
          </div>

          {/* Radar */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(142 72% 50% / 0.1)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(142 72% 50% / 0.1)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="hsl(142 72% 50% / 0.1)" strokeWidth="0.5" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="hsl(142 72% 50% / 0.08)" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="hsl(142 72% 50% / 0.08)" strokeWidth="0.5" />
            </svg>
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "center center" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
                style={{ background: "linear-gradient(90deg, hsl(142 72% 50% / 0.8), transparent)" }}
              />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-green glow-green" />
          </div>

          <p className="text-sm font-semibold text-foreground mb-1 px-2">{headline}</p>
          <p className="font-mono text-xs text-muted-foreground mb-4 truncate">{fileName}</p>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-3 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full"
              animate={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {phase === "scanning" && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{ backgroundSize: "200% 100%" }} />
            )}
          </div>

          <p className="font-mono text-sm text-neon-green text-glow-green">
            {phase === "uploading"
              ? `${Math.round(uploadProgress)}%`
              : phase === "done"
              ? "100%"
              : "স্ক্যান চলছে..."}
          </p>

          <motion.p
            key={`${phase}-${stepIdx}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-muted-foreground mt-3"
          >
            {phase === "uploading"
              ? scanSteps[0]
              : phase === "done"
              ? "✅ রিপোর্ট প্রস্তুত"
              : scanSteps[stepIdx]}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ScanningAnimation;
