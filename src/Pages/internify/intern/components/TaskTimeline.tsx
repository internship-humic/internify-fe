import { useInternTasks } from "../../../../hooks/useProjects";
import type { InternTask } from "../../../../types/project.types";

const TaskTimeline = () => {
  const { tasks, loading, error } = useInternTasks();
  const today = new Date();

  const isOverdue = (dateStr: string) => new Date(dateStr) < today;

  if (loading) return (
    <div className="flex flex-col gap-5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
      ))}
    </div>
  );

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div>
      <h2 className="font-semibold text-font-shade mb-5">Task Timeline</h2>
      <div className="relative">
        <div className="absolute left-1 top-2 bottom-2 w-px bg-gray-300" />
        <ul className="flex flex-col gap-5">
          {tasks.map((item: InternTask) => {
            const overdue = isOverdue(item.deadline_at);
            const deadlineDate = new Date(item.deadline_at);
            return (
              <li key={item.id} className="flex gap-4 pl-0">
                <div className="relative flex-shrink-0 mt-1">
                  <span
                    className={`block w-2 h-2 rounded-full z-10 relative ${
                      overdue ? "bg-primary" : "bg-gray-500"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {deadlineDate.toLocaleDateString("id-ID")} AT{" "}
                    {deadlineDate.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
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