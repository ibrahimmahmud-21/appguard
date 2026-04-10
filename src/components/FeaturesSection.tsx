import { motion } from "framer-motion";
import { KeyRound, Globe, BarChart3, MessageSquareText } from "lucide-react";

const features = [
  {
    icon: KeyRound,
    title: "Permission Analysis",
    description: "Detects dangerous permissions like camera, SMS, contacts access that apps shouldn't need.",
    color: "text-neon-green",
    glow: "group-hover:glow-green",
  },
  {
    icon: Globe,
    title: "URL Detection",
    description: "Scans for suspicious URLs, tracking endpoints, and known malicious domains embedded in the APK.",
    color: "text-neon-blue",
    glow: "group-hover:glow-blue",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description: "Calculates a comprehensive risk score based on multiple threat vectors and behavioral patterns.",
    color: "text-neon-green",
    glow: "group-hover:glow-green",
  },
  {
    icon: MessageSquareText,
    title: "AI Explanations",
    description: "Get clear, human-readable explanations of every risk — no technical jargon required.",
    color: "text-neon-blue",
    glow: "group-hover:glow-blue",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 relative">
    <div className="absolute inset-0 cyber-grid opacity-50" />
    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono text-neon-green tracking-widest uppercase mb-4 block">
          // capabilities
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What We <span className="text-neon-green text-glow-green">Detect</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Multi-vector threat analysis engine scanning APK files across every dimension.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group glass rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] ${f.glow}`}
          >
            <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4 border border-border/50 group-hover:border-transparent transition-colors ${f.color}`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
