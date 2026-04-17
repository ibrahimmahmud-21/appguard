import { Shield } from "lucide-react";

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
    <div className="container flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 gap-3 sm:gap-0">
      {/* Logo + Brand */}
      <a href="/" className="flex items-center gap-2.5 group">
        <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-neon-green/10 border border-neon-green/30 group-hover:border-neon-green/60 transition-all duration-300">
          <Shield className="h-4 w-4 text-neon-green" strokeWidth={2.5} />
          <div className="absolute inset-0 rounded-lg bg-neon-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-neon-green text-glow-green">
          apkguard
        </span>
      </a>

      {/* Developer credit */}
      <div className="flex flex-col items-center sm:items-end leading-tight">
        <span className="text-xs sm:text-sm text-muted-foreground font-mono">
          Developed by{" "}
          <span className="text-foreground font-medium">Ibrahim Mahmud</span>
        </span>
        <a
          href="https://ibrahimmahmud.pro.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 text-[11px] sm:text-xs font-mono text-neon-blue/80 hover:text-neon-blue underline underline-offset-4 transition-colors duration-300"
        >
          ibrahimmahmud.pro.bd
        </a>
      </div>
    </div>
  </header>
);

export default Navbar;
