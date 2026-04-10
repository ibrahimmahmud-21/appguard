import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ScanResult from "@/components/ScanResult";
import ScanningAnimation from "@/components/ScanningAnimation";
import ParticleBackground from "@/components/ParticleBackground";
import { scanApkContent, readFileAsText, type ScanResult as ScanResultType } from "@/lib/apkScanner";

type ViewState = "home" | "scanning" | "result";

const Index = () => {
  const [view, setView] = useState<ViewState>("home");
  const [fileName, setFileName] = useState("");
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);
  const scanDoneRef = useRef(false);

  const handleFileSelect = useCallback(async (file: File) => {
    setFileName(file.name);
    setView("scanning");
    scanDoneRef.current = false;

    const text = await readFileAsText(file);
    const result = scanApkContent(text, file.name);
    setScanResult(result);
    scanDoneRef.current = true;
  }, []);

  const handleScanComplete = useCallback(() => {
    setView("result");
  }, []);

  const handleScanAnother = useCallback(() => {
    setView("home");
    setFileName("");
    setScanResult(null);
  }, []);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      {view === "scanning" ? (
        <ScanningAnimation fileName={fileName} onComplete={handleScanComplete} />
      ) : view === "result" && scanResult ? (
        <ScanResult result={scanResult} fileName={fileName} onScanAnother={handleScanAnother} />
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
