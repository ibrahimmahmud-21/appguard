import logo from "@/assets/apkguard-logo.png";

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/60">
    <div className="container flex items-center justify-between py-3 md:py-4">
      {/* Left: Shield monogram + apkguard text */}
      <a href="/" className="flex items-center gap-2.5 group">
        <img
          src={logo}
          alt="apkguard"
          className="h-9 w-9 md:h-10 md:w-10 object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-xl md:text-2xl font-bold tracking-tight text-neon-green group-hover:text-glow-green transition-all duration-300">
          apkguard
        </span>
      </a>

      {/* Right: SYSTEM ONLINE indicator */}
      <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-60" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-neon-green" />
        </span>
        <span className="hidden sm:inline">System Online</span>
        <span className="sm:hidden">Online</span>
      </div>
    </div>
  </header>
);

export default Navbar;
