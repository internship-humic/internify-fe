import { useNavigate } from "react-router-dom";
import type { InternTaskItem } from "../../../../types/project.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

type DisplayStatus = InternTaskItem["submission_status"] | "overdue";

const statusStyles: Record<DisplayStatus, string> = {
  not_submitted: "bg-gray-50 text-gray-700 border-gray-200",
  submitted: "bg-green-50 text-green-700 border-green-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels: Record<DisplayStatus, string> = {
  not_submitted: "Pending",
  submitted: "Submitted",
  overdue: "Overdue",
};

export default function TaskCard({ task }: { task: InternTaskItem }) {
  const navigate = useNavigate();
  const displayStatus: DisplayStatus =
    task.submission_status === "not_submitted" &&
      new Date(task.deadline_at).getTime() < Date.now()
      ? "overdue"
      : task.submission_status;
  return (
    <div
      className="border border-card-outline rounded-xl px-6 py-4 mb-3 bg-white flex items-start justify-between gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => navigate(`/intern/projects/${task.project_slug}/${task.slug}?type=${task.submission_type}`)}
    >
      <div className="flex-1 min-w-0">
        <div className="md:hidden mb-[8px]">
          <span
            className={`font-semibold text-xs px-2.5 py-1 rounded-md whitespace-nowrap border ${statusStyles[displayStatus]}`}>
            {statusLabels[displayStatus]}
          </span>
        </div>
        <div className="text-[11px] text-font mb-1">
          Deadline : {formatDate(task.deadline_at)} at {formatTime(task.deadline_at)}
        </div>
        <div className="font-bold text-[15px] text-[#1a1a1a] mb-1">
          {task.title}
        </div>
        <div className="text-[13px] text-font">
          {task.description}
        </div>
        <div className="text-[13px] text-font mt-0.5">
          Tipe Submission : {task.submission_type === 'file_upload' ? "File" : "Link"}
        </div>
      </div>


      <div className="shrink-0 hidden md:flex items-center border border-card-outline">
        <span
          className={`font-semibold text-xs px-3.5 py-[5px] rounded-md whitespace-nowrap border ${statusStyles[displayStatus]}`}>
          {statusLabels[task.submission_status]}
        </span>
      </div>
    </div>
  );
}
