import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { LuSave } from "react-icons/lu";
import { useUpdateTask } from "../../../../hooks/useTasks";
import type { ProjectTask, SubmissionType, UpdateTaskPayload } from "../../../../types/task.types";
import { customToast } from "../../../utils/showToast";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ProjectTask;
  onSuccess: (updatedTask: ProjectTask) => void;
}

export default function EditSubmissionModal({
  isOpen,
  onClose,
  task,
  onSuccess,
}: EditTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { update, loading, error } = useUpdateTask();

  // Form States — diinisialisasi dari props task
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadlineDate, setDeadlineDate] = useState(
    task.deadline_at ? task.deadline_at.split("T")[0] : ""
  );
  const [specificTime, setSpecificTime] = useState(
    task.deadline_at ? task.deadline_at.split("T")[1]?.slice(0, 5) ?? "" : ""
  );
  const [submissionType, setSubmissionType] = useState<SubmissionType>(task.submission_type);

  // Sync form ketika task berubah (misal modal dibuka untuk task berbeda)
  useEffect(() => {
    setTaskTitle(task.title);
    setDescription(task.description);
    setDeadlineDate(task.deadline_at ? task.deadline_at.split("T")[0] : "");
    setSpecificTime(task.deadline_at ? task.deadline_at.split("T")[1]?.slice(0, 5) ?? "" : "");
    setSubmissionType(task.submission_type);
  }, [task]);

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
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdateTaskPayload = {};

    if (taskTitle.trim() !== task.title) payload.title = taskTitle.trim();
    if (description !== task.description) payload.description = description;
    if (deadlineDate !== task.deadline_at.split("T")[0]) payload.deadline_date = deadlineDate;
    if (specificTime !== (task.deadline_at.split("T")[1]?.slice(0, 5) ?? "")) payload.specific_time = specificTime;
    if (submissionType !== task.submission_type) payload.submission_type = submissionType;

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }
    const result = await update(task.id, payload, String(task.id_project));
    if (result.data) {
      customToast.success("Task diperbarui", result.message);
      onSuccess(result.data);
      onClose();
    } else {
      customToast.error("Gagal", result.message);
    }
  };

  return (
    <dialog ref={dialogRef} className="custom-dialog">

      {/* Header */}
      <div className="dialog-header">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Edit Task</h2>
        <button
          onClick={onClose}
          className="rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">

        {/* Error Message */}
        {error && (
          <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

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
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Tenggat Waktu</label>
            <div className="relative">
              <input
                type="date"
                required
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full p-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] appearance-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Waktu Spesifik</label>
            <div className="relative">
              <input
                type="time"
                required
                value={specificTime}
                onChange={(e) => setSpecificTime(e.target.value)}
                className="w-full p-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] appearance-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Tipe Pengumpulan</label>
          <div className="relative">
            <select
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value as SubmissionType)}
              className="w-full pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] appearance-none cursor-pointer"
            >
              <option value="file_upload">File</option>
              <option value="url_link">URL Link</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#B30000] hover:bg-[#990000] text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LuSave className="w-4 h-4 stroke-[2.5]" />
            {loading ? "Menyimpan..." : "Simpan Tugas"}
          </button>
        </div>

      </form>
    </dialog>
  );
}