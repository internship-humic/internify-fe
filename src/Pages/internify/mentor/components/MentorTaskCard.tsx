import type { Task } from "../../../../lib/mockProjects";
import { useNavigate } from "react-router-dom";

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

interface MentorTaskCardProps {
  task: Task;
  projectName: string;
}

export default function MentorTaskCard({ task, projectName }: MentorTaskCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Pastikan jika projectName belum ter-render, proses navigasi tidak bikin crash
    if (!projectName || !task?.title) return;

    const projectSlug = toSlug(projectName);
    const taskSlug = toSlug(task.title);
    
    // Rute mutlak menuju target kamu: /mentor/projects/:slug/:taskSlug
    navigate(`/mentor/projects/${projectSlug}/${taskSlug}`);
  };

  return (
    <div
      className="border border-[#eee] rounded-[10px] px-5 py-4 mb-3 bg-white shadow-lg flex items-start justify-between gap-3 cursor-pointer hover:border-gray-300 transition-colors"
      onClick={handleCardClick}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-[#888] mb-1">
          Deadline : {task.deadline ? `${formatDate(task.deadline.date)} at ${task.deadline.time}` : '-'}
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