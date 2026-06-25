import { useNavigate, useParams } from "react-router-dom";
import type { ProjectTask } from "../../../../types/task.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export default function TaskCard({ task }: { task: ProjectTask }) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  return (
    <div
      className="border border-card-outline rounded-xl px-6 py-4 mb-3 bg-white flex items-start justify-between gap-3"
      onClick={() => navigate(`/intern/projects/${slug}/${task.slug}?type=${task.submission_type}`)}
    >
      <div className="flex-1 min-w-0">
        <div className=" text-[11px] text-font mb-1">
          Deadline : {formatDate(task.deadline_at)} at {formatTime(task.deadline_at)}
        </div>
        <div className=" font-bold text-[15px] text-[#1a1a1a] mb-1">
          {task.title}
        </div>
        <div className=" text-[13px] text-font">
          {task.description}
        </div>
        <div className=" text-[13px] text-font">
          Tipe Submission : {task.submission_type === 'file_upload' ? "File" : "Link"}
        </div>
      </div>

      <div className="block md:hidden h-[10px] bg-gray-600"/>

      <div className="shrink-0 hidden md:block">
        <button
          className="bg-white text-font-shade border-[1.5px] border-card-outline font-semibold text-xs px-3.5 py-[5px] rounded-md cursor-pointer whitespace-nowrap transition-colors duration-150"
        >
          Add Submission
        </button>
      </div>
    </div>
  );
}
