import { useState, useRef } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { LuSendHorizontal } from "react-icons/lu";
import SubmitStatusTable from "./SubmissionStatusTable";

interface TaskFormFileProps {
  onSubmitSuccess: (files: File[]) => void;
  deadline?: Date;
}

export default function TaskFormFile({ onSubmitSuccess, deadline }: TaskFormFileProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(Array.from(e.target.files));
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const validateAndAddFiles = (selectedFiles: File[]) => {
    const allowedExtensions = ["pdf", "docx", "zip"];
    const validFiles: File[] = [];

    selectedFiles.forEach((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        if (file.size <= 10 * 1024 * 1024) {
          validFiles.push(file);
        } else {
          alert(`Ukuran file ${file.name} melebihi batas maksimal 10MB.`);
        }
      } else {
        alert(`Format file ${file.name} tidak didukung. Harap gunakan PDF, DOCX, atau ZIP.`);
      }
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Silakan pilih atau jatuhkan berkas tugas Anda terlebih dahulu.");
      return;
    }
    // Set to local submitted mode
    setIsSubmitted(true);
    // Call parent handler
    onSubmitSuccess(files);
  };

  const handleEditSubmission = () => {
    setIsSubmitted(false);
  };

  const handleDeleteSubmission = () => {
    if (confirm("Are you sure you want to delete this submission?")) {
      setFiles([]);
      setIsSubmitted(false);
    }
  };

// ganti if (isSubmitted) { return (...) }
if (isSubmitted) {
  return (
    <SubmitStatusTable
      type="file"
      files={files}
      submittedAt={new Date()}
      deadline={deadline} // opsional, kirim dari parent kalau ada
      onEdit={handleEditSubmission}
      onDelete={handleDeleteSubmission}
    />
  );
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        multiple
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
        className={`w-full min-h-[120px] border border-dashed rounded-xl p-4 bg-box-secondary cursor-pointer transition-all ${isDragActive ? "border-[#B30000] bg-red-50/40" : "border-foreground hover:border-gray-500"
          }`}
      >
        {files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm font-medium text-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-700 stroke-[2.5]" />
                  {file.name}
                </div>
                <button
                  type="button"
                  onClick={(e) => removeFile(index, e)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2 pointer-events-none text-center py-6">
            <UploadCloud className="w-8 h-8 text-gray-400 mx-auto stroke-[1.5]" />
            <p className="text-sm font-bold text-gray-700">
              Click to upload <span className="font-medium text-gray-500">or drag & drop</span>
            </p>
            <p className="text-[11px] text-gray-400 font-semibold">PDF, DOCX, or ZIP (Max. 10MB)</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#B30000] hover:bg-[#990000] text-white font-bold text-base py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 tracking-wide cursor-pointer"
      >
        Save Changes
        <LuSendHorizontal className="w-4 h-4 stroke-[2.5]" />
      </button>
    </form>
  );
}