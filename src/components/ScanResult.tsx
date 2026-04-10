import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ArrowLeft } from "lucide-react";

interface ScanResultProps {
  fileName: string;
  onScanAnother: () => void;
}

// Simulated scan result
const generateResult = (fileName: string) => {
  const hash = fileName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = (hash % 10) + 1;

  const allReasons = [
    "Requests SMS read/send permissions",
    "Contains obfuscated code segments",
    "Connects to known tracking domains",
    "Requests camera access without visible feature",
    "Accesses contacts and call logs",
    "Contains embedded advertisement SDKs",
    "Requests device admin privileges",
    "Uses reflection to hide API calls",
  ];

  const reasonCount = Math.min(Math.max(Math.floor(score / 2), 1), 5);
  const reasons = allReasons.slice(0, reasonCount);

  let level: "safe" | "medium" | "high";
  if (score <= 3) level = "safe";
  else if (score <= 6) level = "medium";
  else level = "high";

  return { score, level, reasons };
};

const levelConfig = {
  safe: {
    icon: ShieldCheck,
    label: "Safe",
    color: "text-neon-green",
    bg: "bg-neon-green/10",
    border: "border-neon-green/30",
    explanation: "This APK appears safe. No significant threats were detected during the scan.",
  },
  medium: {
    icon: ShieldAlert,
    label: "Medium Risk",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    explanation: "This APK has some suspicious elements. Review the findings below before installing.",
  },
  high: {
    icon: ShieldX,
    label: "High Risk",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    explanation: "This APK shows multiple red flags. We strongly recommend NOT installing this application.",
  },
};

const ScanResult = ({ fileName, onScanAnother }: ScanResultProps) => {
  const result = generateResult(fileName);
  const config = levelConfig[result.level];
  const Icon = config.icon;

  return (
    <section className="pt-32 pb-20">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl border ${config.border} ${config.bg} p-8 text-center mb-8`}
        >
          <Icon className={`h-16 w-16 mx-auto mb-4 ${config.color}`} />
          <h2 className={`text-2xl font-bold ${config.color} mb-2`}>{config.label}</h2>
          <p className="text-muted-foreground text-sm mb-6">{config.explanation}</p>

          <div className="inline-flex items-center gap-2 bg-background rounded-full px-6 py-3">
            <span className="text-sm text-muted-foreground">Risk Score</span>
            <span className={`text-2xl font-bold font-mono ${config.color}`}>
              {result.score}/10
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground font-mono">{fileName}</span>
          </div>

          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Findings
          </h3>
          <ul className="space-y-3">
            {result.reasons.map((reason, i) => (
              <motion.li
                key={reason}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-sm"
              >
                <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  result.level === "safe" ? "bg-neon-green" : result.level === "medium" ? "bg-warning" : "bg-destructive"
                }`} />
                <span className="text-muted-foreground">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onScanAnother}
          className="w-full py-4 rounded-xl font-semibold border border-border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Scan Another File
        </motion.button>
      </div>
    </section>
  );
};

export default ScanResult;
