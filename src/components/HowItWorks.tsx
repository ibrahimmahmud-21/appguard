import { motion } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload APK", description: "Drag and drop or select your APK file", num: "01" },
  { icon: ScanSearch, title: "Deep Scan", description: "AI-powered engine analyzes permissions, URLs, and behavior", num: "02" },
  { icon: ShieldCheck, title: "Get Report", description: "Receive a detailed risk report with AI explanations", num: "03" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 relative border-t border-border/60">
    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-14"
      >
        <span className="text-[11px] font-mono text-primary/90 tracking-[0.2em] uppercase mb-4 block">
          Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          How It <span className="text-primary">Works</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
        {/* Connecting hairline */}
        <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-border" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            className="text-center relative group"
          >
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="w-full h-full rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:scale-105 transition-all duration-300">
                <s.icon className="h-7 w-7 text-primary" strokeWidth={1.8} />
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-md bg-primary text-primary-foreground text-[10px] font-mono font-bold flex items-center justify-center shadow-[0_4px_12px_-2px_hsl(152_100%_45%/0.5)]">
                {s.num}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 tracking-tight">{s.title}</h3>
            <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
