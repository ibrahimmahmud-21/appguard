import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ScanResult from "@/components/ScanResult";
import ScanningAnimation from "@/components/ScanningAnimation";
import ParticleBackground from "@/components/ParticleBackground";
import { scanApkContent, readFileAsText, type ScanResult as ScanResultType } from "@/lib/apkScanner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ViewState = "home" | "scanning" | "result";
type ScanPhase = "uploading" | "scanning" | "done";

const Index = () => {
  const [view, setView] = useState<ViewState>("home");
  const [fileName, setFileName] = useState("");
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);
  const [phase, setPhase] = useState<ScanPhase>("uploading");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [vtReport, setVtReport] = useState<any>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setFileName(file.name);
    setView("scanning");
    setPhase("uploading");
    setUploadProgress(0);
    setVtReport(null);

    const path = `${crypto.randomUUID()}-${file.name}`;

    try {
      // Simulated progress while uploading (Supabase JS doesn't expose progress events)
      const fakeTimer = setInterval(() => {
        setUploadProgress((p) => Math.min(p + 5, 90));
      }, 200);

      const { error: upErr } = await supabase.storage
        .from("apk-uploads")
        .upload(path, file, {
          contentType: "application/vnd.android.package-archive",
          upsert: false,
        });

      clearInterval(fakeTimer);
      setUploadProgress(100);

      if (upErr) throw upErr;

      // Local quick scan for fallback display
      const text = await readFileAsText(file);
      const localResult = scanApkContent(text, file.name);
      setScanResult(localResult);

      setPhase("scanning");

      // Call VirusTotal edge function
      const { data, error } = await supabase.functions.invoke("scan-apk", {
        body: { storagePath: path },
      });

      if (error) {
        toast({
          title: "VirusTotal স্ক্যানে সমস্যা 😓",
          description: error.message ?? "একটু পরে আবার চেষ্টা করো।",
          variant: "destructive",
        });
      } else {
        setVtReport(data);
      }

      setPhase("done");
    } catch (e: any) {
      toast({
        title: "আপলোডে ঝামেলা হলো 🚧",
        description: e?.message ?? "আবার চেষ্টা করো ভাই।",
        variant: "destructive",
      });
      setView("home");
    }
  }, []);

  const handleScanComplete = useCallback(() => {
    setView("result");
  }, []);

  const handleScanAnother = useCallback(() => {
    setView("home");
    setFileName("");
    setScanResult(null);
    setVtReport(null);
    setPhase("uploading");
    setUploadProgress(0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      {view === "scanning" ? (
        <ScanningAnimation
          fileName={fileName}
          phase={phase}
          uploadProgress={uploadProgress}
          onComplete={handleScanComplete}
        />
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
