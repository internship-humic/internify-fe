import { useState } from "react";
import { FileText, FileUp, Link } from "lucide-react";
import { resolveImageUrl } from "../../../utils/SertificateGenerator";

interface SubmitStatusTableProps {
  type: "file" | "link";
  files?: Array<{ id: number; file_path: string; original_name: string }>;
  link?: string;
  submittedAt?: Date;
  deadline?: Date;
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}

function getTimeEarly(submittedAt: Date, deadline: Date): string {
  const diffMs = deadline.getTime() - submittedAt.getTime();
  if (diffMs <= 0) return "Submitted after deadline";
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffHours / 24);
  const hours = diffHours % 24;
  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  return `Assignment was submitted ${parts.join(" ")} early`;
}

export default function SubmitStatusTable({
  type,
  files = [],
  link = "",
  submittedAt = new Date(),
  deadline,
  onEdit,
  onDelete,
  disabled = false,
}: SubmitStatusTableProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const timeLabel = deadline
    ? getTimeEarly(submittedAt, deadline)
    : "Assignment was submitted early";

  const rows = [
    { label: "Submission status", value: "Submitted" },
    { label: "Time Remaining", value: timeLabel },
  ];

  return (
    <div className="bg-box-secondary border border-box-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-box-border">
        <div className="flex items-center gap-2">
          {confirmDelete ? (
            <span className="text-xs font-medium text-gray-600">
              Are you sure you want to remove your submission?
            </span>
          ) : (
            <>
              <FileUp className="w-5 h-5 text-red-700 stroke-[2]" />
              <span className="font-bold text-sm text-gray-800">Submit Status</span>
            </>
          )}
        </div>

        {confirmDelete ? (
          /* Confirm state */
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs font-medium px-4 py-1.5 rounded-lg bg-card border border-card-outline text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirmDelete(false);
                onDelete();
              }}
              className="text-xs font-medium px-4 py-1.5 rounded-lg bg-primary text-white hover:bg-red-800 transition-colors"
            >
              Continue
            </button>
          </div>
        ) : (
          /* Default state */
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              disabled={disabled}
              className="text-xs font-medium px-4 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Edit Submission
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              disabled={disabled}
              className="text-xs font-medium px-4 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Delete Submission
            </button>
          </div>
        )}
      </div>

      {/* Rows */}
      <div>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[180px_1fr] border-b border-box-border"
          >
            <div className="px-4 py-3 text-sm text-font border-r border-box-border">
              {row.label}
            </div>
            <div className="px-4 py-3 text-sm text-gray-800">{row.value}</div>
          </div>
        ))}

        {/* File / Link row */}
        <div className="grid grid-cols-[180px_1fr]">
          <div className="px-4 py-3 text-sm flex flex-col gap-2 text-font border-r border-box-border">
            {type === "file" ? "File submission" : "Link submission"}
          </div>
          <div className="px-4 py-3 flex flex-col gap-2">
            {type === "file" ? (
              files?.length > 0 ? (
                files?.map((f) => (
                  <a
                    key={f.id}
                    href={resolveImageUrl(f.file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <FileText className="w-4 h-4 stroke-[2.5]" />
                    <span>{f.original_name}</span>
                  </a>
                ))
              ) : (
                <span className="text-sm text-gray-500">No file submitted</span>
              )
            ) : (
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline break-all">
                <Link className="w-3.5 h-3.5 shrink-0" />
                {link}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}