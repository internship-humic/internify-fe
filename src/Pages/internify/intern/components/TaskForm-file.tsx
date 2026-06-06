import { useState, useRef } from "react";
import { FileText, UploadCloud } from "lucide-react";
import { LuSendHorizontal } from "react-icons/lu";

interface TaskFormFileProps {
  taskId: string | undefined;
  onSubmitSuccess: (file: File) => void;
}

export default function TaskFormFile({ taskId, onSubmitSuccess }: TaskFormFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const allowedExtensions = ["pdf", "docx", "zip"];
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        alert("Ukuran file melebihi batas maksimal 10MB.");
      }
    } else {
      alert("Format file tidak didukung. Harap gunakan PDF, DOCX, atau ZIP.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Silakan pilih atau jatuhkan berkas tugas Anda terlebih dahulu.");
      return;
    }
    onSubmitSuccess(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.zip"
        className="hidden"
      />

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full min-h-[180px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-[#B30000] bg-red-50/40"
            : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
        }`}
      >
        {file ? (
          <div className="space-y-2 pointer-events-none animate-in fade-in duration-200">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="text-sm font-bold text-gray-800 max-w-md truncate">{file.name}</p>
            <p className="text-xs text-gray-400">
              {(file.size / (1024 * 1024)).toFixed(2)} MB • Klik untuk mengganti berkas
            </p>
          </div>
        ) : (
          <div className="space-y-2 pointer-events-none">
            <UploadCloud className="w-10 h-10 text-gray-400 mx-auto stroke-[1.5]" />
            <div>
              <p className="text-sm font-bold text-gray-700">
                Click to upload <span className="font-medium text-gray-500">or drag & drop</span>
              </p>
              <p className="text-[11px] text-gray-400 font-semibold mt-1">
                PDF, DOCX, or ZIP (Max. 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#B30000] hover:bg-[#990000] text-white font-bold text-base py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 tracking-wide cursor-pointer"
      >
        Submit Task
        <LuSendHorizontal className="w-4 h-4 stroke-[2.5]" />
      </button>
    </form>
  );
}