import type { ProjectTask } from "../../../../types/project.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

export default function ProjectTimeline({ tasks }: { tasks: ProjectTask[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="">
      <div className="flex items-center gap-1.5 mb-4 justify-between">
        <span className="font-semibold text-md text-font-shade">Timeline</span>
      </div>
      <ul className="relative pl-4">
        {tasks.map((task) => {
          const d = new Date(task.deadline_at);
          d.setHours(0, 0, 0, 0);
          const isToday = d.getTime() === today.getTime();
          const isPast = d < today;
          const active = isToday || isPast;

          return (
            <li key={task.id} className="relative mb-6 list-none">
              {/* Dot */}
              <div
                className={`absolute -left-5 top-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  active ? 'bg-[#C0392B]' : 'bg-[#ccc]'
                } ${isToday ? 'shadow-md' : ''}`}
              />
              <div className={`text-[11px] font-semibold ${isToday ? 'text-[#C0392B]' : 'text-[#888]'}`}>
                {isToday ? 'Hari ini' : formatDate(task.deadline_at)} {/* ← format ISO string */}
              </div>
              <div className="text-xs text-[#555] mt-px leading-[1.3]">
                {task.title}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}