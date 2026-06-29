import { useNavigate } from "react-router-dom";
import type { InternTaskItem } from "../../../../types/project.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export default function TaskCard({ task }: { task: InternTaskItem }) {
  const navigate = useNavigate();
  return (
    <div
      className="border border-card-outline rounded-xl px-6 py-4 mb-3 bg-white flex items-start justify-between gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => navigate(`/intern/projects/${task.project_slug}/${task.slug}?type=${task.submission_type}`)}
    >
      <div className="flex-1 min-w-0">
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

      <div className="block md:hidden h-[10px] bg-gray-600"/>

      <div className="shrink-0 hidden md:flex items-center">
        <span
          className={`font-semibold text-xs px-3.5 py-[5px] rounded-md whitespace-nowrap bg-gray-50`}
        >
          {task.submission_status}
        </span>
      </div>
    </div>
  );
}
