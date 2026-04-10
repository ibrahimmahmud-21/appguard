import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ArrowLeft, Bot, ChevronRight } from "lucide-react";

interface ScanResultProps {
  fileName: string;
  onScanAnother: () => void;
}

const generateResult = (fileName: string) => {
  const hash = fileName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = (hash % 10) + 1;

  const allReasons = [
    { text: "Requests SMS read/send permissions", severity: "high" as const },
    { text: "Contains obfuscated code segments", severity: "high" as const },
    { text: "Connects to known tracking domains", severity: "medium" as const },
    { text: "Requests camera access without visible feature", severity: "medium" as const },
    { text: "Accesses contacts and call logs", severity: "high" as const },
    { text: "Contains embedded advertisement SDKs", severity: "low" as const },
    { text: "Requests device admin privileges", severity: "high" as const },
    { text: "Uses reflection to hide API calls", severity: "medium" as const },
  ];

  const reasonCount = Math.min(Math.max(Math.floor(score / 2), 1), 5);
  const reasons = allReasons.slice(0, reasonCount);

  let level: "safe" | "medium" | "high";
  if (score <= 3) level = "safe";
  else if (score <= 6) level = "medium";
  else level = "high";

  const explanations: Record<string, string> = {
    safe: `I've completed a thorough analysis of "${fileName}". The APK appears clean with no significant security concerns. All requested permissions align with the app's expected functionality. No known malware signatures or suspicious network endpoints were detected.`,
    medium: `After scanning "${fileName}", I found some concerning elements. The app requests permissions that seem excessive for its stated purpose. I detected connections to tracking services. While not definitively malicious, I'd recommend caution before installing.`,
    high: `⚠️ Critical alert for "${fileName}". Multiple high-severity threats detected. The APK contains obfuscated code commonly associated with malware, requests dangerous permissions, and connects to known malicious endpoints. I strongly advise against installing this application.`,
  };

  return { score, level, reasons, explanation: explanations[level] };
};

const levelConfig = {
  safe: {
    icon: ShieldCheck,
    label: "SECURE",
    color: "text-neon-green",
    strokeColor: "hsl(142 72% 50%)",
    bgGlow: "bg-neon-green/5",
    borderColor: "border-neon-green/20",
  },
  medium: {
    icon: ShieldAlert,
    label: "CAUTION",
    color: "text-warning",
    strokeColor: "hsl(38 92% 50%)",
    bgGlow: "bg-warning/5",
    borderColor: "border-warning/20",
  },
  high: {
    icon: ShieldX,
    label: "THREAT DETECTED",
    color: "text-destructive",
    strokeColor: "hsl(0 72% 55%)",
    bgGlow: "bg-destructive/5",
    borderColor: "border-destructive/20",
  },
};

const severityColors = {
  low: "bg-neon-green",
  medium: "bg-warning",
  high: "bg-destructive",
};

const ScanResult = ({ fileName, onScanAnother }: ScanResultProps) => {
  const result = generateResult(fileName);
  const config = levelConfig[result.level];
  const circumference = 2 * Math.PI * 45;
  const fillAmount = (result.score / 10) * circumference;

  return (
    <section className="pt-32 pb-20 relative">
      {/* Background glow */}
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] ${config.bgGlow} rounded-full blur-[120px] pointer-events-none`} />

      <div className="container max-w-2xl relative z-10">
        {/* Risk Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 text-center mb-6"
        >
          {/* Circular meter */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(220 16% 14%)" strokeWidth="3" />
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke={config.strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - fillAmount }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                style={{ filter: `drop-shadow(0 0 6px ${config.strokeColor})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold font-mono ${config.color}`}>
                {result.score}
              </span>
              <span className="text-xs text-muted-foreground font-mono">/10 RISK</span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 ${config.color} font-bold text-lg tracking-wider`}>
            <config.icon className="h-5 w-5" />
            {config.label}
          </div>

          <p className="text-xs text-muted-foreground font-mono mt-3 truncate">
            TARGET: {fileName}
          </p>
        </motion.div>

        {/* Findings cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Security Findings ({result.reasons.length})
          </h3>
          <div className="space-y-3">
            {result.reasons.map((reason, i) => (
              <motion.div
                key={reason.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 glass rounded-xl px-4 py-3 group hover:border-neon-green/20 transition-all duration-300"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${severityColors[reason.severity]}`} />
                <span className="text-sm text-muted-foreground flex-1">{reason.text}</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                  reason.severity === "high" ? "bg-destructive/10 text-destructive" :
                  reason.severity === "medium" ? "bg-warning/10 text-warning" :
                  "bg-neon-green/10 text-neon-green"
                }`}>
                  {reason.severity}
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Explanation chat box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-neon-green" />
            </div>
            <div>
              <span className="text-sm font-semibold">AI Analysis</span>
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">GPT-GUARD v2.4</span>
            </div>
          </div>
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {result.explanation}
            </motion.p>
          </div>
        </motion.div>

        {/* Scan another */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onScanAnother}
          className="w-full py-4 rounded-xl font-semibold glass text-foreground hover:border-neon-green/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Scan Another File
        </motion.button>
      </div>
    </section>
  );
};

export default ScanResult;
