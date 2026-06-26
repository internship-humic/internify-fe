import type { Task } from "../../../../lib/mockProjects";
import { useNavigate, useParams } from "react-router-dom";
import type { ProjectTask } from "../../../../types/task.types";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function MentorTaskCard({ task }: {task: ProjectTask}) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const handleCardClick = () => {
    navigate(`/intern/projects/${slug}/${task.slug}?type=${task.submission_type}`)
  };

  return (
    <div
      className="border border-[#eee] rounded-[10px] px-5 py-4 mb-3 bg-white shadow-lg flex items-start justify-between gap-3 cursor-pointer hover:border-gray-300 transition-colors"
      onClick={handleCardClick}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-[#888] mb-1">
          Deadline : {task.deadline_at ? `${formatDate(task.deadline_at)} at ${formatTime(task.deadline_at)}` : '-'}
        </div>
        <div className="font-bold text-[15px] text-[#1a1a1a] mb-1">
          {task.title}
        </div>
        <div className="text-[13px] text-[#666]">
          {task.description}
        </div>
      </div>
    </div>
  );
}