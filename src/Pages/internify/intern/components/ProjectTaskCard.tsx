import { useNavigate, useParams } from "react-router-dom";
import type { ProjectTask } from "../../../../types/project.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export default function TaskCard({ task, projectName }: { task: ProjectTask; projectName: string }) {
  const navigate = useNavigate();
  const {id}= useParams<{ id: string }>();
  return (
    <div className="border border-gray-200 rounded-[10px] px-6 py-4 mb-3 bg-white flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className=" text-[11px] text-[#888] mb-1">
          Deadline : {formatDate(task.deadline_at)} at {formatTime(task.deadline_at)}
        </div>
        <div className=" font-bold text-[15px] text-[#1a1a1a] mb-1">
          {task.title}
        </div>
        <div className=" text-[13px] text-[#666]">
          {task.description}
        </div>
        <div className=" text-[13px] text-[#666]">
          Tipe Submission : {task.submission_type === 'file_upload' ? "File" : "Link"}
        </div>
      </div>

      <div className="shrink-0">
        <button
          className="bg-white text-[#1a1a1a] border-[1.5px] border-[#d0d0d0] font-semibold text-xs px-3.5 py-[5px] rounded-md cursor-pointer whitespace-nowrap transition-colors duration-150 hover:border-[#C0392B] hover:text-[#C0392B]"
          onClick={() => navigate(
            `/intern/projects/${id}/${task.id}?type=${task.submission_type}`
          )}
        >
          Add Submission
        </button>
      </div>
    </div>
  );
}
