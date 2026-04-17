import { motion } from "framer-motion";
import { Shield, Zap, Lock, Terminal } from "lucide-react";
import UploadBox from "./UploadBox";

const badges = [
  { icon: Shield, label: "Deep Scan" },
  { icon: Zap, label: "Instant Results" },
  { icon: Lock, label: "100% Private" },
  { icon: Terminal, label: "AI Analysis" },
];

const HeroSection = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => (
  <section id="scan" className="relative pt-32 pb-20 overflow-hidden">
    {/* Subtle minimal grid */}
    <div className="absolute inset-0 cyber-grid opacity-60" />

    {/* Soft single green glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-neon-green/[0.06] rounded-full blur-[140px] pointer-events-none" />

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-neon-green/80 mb-5">
          Android Security Scanner
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
          Scan APK Before{" "}
          <span className="text-neon-green text-glow-green">You Install</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Upload any Android APK and instantly detect malware, suspicious permissions, and hidden risks — before it touches your device.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <UploadBox onFileSelect={onFileSelect} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-2.5 mt-12 flex-wrap"
      >
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/60 rounded-full px-3.5 py-1.5 hover:border-neon-green/40 hover:text-foreground transition-all duration-300"
          >
            <b.icon className="h-3.5 w-3.5 text-neon-green" />
            {b.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
