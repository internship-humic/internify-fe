import { useRef, useEffect, useState } from "react";
import { X, FileText, Link } from "lucide-react";
import { useCreateTask } from '../../../../hooks/useTasks';
import type { SubmissionType } from '../../../../types/task.types';
import { customToast } from '../../../utils/showToast';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onSuccess: () => void;
}

export default function CreateTaskModal({ isOpen, onClose, projectId, onSuccess }: CreateTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { create, loading } = useCreateTask(projectId);
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [specificTime, setSpecificTime] = useState("");
  const [submissionType, setSubmissionType] = useState<SubmissionType>("file_upload");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) { 
      dialog.showModal(); 
      document.body.style.overflow = "hidden";
    }

    else { 
      dialog.close(); 
      document.body.style.overflow = "unset";
    }
    
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    
    dialog.addEventListener("cancel", handleCancel);
    
    return () => {
      dialog.removeEventListener(
        "cancel", handleCancel
      ); 
      document.body.style.overflow = "unset"; 
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await create({
      title: taskTitle,
      description,
      deadline_date: deadlineDate,
      specific_time: specificTime,
      submission_type: submissionType,
    });

    if (result) {
      customToast.success(
        'Task created',
        `"${taskTitle}" has been successfully added to the project.`);
      onSuccess();

    } else {
      customToast.error(
        'Failed to create task',
        'An error occurred while saving the task. Please try again.');
    }
  };
  return (
    <dialog ref={dialogRef} className="custom-dialog p-[1.5rem]">
      <div className="dialog-header">
        <div>
          <h2 className="text-[26px] font-bold text-[#B30000] tracking-tight">Create New Task</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Fill in the details for the next intern assignment.</p>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="px-6 space-y-2 overflow-y-auto flex-1">
        <div>
          <label className="text-xs font-bold text-gray-700 tracking-wide">Task Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Design High-Fidelity Prototypes"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-3 py-4 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Description</label>
          <textarea
            rows={4}
            placeholder="Outline the requirements and objectives..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000] resize-none leading-relaxed" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Deadline Date</label>
            <input
              type="date"
              required
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">Specific Time</label>
            <input
              type="time"
              required
              value={specificTime}
              onChange={(e) => setSpecificTime(e.target.value)}
              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-[#B30000] focus:ring-1 focus:ring-[#B30000]" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">Submission Type</label>
          <div className="grid grid-cols-2 gap-3">
            {(["file_upload", "url_link"] as SubmissionType[]).map((type) => (
              <div key={type} onClick={() => setSubmissionType(type)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${submissionType === type ? "border-[#B30000] bg-[#B30000] text-white font-semibold" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}>
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${submissionType === type ? "border-white bg-white" : "border-gray-300"}`}>
                  {submissionType === type && <div className="w-1.5 h-1.5 bg-[#B30000] rounded-full" />}
                </div>
                {type === "file_upload" ? <FileText className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                <span className="text-xs">{type === "file_upload" ? "File Upload" : "URL Link"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gray-100 my-2" />
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="p-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="p-3 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-xl transition-colors shadow-md disabled:opacity-50">
            {loading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </dialog>
  );
}