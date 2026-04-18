import { motion } from "framer-motion";
import shieldLogo from "@/assets/apkguard-shield.png";

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-xl border-b border-border/70">
    <div className="container flex items-center justify-between py-3 md:py-4">
      {/* Left: Shield monogram + apkguard text */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: -8, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-2.5 group"
      >
        <img
          src={shieldLogo}
          alt="apkguard"
          className="h-9 w-9 md:h-10 md:w-10 object-contain hover-glow"
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

export default Navbar;
