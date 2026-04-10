import { motion } from "framer-motion";
import { KeyRound, Globe, BarChart3, MessageSquareText } from "lucide-react";

const features = [
  {
    icon: KeyRound,
    title: "Permission Analysis",
    description: "Detects dangerous permissions like camera, SMS, contacts access that apps shouldn't need.",
  },
  {
    icon: Globe,
    title: "URL Detection",
    description: "Scans for suspicious URLs, tracking endpoints, and known malicious domains embedded in the APK.",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description: "Calculates a comprehensive risk score based on multiple threat vectors and behavioral patterns.",
  },
  {
    icon: MessageSquareText,
    title: "Simple Explanations",
    description: "Get clear, human-readable explanations of every risk — no technical jargon required.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-muted/30">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What We <span className="text-neon-green">Detect</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Our scanner analyzes APK files across multiple dimensions to give you a complete security picture.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card border border-border rounded-xl p-6 hover:border-neon-green/30 transition-all hover:glow-green"
          >
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-neon-green/10 transition-colors">
              <f.icon className="h-6 w-6 text-neon-green" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
