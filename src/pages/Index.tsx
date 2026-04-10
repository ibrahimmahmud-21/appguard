import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ScanResult from "@/components/ScanResult";

const Index = () => {
  const [scannedFile, setScannedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      {scannedFile ? (
        <ScanResult
          fileName={scannedFile.name}
          onScanAnother={() => setScannedFile(null)}
        />
      ) : (
        <>
          <HeroSection onFileSelect={setScannedFile} />
          <FeaturesSection />
          <HowItWorks />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
