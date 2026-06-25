import { useState } from "react";
import { Link } from "lucide-react";
import { LuSendHorizontal } from "react-icons/lu";
import SubmitStatusTable from "./SubmissionStatusTable";
import { useSubmission } from "../../../../hooks/useTasks";
import type { TaskSubmissionData } from "../../../../types/task.types";

interface TaskFormLinkProps {
  taskId: string;
  deadline?: Date;
  initialSubmission?: TaskSubmissionData | null;
}

export default function TaskFormLink({ taskId, deadline, initialSubmission }: TaskFormLinkProps) {
  const { submission, loading, submitLink, updateLink, remove } = useSubmission(taskId, initialSubmission);
  const [inputLink, setInputLink] = useState(initialSubmission?.url_link ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLink.trim()) return;
    const res = isEditing
      ? await updateLink(submission!.id, inputLink)
      : await submitLink(inputLink);
    if (res) { setIsEditing(false); }
  };

  const handleDelete = async () => {
  if (!confirm("Yakin ingin menghapus submission ini?")) return;
  const ok = await remove(submission!.id);
  if (ok) setInputLink("");
};

  if (submission && !isEditing) {
    return (
      <SubmitStatusTable
        type="link"
        link={submission.url_link ?? ""}
        submittedAt={new Date(submission.submitted_at)}
        deadline={deadline}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-font-shade tracking-wide block">
          {isEditing ? "Update Submission Link" : "Submission Link"}
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-font/70">
            <Link className="w-4 h-4 stroke-[2]" />
          </span>
          <input
            type="url" required
            placeholder="https://example.com/your-pdf-link"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-box-primary/50 border border-box-border rounded-lg text-sm placeholder-font text-font focus:outline-none focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
          />
        </div>
        <p className="text-[11px] text-font font-medium pt-0.5">
          Ensure the link is accessible to the mentor (e.g., Google Drive, Dropbox).
        </p>
      </div>
      <button
        type="submit" disabled={loading}
        className="w-full bg-[#B30000] hover:bg-[#990000] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 tracking-wide cursor-pointer"
      >
        {loading ? "Mengirim..." : isEditing ? "Update Submission" : "Submit Task"}
        <LuSendHorizontal className="w-4 h-4 stroke-[2.5]" />
      </button>
    </form>
  );
}