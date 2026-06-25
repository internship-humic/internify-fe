import { useState, useRef } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { LuSendHorizontal } from "react-icons/lu";
import SubmitStatusTable from "./SubmissionStatusTable";
import { useSubmission } from "../../../../hooks/useTasks";
import type { TaskSubmissionData } from "../../../../types/task.types";

interface TaskFormFileProps {
  taskId: string;
  deadline?: Date;
  initialSubmission?: TaskSubmissionData | null;
}

export default function TaskFormFile({ taskId, deadline, initialSubmission }: TaskFormFileProps) {
  const { submission, loading, submitFile, updateFile, remove } = useSubmission(taskId, initialSubmission);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = (selectedFiles: File[]) => {
    const allowedExtensions = ["pdf", "docx", "zip"];
    const validFiles: File[] = [];
    selectedFiles.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext && allowedExtensions.includes(ext)) {
        if (file.size <= 10 * 1024 * 1024) validFiles.push(file);
        else alert(`Ukuran file ${file.name} melebihi 10MB.`);
      } else {
        alert(`Format ${file.name} tidak didukung. Gunakan PDF, DOCX, atau ZIP.`);
      }
    });
    if (validFiles.length > 0) setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files.length > 0) validateAndAddFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) { alert("Pilih file terlebih dahulu."); return; }
    const res = isEditing
      ? await updateFile(submission!.id, files[0])
      : await submitFile(files[0]);
    if (res) { setIsEditing(false); setFiles([]); }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus submission ini?")) return;
    const ok = await remove(submission!.id);
    if (ok) { setFiles([]); setIsEditing(false); }
  };

  // Sudah ada submission dan tidak sedang edit → tampilkan status
  if (submission && !isEditing) {
    return (
      <SubmitStatusTable
        type="file"
        filePath={submission.file_path}
        submittedAt={new Date(submission.submitted_at)}
        deadline={deadline}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={(e) => e.target.files && validateAndAddFiles(Array.from(e.target.files))}
        accept=".pdf,.docx,.zip"
        className="hidden"
      />
      <div
        onDragEnter={handleDrag} onDragOver={handleDrag}
        onDragLeave={handleDrag} onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full min-h-[120px] border border-dashed rounded-xl p-4 bg-box-secondary cursor-pointer transition-all ${isDragActive ? "border-[#B30000] bg-red-50/40" : "border-foreground hover:border-gray-500"
          }`}
      >
        {files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between text-sm font-medium text-gray-800" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-700 stroke-[2.5]" />
                  {file.name}
                </div>
                <button type="button" onClick={(e) => removeFile(index, e)} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2 pointer-events-none text-center py-6">
            <UploadCloud className="w-8 h-8 text-gray-400 mx-auto stroke-[1.5]" />
            <p className="text-sm font-bold text-gray-700">Click to upload <span className="font-medium text-gray-500">or drag & drop</span></p>
            <p className="text-[11px] text-gray-400 font-semibold">PDF, DOCX, or ZIP (Max. 10MB)</p>
          </div>
        )}
      </div>
      <button
        type="submit" disabled={loading}
        className="w-full bg-[#B30000] hover:bg-[#990000] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 tracking-wide cursor-pointer"
      >
        {loading ? "Mengirim..." : isEditing ? "Update Submission" : "Save Changes"}
        <LuSendHorizontal className="w-4 h-4 stroke-[2.5]" />
      </button>
    </form>
  );
}