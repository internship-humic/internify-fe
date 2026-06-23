import { useState } from "react";
import { Link, FileText } from "lucide-react";
import { LuSendHorizontal } from "react-icons/lu";
import SubmitStatusTable from "./SubmissionStatusTable";

interface TaskFormLinkProps {
  onSubmitSuccess: (link: string) => void;
  deadline?: Date;
}

export default function TaskFormLink({ onSubmitSuccess, deadline }: TaskFormLinkProps) {
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionLink.trim()) {
      // alert("Silakan masukkan link tugas Anda terlebih dahulu.");
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
    <SubmitStatusTable
      type="link"
      link={submissionLink}
      submittedAt={new Date()}
      deadline={deadline}
      onEdit={handleEditSubmission}
      onDelete={handleDeleteSubmission}
    />
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