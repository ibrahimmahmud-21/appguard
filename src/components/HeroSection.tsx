import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";
import UploadBox from "./UploadBox";

const badges = [
  { icon: Shield, label: "Safe & Private" },
  { icon: Zap, label: "Instant Results" },
  { icon: Lock, label: "100% Free" },
];

const HeroSection = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => (
  <section id="scan" className="relative pt-32 pb-20 overflow-hidden">
    {/* Background grid effect */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(hsl(142 72% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 72% 50%) 1px, transparent 1px)",
      backgroundSize: "60px 60px"
    }} />

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Scan APK Before{" "}
          <span className="text-neon-green text-glow-green">You Install</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Upload any Android APK file and instantly detect malware, suspicious permissions, 
          and hidden risks — before it touches your device.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <UploadBox onFileSelect={onFileSelect} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6 mt-12 flex-wrap"
      >
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
            <b.icon className="h-4 w-4 text-neon-green" />
            {b.label}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
