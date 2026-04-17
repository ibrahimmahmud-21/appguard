import { Shield } from "lucide-react";

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/40">
    {/* Subtle grid + glow blending with hero */}
    <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-neon-green/5 blur-[60px] pointer-events-none" />

    <div className="container relative flex items-center justify-between py-3 md:py-4 gap-4">
      {/* Logo + Brand only */}
      <a href="/" className="flex items-center gap-2.5 group">
        <div className="relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-lg bg-neon-green/10 border border-neon-green/30 group-hover:border-neon-green/70 transition-all duration-300">
          <Shield className="h-5 w-5 text-neon-green transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
          <div className="absolute inset-0 rounded-lg bg-neon-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-neon-green text-glow-green">
          apkguard
        </span>
      </a>

      {/* Developer credit */}
      <div className="flex flex-col items-end gap-1 leading-tight shrink-0">
        <span className="text-[11px] md:text-xs text-muted-foreground font-mono">
          Developed by{" "}
          <a
            href="https://ibrahimmahmud.pro.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-green font-medium hover:text-neon-green/80 underline underline-offset-4 decoration-neon-green/40 hover:decoration-neon-green transition-colors duration-300"
          >
            Ibrahim Mahmud
          </a>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-mono text-muted-foreground/80">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_6px_hsl(142_72%_50%)]" />
          SYSTEM ONLINE
        </span>
      </div>
    </div>
  </header>
);

export default Navbar;
