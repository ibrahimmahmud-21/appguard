import logo from "@/assets/apkguard-logo.png";

const Footer = () => (
  <footer className="relative border-t border-border/60 mt-16">
    <div className="container py-12">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Brand block — full logo */}
        <div className="space-y-4">
          <a href="/" className="inline-flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="apkguard"
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight text-neon-green">
              apkguard
            </span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Protecting Android users by scanning APK files for malware, suspicious permissions, and hidden threats.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#features" className="text-foreground/80 hover:text-neon-green transition-colors duration-200">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-foreground/80 hover:text-neon-green transition-colors duration-200">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground/80 hover:text-neon-green transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Disclaimer
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is an automated scan and provides an initial risk assessment only. Always download apps from trusted sources.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
        <span>© {new Date().getFullYear()} apkguard — All rights reserved</span>
        <span>
          Developed by{" "}
          <a
            href="https://ibrahimmahmud.pro.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-green hover:text-neon-green/80 underline underline-offset-4 decoration-neon-green/40 hover:decoration-neon-green transition-colors duration-200"
          >
            Ibrahim Mahmud
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
