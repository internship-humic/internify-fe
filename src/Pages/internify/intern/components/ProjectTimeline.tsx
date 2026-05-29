import type { Task } from "../../../../lib/mockData";

const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export default function ProjectTimeline({ tasks }: { tasks: Task[] }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div>
            <div className="flex items-center gap-1.5 mb-4">
                <span className="font-semibold text-sm text-[#1a1a1a]">
                    Timeline
                </span>
            </div>

            <ul className="relative pl-4">
                {tasks.map((task, idx) => {
                    const d = new Date(task.deadline.date);
                    d.setHours(0, 0, 0, 0);
                    const isToday = d.getTime() === today.getTime();
                    const isPast = d < today;
                    const active = isToday || isPast;

                    return (
                        <li key={idx} className="relative mb-6 list-none">
                            {/* Dot */}
                            <div
                                className={`absolute -left-4 top-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${active ? 'bg-[#C0392B]' : 'bg-[#ccc]'
                                    } ${isToday ? 'shadow-md' : ''}`}
                            />
                            <div
                                className={`text-[11px] font-semibold ${isToday ? 'text-[#C0392B]' : 'text-[#888]'
                                    }`}
                            >
                                {isToday ? 'Hari ini' : formatDate(task.deadline.date)}
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