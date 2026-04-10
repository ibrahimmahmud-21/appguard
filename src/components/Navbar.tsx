import { Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <img src={logo} alt="apkguard logo" className="h-8 w-auto" />
        <span className="text-lg font-bold">
          <span className="text-neon-blue">apk</span>
          <span className="text-neon-green">guard</span>
        </span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
        <a href="#scan" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity glow-green">
          Scan Now
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
