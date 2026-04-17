import { Shield } from "lucide-react";

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
    <div className="container flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 gap-2 sm:gap-0">
      {/* Logo + Brand */}
      <a href="/" className="flex items-center gap-3 group">
        <div className="relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-neon-green/10 border border-neon-green/30 group-hover:border-neon-green/60 transition-all duration-300">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-neon-green" strokeWidth={2.5} />
          <div className="absolute inset-0 rounded-xl bg-neon-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neon-green text-glow-green">
          apkguard
        </span>
      </a>

      {/* Developer credit */}
      <div className="flex flex-col items-center sm:items-end text-xs sm:text-sm">
        <span className="text-muted-foreground font-mono">
          Developed by{" "}
          <span className="text-foreground font-medium">Ibrahim Mahmud</span>
        </span>
        <a
          href="https://ibrahimmahmud.pro.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon-blue/80 hover:text-neon-blue text-xs font-mono underline-offset-4 hover:underline transition-all duration-300"
        >
          ibrahimmahmud.pro.bd
        </a>
      </div>
    </div>
  </header>
);

export default Navbar;
