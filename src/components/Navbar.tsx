import logo from "@/assets/logo.png";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
    <div className="container flex h-16 items-center justify-between">
      <a href="/" className="flex items-center gap-2 group">
        <img src={logo} alt="apkguard logo" className="h-8 w-auto" />
        <span className="text-lg font-bold tracking-tight">
          <span className="text-neon-blue text-glow-blue">apk</span>
          <span className="text-neon-green text-glow-green">guard</span>
        </span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-neon-green transition-colors duration-300">Features</a>
        <a href="#how-it-works" className="hover:text-neon-blue transition-colors duration-300">How It Works</a>
        <a href="#scan" className="relative px-5 py-2 rounded-lg font-medium text-primary-foreground bg-primary glow-green hover:glow-green-intense transition-all duration-300">
          Scan Now
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
