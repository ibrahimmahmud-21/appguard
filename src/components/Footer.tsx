import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-neon-green" />
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
          <h4 className="font-semibold mb-3">Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Disclaimer</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a basic automated scan. It provides an initial risk assessment and should not be considered a 
            comprehensive security audit. Always download apps from trusted sources.
          </p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} apkguard. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
