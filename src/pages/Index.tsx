import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ScanResult from "@/components/ScanResult";
import ScanningAnimation from "@/components/ScanningAnimation";
import ParticleBackground from "@/components/ParticleBackground";

type ViewState = "home" | "scanning" | "result";

const Index = () => {
  const [view, setView] = useState<ViewState>("home");
  const [fileName, setFileName] = useState("");

  const handleFileSelect = useCallback((file: File) => {
    setFileName(file.name);
    setView("scanning");
  }, []);

  const handleScanComplete = useCallback(() => {
    setView("result");
  }, []);

  const handleScanAnother = useCallback(() => {
    setView("home");
    setFileName("");
  }, []);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      {view === "scanning" ? (
        <ScanningAnimation fileName={fileName} onComplete={handleScanComplete} />
      ) : view === "result" ? (
        <ScanResult fileName={fileName} onScanAnother={handleScanAnother} />
      ) : (
        <>
          <HeroSection onFileSelect={handleFileSelect} />
          <FeaturesSection />
          <HowItWorks />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
