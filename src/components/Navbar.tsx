import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import shieldLogo from "@/assets/apkguard-shield.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
  <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
      scrolled
        ? "bg-background/85 backdrop-blur-2xl border-border shadow-[0_4px_24px_-12px_hsl(0_0%_0%/0.08)]"
        : "bg-background/60 backdrop-blur-md border-transparent"
    }`}
  >
    <div className="container flex items-center justify-between py-3 md:py-4">
      {/* Left: Shield monogram + apkguard text */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: -8, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2.5 group"
      >
        <motion.img
          src={shieldLogo}
          alt="apkguard"
          className="h-9 w-9 md:h-10 md:w-10 object-contain hover-glow"
          animate={{
            filter: [
              "drop-shadow(0 0 0px hsl(152 100% 45% / 0))",
              "drop-shadow(0 0 8px hsl(152 100% 45% / 0.35))",
              "drop-shadow(0 0 0px hsl(152 100% 45% / 0))",
            ],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-xl md:text-2xl font-bold tracking-tight text-primary group-hover:text-glow-green transition-all duration-300">
          apkguard
        </span>
      </motion.a>

      {/* Right: SYSTEM ONLINE indicator */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <span className="hidden sm:inline">System Online</span>
        <span className="sm:hidden">Online</span>
      </motion.div>
    </div>
  </header>
  );
};

export default Navbar;
