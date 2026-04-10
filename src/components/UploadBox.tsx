import { useState, useCallback } from "react";
import { Upload, FileArchive } from "lucide-react";
import { motion } from "framer-motion";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

const UploadBox = ({ onFileSelect }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file.name.endsWith(".apk")) {
      setSelectedFile(file);
    }
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
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-10 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-neon-green bg-neon-green/5 glow-green"
            : "border-border hover:border-muted-foreground"
        }`}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <FileArchive className="h-12 w-12 text-neon-green" />
            <p className="text-foreground font-medium">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-3 cursor-pointer">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="text-foreground font-medium">Drag & drop your APK file here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
            <input
              type="file"
              accept=".apk"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleScan}
        disabled={!selectedFile}
        className="mt-6 w-full py-4 rounded-xl font-semibold text-primary-foreground bg-primary disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity glow-green animate-pulse-glow"
      >
        {selectedFile ? "Scan APK Now" : "Select a file to scan"}
      </motion.button>
    </div>
  );
};

export default UploadBox;
