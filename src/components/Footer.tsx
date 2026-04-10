import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 glass-strong py-12 relative z-10">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="apkguard" className="h-6 w-auto" />
            <span className="font-bold">
              <span className="text-neon-blue">apk</span>
              <span className="text-neon-green">guard</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Protecting Android users by scanning APK files for malware, suspicious permissions, and hidden threats.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm font-mono uppercase tracking-wider text-muted-foreground">Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-neon-green transition-colors duration-300">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-neon-blue transition-colors duration-300">How It Works</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors duration-300">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm font-mono uppercase tracking-wider text-muted-foreground">Disclaimer</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a basic automated scan. It provides an initial risk assessment and should not be considered a 
            comprehensive security audit. Always download apps from trusted sources.
          </p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground font-mono">
        © {new Date().getFullYear()} apkguard • All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;
