import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScanningAnimationProps {
  fileName: string;
  onComplete: () => void;
}

const scanSteps = [
  "Initializing scan engine...",
  "Extracting APK manifest...",
  "Analyzing permissions...",
  "Scanning for malware signatures...",
  "Checking embedded URLs...",
  "Running behavioral analysis...",
  "Generating risk report...",
];

const ScanningAnimation = ({ fileName, onComplete }: ScanningAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const duration = 3500;
    const interval = 50;
    const increment = (100 / duration) * interval;
    const stepInterval = duration / scanSteps.length;

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(p + increment, 100);
      });
    }, interval);

    const stepTimer = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= scanSteps.length - 1) {
          clearInterval(stepTimer);
          return s;
        }
        return s + 1;
      });
    }, stepInterval);

    const completeTimer = setTimeout(onComplete, duration + 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <section className="pt-32 pb-20">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 text-center relative overflow-hidden"
        >
          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green to-transparent animate-scan-line" />
          </div>

          {/* Radar */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(142 72% 50% / 0.1)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(142 72% 50% / 0.1)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="hsl(142 72% 50% / 0.1)" strokeWidth="0.5" />
              {/* Cross lines */}
              <line x1="50" y1="5" x2="50" y2="95" stroke="hsl(142 72% 50% / 0.08)" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="hsl(142 72% 50% / 0.08)" strokeWidth="0.5" />
            </svg>
            {/* Sweep */}
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "center center" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
                style={{
                  background: "linear-gradient(90deg, hsl(142 72% 50% / 0.8), transparent)",
                }}
              />
            </motion.div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-green glow-green" />
          </div>

          <p className="font-mono text-xs text-muted-foreground mb-1 truncate">{fileName}</p>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-4 mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="font-mono text-sm text-neon-green text-glow-green">
            {Math.round(progress)}%
          </p>

          {/* Current step */}
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-muted-foreground mt-3"
          >
            {scanSteps[currentStep]}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ScanningAnimation;
