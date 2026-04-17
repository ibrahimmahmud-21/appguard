import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-border/40 py-12 mt-8 overflow-hidden">
    {/* Background blending with hero */}
    <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[120px] bg-neon-green/5 blur-[100px] pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

    <div className="container relative z-10">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <a href="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-neon-green/10 border border-neon-green/30 group-hover:border-neon-green/70 transition-all duration-300">
              <Shield className="h-4 w-4 text-neon-green transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-lg bg-neon-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold tracking-tight text-neon-green">
              apkguard
            </span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Protecting Android users by scanning APK files for malware, suspicious permissions, and hidden threats.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-neon-green transition-colors duration-300">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-neon-green transition-colors duration-300">How It Works</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors duration-300">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Disclaimer</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a basic automated scan. It provides an initial risk assessment and should not be considered a
            comprehensive security audit. Always download apps from trusted sources.
          </p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
        <span>© {new Date().getFullYear()} apkguard • All rights reserved</span>
        <span>
          Developed by{" "}
          <a
            href="https://ibrahimmahmud.pro.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-green hover:text-neon-green/80 underline underline-offset-4 decoration-neon-green/40 hover:decoration-neon-green transition-colors duration-300"
          >
            Ibrahim Mahmud
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
