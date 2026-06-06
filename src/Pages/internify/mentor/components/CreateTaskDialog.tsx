import { useRef, useEffect, useState } from "react";
import { X, Calendar, Clock, FileText, Link } from "lucide-react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
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
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto flex flex-col w-[calc(100%-2rem)] max-w-[480px] max-h-[calc(100vh-4rem)] rounded-2xl border border-gray-100 bg-white p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header Modal */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-gray-50">
        <div>
          <h2 className="text-xl font-bold text-[#B30000] tracking-tight">Create New Task</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Fill in the details for the next intern assignment.
          </p>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Body Form Modal (Scrollable jika layar pendek) */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
        
        {/* Task Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Task Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Design High-Fidelity Prototypes"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Description</label>
          <textarea
            rows={4}
            placeholder="Outline the requirements and objectives..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] resize-none leading-relaxed"
          />
        </div>

        {/* Deadline Grid (Date & Time) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Deadline Date</label>
            <div className="relative">
              <input
                type="date"
                required
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]"
              />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Specific Time (Jam)</label>
            <div className="relative">
              <input
                type="time"
                required
                value={specificTime}
                onChange={(e) => setSpecificTime(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]"
              />
              <Clock className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Submission Type Card Radio */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Submission Type</label>
          <div className="grid grid-cols-2 gap-3">
            
            {/* Opsi 1: File Upload */}
            <div
              onClick={() => setSubmissionType("file")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                submissionType === "file"
                  ? "border-[#B30000] bg-[#B30000] text-white font-semibold"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${submissionType === "file" ? "border-white bg-white" : "border-gray-300"}`}>
                {submissionType === "file" && <div className="w-1.5 h-1.5 bg-[#B30000] rounded-full" />}
              </div>
              <FileText className="w-4 h-4" />
              <span className="text-xs">File Upload</span>
            </div>

            {/* Opsi 2: URL Link */}
            <div
              onClick={() => setSubmissionType("url")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                submissionType === "url"
                  ? "border-[#B30000] bg-[#B30000] text-white font-semibold"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${submissionType === "url" ? "border-white bg-white" : "border-gray-300"}`}>
                {submissionType === "url" && <div className="w-1.5 h-1.5 bg-[#B30000] rounded-full" />}
              </div>
              <Link className="w-4 h-4" />
              <span className="text-xs">URL Link</span>
            </div>

          </div>
        </div>

        <div className="h-px bg-gray-100 my-2" />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-xl transition-colors shadow-md"
          >
            Save Task
          </button>
        </div>

      </form>
    </dialog>
  );
}