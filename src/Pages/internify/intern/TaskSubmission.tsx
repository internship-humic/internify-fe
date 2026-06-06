import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, FileText, Info } from "lucide-react";
import TaskFormFile from "./components/TaskForm-file";
import TaskFormLink from "./components/TaskForm-link";

export default function TaskSubmission() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // State untuk menentukan jenis input ("file" atau "link")
  const [submissionType, setSubmissionType] = useState<"file" | "link">("file");

  const handleFileSubmit = (file: File) => {
    console.log(`Submitting File for Task ${id}:`, file.name);
    alert(`File ${file.name} berhasil dikirim!`);
  };

  const handleLinkSubmit = (link: string) => {
    console.log(`Submitting Link for Task ${id}:`, link);
    alert(`Link berhasil dikirim!`);
  };

  return (
    <div className="container space-y-4">
      {/* Header Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Laporan Tugas 2</h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mt-1.5">
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Due Oct 25, 2024 at 23:59</span>
            </div>
          </div>
          
          {/* Switcher Demo Sederhana (Bisa kamu hapus jika tipe datang dari database/routing) */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg text-xs font-bold">
            <button 
              onClick={() => setSubmissionType("file")}
              className={`px-3 py-1 rounded-md transition-colors ${submissionType === "file" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Mode File
            </button>
            <button 
              onClick={() => setSubmissionType("link")}
              className={`px-3 py-1 rounded-md transition-colors ${submissionType === "link" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Mode Link
            </button>
          </div>
        </div>
      </div>

      {/* Task Description Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-3">
        <h2 className="text-base font-bold text-gray-800 tracking-tight">Task Description</h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Pada tugas pertama ini, Anda diminta untuk melakukan analisis mendalam terhadap kebutuhan pengguna 
          untuk sistem "Smart Campus Utility". Analisis ini akan menjadi fondasi bagi perancangan antarmuka pada 
          fase berikutnya.
        </p>
      </div>

      {/* Submit Area Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-5">
        <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
          <FileText className="w-4 h-4 text-[#B30000] stroke-[2.5]" />
          <h2 className="text-base font-bold text-gray-800 tracking-tight">Submit Task</h2>
        </div>

        {/* Render Komponen secara Kondisional */}
        {submissionType === "file" ? (
          <TaskFormFile taskId={id} onSubmitSuccess={handleFileSubmit} />
        ) : (
          <TaskFormLink taskId={id} onSubmitSuccess={handleLinkSubmit} />
        )}

        {/* Info Box */}
        <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
            Once submitted, your work will be locked for mentor review. You can request a re-submission if needed.
          </p>
        </div>
      </div>
    </div>
  );
}