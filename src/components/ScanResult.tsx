import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ArrowLeft, Bot, Link2, KeyRound } from "lucide-react";

export interface VtVerdict {
  level: "LOW" | "MEDIUM" | "HIGH";
  label: string;
  score: number;
  summary: string;
  detection: { malicious: number; suspicious: number; total: number; engines: string[] };
  dangerousPermissions: string[];
  mediumPermissions: string[];
  suspiciousUrls: string[];
  behaviors: string[];
}

interface ScanResultProps {
  verdict: VtVerdict;
  aiExplanation: string;
  fileName: string;
  onScanAnother: () => void;
}

const levelConfig = {
  LOW: {
    icon: ShieldCheck,
    color: "text-primary",
    strokeColor: "hsl(152 100% 38%)",
    bgGlow: "bg-primary/8",
    chip: "bg-primary/10 text-primary",
  },
  MEDIUM: {
    icon: ShieldAlert,
    color: "text-warning",
    strokeColor: "hsl(38 92% 48%)",
    bgGlow: "bg-warning/8",
    chip: "bg-warning/10 text-warning",
  },
  HIGH: {
    icon: ShieldX,
    color: "text-destructive",
    strokeColor: "hsl(0 72% 50%)",
    bgGlow: "bg-destructive/8",
    chip: "bg-destructive/10 text-destructive",
  },
};

// Map full Android permission strings to short, friendly labels
const prettifyPerm = (p: string) => p.replace(/^android\.permission\./, "");

const ScanResult = ({ verdict, aiExplanation, fileName, onScanAnother }: ScanResultProps) => {
  const config = levelConfig[verdict.level];
  const circumference = 2 * Math.PI * 45;
  const fillAmount = (verdict.score / 100) * circumference;
  const flagged = verdict.detection.malicious + verdict.detection.suspicious;

  return (
    <section className="pt-32 pb-20 relative">
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] ${config.bgGlow} rounded-full blur-[120px] pointer-events-none`} />

      <div className="container max-w-2xl relative z-10">
        {/* Risk Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 text-center mb-6"
        >
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(0 0% 90%)" strokeWidth="3" />
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
              <span className={`text-4xl font-bold font-mono ${config.color}`}>{verdict.score}</span>
              <span className="text-xs text-muted-foreground font-mono">/100 RISK</span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 ${config.color} font-bold text-lg tracking-wider`}>
            <config.icon className="h-5 w-5" />
            {verdict.label}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{verdict.summary}</p>
          <p className="text-xs text-muted-foreground font-mono mt-3 truncate">TARGET: {fileName}</p>

          {/* Detection ratio */}
          <div className="mt-5 pt-5 border-t border-border/30 flex items-center justify-center gap-6 text-xs font-mono">
            <div>
              <div className={`text-2xl font-bold ${flagged >= 4 ? config.color : "text-foreground"}`}>
                {flagged}<span className="text-muted-foreground text-sm">/{verdict.detection.total}</span>
              </div>
              <div className="text-[10px] text-muted-foreground uppercase mt-1">Engines flagged</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-destructive">{verdict.detection.malicious}</div>
              <div className="text-[10px] text-muted-foreground uppercase mt-1">Malicious</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-warning">{verdict.detection.suspicious}</div>
              <div className="text-[10px] text-muted-foreground uppercase mt-1">Suspicious</div>
            </div>
          </div>
        </motion.div>

        {/* AI Explanation - the big "এই অ্যাপটা কী কী নিয়ে ফেলতে চাচ্ছে?" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="text-sm font-semibold">AI বিশ্লেষণ</span>
              <span className="text-[10px] text-muted-foreground ml-2 font-mono">CONSERVATIVE • EVIDENCE-BASED</span>
            </div>
          </div>
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{aiExplanation}</p>
          </div>
        </motion.div>

        {/* Dangerous Permissions */}
        {(verdict.dangerousPermissions.length > 0 || verdict.mediumPermissions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glass rounded-2xl p-6 mb-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
              <KeyRound className="h-4 w-4 text-warning" />
              Permissions ({verdict.dangerousPermissions.length + verdict.mediumPermissions.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {verdict.dangerousPermissions.map((p) => (
                <span key={p} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                  {prettifyPerm(p)}
                </span>
              ))}
              {verdict.mediumPermissions.map((p) => (
                <span key={p} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-warning/10 text-warning border border-warning/20">
                  {prettifyPerm(p)}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Detected Engines */}
        {verdict.detection.engines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="glass rounded-2xl p-6 mb-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Detected by ({verdict.detection.engines.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {verdict.detection.engines.map((e) => (
                <span key={e} className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${config.chip} border border-current/20`}>
                  {e}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Suspicious URLs */}
        {verdict.suspiciousUrls.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="glass rounded-2xl p-6 mb-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
              <Link2 className="h-4 w-4 text-warning" />
              Embedded URLs ({verdict.suspiciousUrls.length})
            </h3>
            <div className="space-y-2">
              {verdict.suspiciousUrls.map((u) => (
                <div key={u} className="text-xs font-mono text-muted-foreground bg-muted/30 rounded-lg px-3 py-2 truncate border border-border/50">
                  {u}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Scan another */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onScanAnother}
          className="w-full py-4 rounded-xl font-semibold glass text-foreground hover:border-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          আরেকটা ফাইল স্ক্যান করো
        </motion.button>
      </div>
    </section>
  );
};

export default ScanResult;
