import { useMyTasks } from "../../../../hooks/useProjects";
import type { InternTaskItem } from "../../../../types/project.types";
import { RiFileList2Fill } from "react-icons/ri";

const TaskTimeline = () => {
  const { tasks, loading, error } = useMyTasks();
  const today = new Date();

  const isOverdue = (dateStr: string) => new Date(dateStr) < today;

  const formatDate = (dateInput: Date | string) =>
    new Date(dateInput).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return (
    <div className="flex flex-col gap-5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
      ))}
    </div>
  );

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div className=''>
      <h2 className="font-semibold text-font-shade mb-5">Timeline Tugas</h2>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2 gap-3">
          <RiFileList2Fill className="w-12 h-12 text-gray-400" />
          <p className="text-sm text-gray-400">Tidak ada tugas saat ini</p>
        </div>
      ) : (
        <div className="relative overflow-y-auto max-h-[190px]">
          <ul className="flex flex-col gap-5">
            {tasks.map((item: InternTaskItem, index) => {
              const overdue = isOverdue(item.deadline_at);
              const deadlineDate = new Date(item.deadline_at);
              const isLast = index === tasks.length - 1;

              return (
                <li key={item.id} className="relative flex gap-4 pl-0">
                  {!isLast && (
                    <div className="absolute left-[3px] top-3 w-px h-full bg-[#ddd]" />
                  )}

                  <div className="relative flex-shrink-0 mt-1">
                    <span
                      className={`block w-3 h-3 rounded-full z-10 relative border-2 right-0.5 border-white ${overdue ? "bg-primary" : "bg-gray-500"
                        }`}
                    />
                  </div>

                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-[10px] font-semibold text-font-shade uppercase tracking-widest">
                      {formatDate(deadlineDate)} AT{" "}
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
      )}
    </div>
  );
};

export default TaskTimeline;