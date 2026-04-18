import { motion } from "framer-motion";
import { KeyRound, Globe, BarChart3, MessageSquareText } from "lucide-react";

const features = [
  {
    icon: KeyRound,
    title: "Permission Analysis",
    description: "Detects dangerous permissions like camera, SMS, and contacts access that apps shouldn't need.",
  },
  {
    icon: Globe,
    title: "URL Detection",
    description: "Scans for suspicious URLs, tracking endpoints, and known malicious domains embedded in the APK.",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description: "Calculates a clear risk score based on multiple threat vectors and behavioral patterns.",
  },
  {
    icon: MessageSquareText,
    title: "AI Explanations",
    description: "Get clear, human-readable explanations of every risk — no technical jargon required.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 relative">
    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-14"
      >
        <span className="text-[11px] font-mono text-primary/90 tracking-[0.2em] uppercase mb-4 block">
          Capabilities
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          What We <span className="text-primary">Detect</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Multi-vector threat analysis scanning APK files across every dimension.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[0_14px_36px_-18px_hsl(152_100%_45%/0.35)] transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.12 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15"
            >
              <f.icon className="h-4.5 w-4.5 text-primary" strokeWidth={2} />
            </motion.div>
            <h3 className="text-base font-semibold mb-2 tracking-tight">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
