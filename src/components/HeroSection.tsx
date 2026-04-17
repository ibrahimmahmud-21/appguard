import { motion } from "framer-motion";
import { Shield, Zap, Lock, Terminal } from "lucide-react";
import UploadBox from "./UploadBox";

const badges = [
  { icon: Shield, label: "Military-Grade Scan" },
  { icon: Zap, label: "Instant Results" },
  { icon: Lock, label: "100% Private" },
  { icon: Terminal, label: "Deep Analysis" },
];

const HeroSection = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => (
  <section id="scan" className="relative pt-32 pb-24 overflow-hidden">
    {/* Animated grid */}
    <div className="absolute inset-0 cyber-grid" />
    
    {/* Radial glow */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-14 mt-6"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          Scan APK Before{" "}
          <span className="text-neon-green text-glow-green">You Install</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Upload any Android APK file and instantly detect malware, suspicious permissions, 
          and hidden risks — before it touches your device.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <UploadBox onFileSelect={onFileSelect} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-4 mt-14 flex-wrap"
      >
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground glass rounded-full px-4 py-2 hover:border-neon-green/30 transition-all duration-300"
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
