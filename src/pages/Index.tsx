import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ScanResult, { type VtVerdict } from "@/components/ScanResult";
import ScanningAnimation from "@/components/ScanningAnimation";
import ParticleBackground from "@/components/ParticleBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ViewState = "home" | "scanning" | "result";
type ScanPhase = "uploading" | "scanning" | "done";

const Index = () => {
  const [view, setView] = useState<ViewState>("home");
  const [fileName, setFileName] = useState("");
  const [phase, setPhase] = useState<ScanPhase>("uploading");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [verdict, setVerdict] = useState<VtVerdict | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>("");

  const handleFileSelect = useCallback(async (file: File) => {
    setFileName(file.name);
    setView("scanning");
    setPhase("uploading");
    setUploadProgress(0);
    setVerdict(null);
    setAiExplanation("");

    const path = `${crypto.randomUUID()}-${file.name}`;

    try {
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

      setPhase("scanning");

      const { data, error } = await supabase.functions.invoke("scan-apk", {
        body: { storagePath: path },
      });

      if (error) {
        toast({
          title: "VirusTotal স্ক্যানে সমস্যা 😓",
          description: error.message ?? "একটু পরে আবার চেষ্টা করো।",
          variant: "destructive",
        });
        setView("home");
        return;
      }

      if (data?.status === "pending") {
        toast({
          title: "স্ক্যান এখনো চলছে ⏳",
          description: data.message ?? "একটু পরে আবার চেষ্টা করো।",
        });
        setView("home");
        return;
      }

      if (data?.error) {
        toast({
          title: "সমস্যা হয়েছে",
          description: data.error,
          variant: "destructive",
        });
        setView("home");
        return;
      }

      setVerdict(data?.verdict ?? null);
      setAiExplanation(data?.aiExplanation ?? "");
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
    setVerdict(null);
    setAiExplanation("");
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
      ) : view === "result" && verdict ? (
        <ScanResult
          verdict={verdict}
          aiExplanation={aiExplanation}
          fileName={fileName}
          onScanAnother={handleScanAnother}
        />
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
