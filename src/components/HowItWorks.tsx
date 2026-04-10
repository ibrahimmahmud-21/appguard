import { motion } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload APK", description: "Drag and drop or select your APK file" },
  { icon: ScanSearch, title: "Automated Scan", description: "Our system analyzes permissions, URLs, and behavior" },
  { icon: ShieldCheck, title: "Get Results", description: "Receive a detailed risk report in seconds" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It <span className="text-neon-blue text-glow-blue">Works</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
              <s.icon className="h-8 w-8 text-neon-blue" />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
