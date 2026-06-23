import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { LuSave, LuCalendar } from "react-icons/lu";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSubmissionModal({ isOpen, onClose }: EditTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Form States
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [specificTime, setSpecificTime] = useState("");
  const [submissionType, setSubmissionType] = useState<"file" | "url">("file");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { taskTitle, description, deadlineDate, specificTime, submissionType };
    console.log("Saving Task:", payload);
    alert("Task Saved Successfully!");
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="custom-dialog">

      {/* Header */}
      <div className="dialog-header">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Task</h2>
        <button
          onClick={onClose}
          className="rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Laporan tugas 2"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Deskripsi</label>
          <textarea
            rows={5}
            placeholder="Outline the requirements and objectives..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] resize-none leading-relaxed"
          />
        </div>

        {/* Deadline & Submission Type Grid */}
        <div className="grid grid-cols-2 gap-4">

          {/* Deadline Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Tenggat Waktu</label>
            <div className="relative">
              <input
                type="date"
                required
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full p-3  py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] appearance-none"
              />
            </div>
          </div>

          {/* Submission Type Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Tipe Pengumpulan</label>
            <div className="relative">
              <select
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value as "file" | "url")}
                className="w-full pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] appearance-none cursor-pointer"
              >
                <option value="file">File</option>
                <option value="url">URL Link</option>
              </select>
              {/* Custom chevron icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

        </div>

        <div className="h-px bg-gray-100" />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#B30000] hover:bg-[#990000] text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center gap-2"
          >
            <LuSave className="w-4 h-4 stroke-[2.5]" />
            Simpan Tugas
          </button>
        </div>

      </form>
    </dialog>
  );
}