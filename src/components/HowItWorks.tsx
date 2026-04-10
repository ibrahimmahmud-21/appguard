import { motion } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload APK", description: "Drag and drop or select your APK file", num: "01" },
  { icon: ScanSearch, title: "Deep Scan", description: "AI-powered engine analyzes permissions, URLs, and behavior", num: "02" },
  { icon: ShieldCheck, title: "Get Report", description: "Receive a detailed risk report with AI explanations", num: "03" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 relative">
    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-4 block">
          // process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It <span className="text-neon-blue text-glow-blue">Works</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-neon-green/20 via-neon-blue/20 to-neon-green/20" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center relative"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full rounded-2xl glass flex items-center justify-center group hover:glow-blue transition-all duration-500">
                <s.icon className="h-8 w-8 text-neon-blue" />
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-neon-blue text-primary-foreground text-xs font-mono font-bold flex items-center justify-center glow-blue">
                {s.num}
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
