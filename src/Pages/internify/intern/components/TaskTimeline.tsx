import { DEADLINES } from "../../../../lib/mockDeadline";
import type { Deadline } from "../../../../lib/mockDeadline"; 

const TaskTimeline = () => {
  const today = new Date();

  const isOverdue = (date: Date) => {
    return date < today;
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-5">Task Timeline</h2>
      <div className="relative">
        <div className="absolute left-1 top-2 bottom-2 w-px bg-gray-200" />
        <ul className="flex flex-col gap-5">
          {DEADLINES.map((item: Deadline, index: number) => {
            const overdue = isOverdue(item.date);
            return (
              <li key={index} className="flex gap-4 pl-0">
                <div className="relative flex-shrink-0 mt-1">
                  <span
                    className={`block w-2 h-2 rounded-full z-10 relative ${
                      overdue ? "bg-red-700" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {item.date.toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TaskTimeline;