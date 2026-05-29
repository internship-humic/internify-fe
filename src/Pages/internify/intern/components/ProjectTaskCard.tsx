import type { Task } from "../../../../lib/mockData";

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border border-[#eee] rounded-[10px] px-5 py-4 mb-3 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className=" text-[11px] text-[#888] mb-1">
          Deadline : {formatDate(task.deadline.date)} at {task.deadline.time}
        </div>
        <div className=" font-bold text-[15px] text-[#1a1a1a] mb-1">
          {task.title}
        </div>
        <div className=" text-[13px] text-[#666]">
          {task.description}
        </div>
      </div>

      <div className="shrink-0">
        {task.isSubmitted ? (
          <span className=" inline-block bg-[#27AE60] text-white font-bold text-xs px-3.5 py-[5px] rounded-md tracking-[0.5px]">
            DONE
          </span>
        ) : (
          <button className=" bg-white text-[#1a1a1a] border-[1.5px] border-[#d0d0d0] font-semibold text-xs px-3.5 py-[5px] rounded-md cursor-pointer whitespace-nowrap transition-colors duration-150 hover:border-[#C0392B] hover:text-[#C0392B]">
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
}