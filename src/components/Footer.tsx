import fullLogo from "@/assets/apkguard-full-logo.png";

const Footer = () => (
  <footer className="relative border-t border-border/70 mt-16 overflow-hidden">
    {/* Subtle grid + soft glow blending with bg */}
    <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
    <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.08] rounded-full blur-[120px] pointer-events-none" />

    <div className="container py-14 relative z-10">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Brand block — full logo */}
        <div className="space-y-4">
          <a href="/" className="inline-flex items-center group">
            <img
              src={fullLogo}
              alt="apkguard"
              className="h-20 w-auto object-contain hover-glow"
              style={{ mixBlendMode: "multiply" }}
            />
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
              <a href="#features" className="text-foreground/80 hover:text-primary transition-colors duration-200">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors duration-200">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground/80 hover:text-primary transition-colors duration-200">
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
      <div className="mt-12 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
        <span>© {new Date().getFullYear()} apkguard — All rights reserved</span>
        <span>
          Developed by{" "}
          <a
            href="https://ibrahimmahmud.pro.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-200 font-semibold"
          >
            Ibrahim Mahmud
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
