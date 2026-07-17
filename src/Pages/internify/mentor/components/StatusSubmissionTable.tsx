// components/SubmissionStatusPanel.tsx

import { FileText, CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import type { TaskSubmissionData, DisplayStatus } from "../../../../types/task.types";
import { resolveFileUrl } from "../../../utils/resolveFileFromUrl";

// StatusBadge

export function StatusBadge({ status }: { status: DisplayStatus }) {
  if (status === "submitted" || status === "done")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {status === "done" ? "Done" : "Submitted"}
      </span>
    );

  if (status === "overdue")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
        <AlertCircle className="w-3.5 h-3.5" />
        Overdue
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
      <MinusCircle className="w-3.5 h-3.5" />
      Not submitted
    </span>
  );
}

interface StatusTableProps {
  status: DisplayStatus;
  submission: TaskSubmissionData | null;
}

export function StatusTable({ status, submission }: StatusTableProps) {
  const hasSubmission = status === "submitted" || status === "done";

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Submission status",
      value: <StatusBadge status={status} />,
    },
    {
      label: "Submitted at",
      value: submission?.submitted_at
        ? <span className="text-sm text-gray-700">
          {new Date(submission.submitted_at).toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        : <span className="text-sm text-gray-400">-</span>,
    },
    {
      label: "File submission",
      value: hasSubmission && submission?.files && submission.files.length > 0
        ? (
          <div className="flex flex-col gap-1.5">
            {submission.files.map((f) => (
              <a
                key={f.id}
                href={resolveFileUrl(f.file_path) ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>{f.original_name}</span>
              </a>
            ))}
          </div>
        )
        : hasSubmission && submission?.url_link
          ? (
            <a
              href={submission.url_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline break-all"
            >
              {submission.url_link}
            </a>
          )
          : <span className="text-sm text-gray-400">-</span>,
    },
  ];

  return (
    <div className="bg-box-secondary border border-box-border rounded-2xl overflow-hidden">
      <div className="divide-y divide-box-border">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[180px_1fr]">
            <div className="px-4 py-3 text-sm text-gray-500 border-r border-box-border bg-gray-50/50">
              {row.label}
            </div>
            <div className="px-4 py-3">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}