import { useState } from "react";
import { Link, FileText } from "lucide-react";
import { LuSendHorizontal } from "react-icons/lu";

interface TaskFormLinkProps {
  taskId: string | undefined;
  onSubmitSuccess: (link: string) => void;
}

export default function TaskFormLink({ taskId, onSubmitSuccess }: TaskFormLinkProps) {
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionLink.trim()) {
      alert("Silakan masukkan link tugas Anda terlebih dahulu.");
      return;
    }
    setIsSubmitted(true); // ini hilang
    onSubmitSuccess(submissionLink);
  };

  const handleEditSubmission = () => {
    setIsSubmitted(false);
  };

  const handleDeleteSubmission = () => {
    if (confirm("Are you sure you want to delete this submission?")) {
      setSubmissionLink("");
      setIsSubmitted(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-700 stroke-[2]" />
            <h3 className="font-bold text-gray-800 text-sm">Submit Status</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEditSubmission}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs py-1.5 px-3 rounded-lg transition-colors"
            >
              Edit Submission
            </button>
            <button
              onClick={handleDeleteSubmission}
              className="bg-gray-200 hover:bg-red-100 text-gray-800 hover:text-red-700 font-bold text-xs py-1.5 px-3 rounded-lg transition-colors"
            >
              Delete Submission
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="p-4 text-sm text-gray-500 font-medium bg-gray-50 border-r border-gray-100">Submission status</div>
            <div className="p-4 text-sm text-gray-800 font-medium">Submitted for grading</div>
          </div>
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="p-4 text-sm text-gray-500 font-medium bg-gray-50 border-r border-gray-100">Grading status</div>
            <div className="p-4 text-sm text-gray-800 font-medium">pc: Not graded</div>
          </div>
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="p-4 text-sm text-gray-500 font-medium bg-gray-50 border-r border-gray-100">Time Remaining</div>
            <div className="p-4 text-sm text-gray-800 font-medium">pc: Assignment was submitted 2 days 15 hours early</div>
          </div>
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="p-4 text-sm text-gray-500 font-medium bg-gray-50 border-r border-gray-100">Link submission</div>
            <div className="p-4 text-sm font-medium">
              <a
                href={submissionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all flex items-center gap-1.5"
              >
                <Link className="w-3.5 h-3.5 shrink-0" />
                {submissionLink}
              </a>
            </div>
        </div>
      </div>
      </div >
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
          Submission Link (PDF)
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-gray-400">
            <Link className="w-4 h-4 stroke-[2]" />
          </span>
          <input
            type="url"
            required
            placeholder="https://example.com/your-pdf-link"
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
          />
        </div>
        <p className="text-[11px] text-gray-400 font-medium pt-0.5">
          Ensure the link is accessible to the mentor (e.g., Google Drive, Dropbox).
        </p>
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