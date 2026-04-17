import { useState, useCallback } from "react";
import { Upload, FileArchive, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const UploadBox = ({ onFileSelect }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith(".apk")) {
      toast({
        title: "ভুল ফাইল ভাই 😅",
        description: "শুধু .apk ফাইল আপলোড করো।",
        variant: "destructive",
      });
      return;
    }
    if (file.size > MAX_SIZE) {
      toast({
        title: "ফাইল অনেক বড় 📦",
        description: "সর্বোচ্চ 100MB সাইজের APK দেওয়া যাবে।",
        variant: "destructive",
      });
      return;
    }
    setSelectedFile(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleScan = () => {
    if (selectedFile) onFileSelect(selectedFile);
  };

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        animate={isDragging ? { scale: 1.01 } : { scale: 1 }}
        className="relative"
      >
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer overflow-hidden border bg-card/40 ${
            isDragging ? "border-neon-green/60 glow-green-soft" : "border-border/60 hover:border-neon-green/30"
          }`}
        >
          {/* Scan line effect when dragging */}
          {isDragging && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green to-transparent animate-scan-line" />
            </div>
          )}

          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                key="file"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-3 relative z-10"
              >
                <div className="relative">
                  <FileArchive className="h-14 w-14 text-neon-green" />
                  <motion.div
                    className="absolute -inset-3 rounded-full border border-neon-green/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <p className="text-foreground font-semibold text-lg">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  className="mt-1 text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Remove
                </button>
              </motion.div>
            ) : (
              <motion.label
                key="upload"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 cursor-pointer relative z-10"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/50">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-neon-green/40" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-neon-green/40" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-neon-green/40" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-neon-green/40" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">Drag & drop your APK file here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse • .apk only • max 100MB</p>
                </div>
                <input
                  type="file"
                  accept=".apk"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </motion.label>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: selectedFile ? 1.01 : 1 }}
        whileTap={{ scale: selectedFile ? 0.99 : 1 }}
        onClick={handleScan}
        disabled={!selectedFile}
        className="btn-shine mt-5 w-full py-3.5 rounded-xl font-semibold text-primary-foreground bg-primary disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all duration-300 enabled:glow-green enabled:hover:shadow-[0_0_0_1px_hsl(142_70%_48%/0.4),0_12px_40px_-8px_hsl(142_70%_48%/0.5)]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 text-base">
          {selectedFile ? "Initiate Scan" : "Select a file to scan"}
        </span>
      </motion.button>
    </div>
  );
};

export default UploadBox;
