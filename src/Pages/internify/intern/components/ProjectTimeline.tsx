import type { InternTaskItem } from "../../../../types/project.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

export default function ProjectTimeline({ tasks }: { tasks: InternTaskItem[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1 md:mb-4 justify-between">
        <span className="font-semibold text-md text-font-shade">Timeline</span>
      </div>
      <ul className="relative pl-4">
        {tasks.map((task, index) => {
          const d = new Date(task.deadline_at);
          d.setHours(0, 0, 0, 0);
          const isToday = d.getTime() === today.getTime();
          const isPast = d < today;
          const active = isToday || isPast;
          return (
            <li key={task.id} className="relative mb-2 list-none">
              {index < tasks.length - 1 && (
                <div className="absolute -left-[1.0625rem] top-3 w-px h-full bg-font-shade/30" />
              )}
              {/* Dot */}
              <div
                className={`absolute -left-[1.45rem] top-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  active ? 'bg-red' : 'bg-gray-400'
                } ${isToday ? 'shadow-md' : ''}`}
              />
              <div className={`text-[11px] font-semibold ${isToday ? 'text-red' : 'text-font'}`}>
                {isToday ? 'Hari ini' : formatDate(task.deadline_at)}
              </div>
              <div className="text-xs text-font mt-px leading-[1.3]">
                {task.title}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}