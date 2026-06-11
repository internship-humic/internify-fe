import type { TaskTimelineProps } from "../../../../lib/mockDeadline"
import { defaultTasks } from "../../../../lib/mockDeadline"

const TaskTimeline = ({ tasks = defaultTasks }: TaskTimelineProps) => {
const today = new Date()

  const isOverdue = (tanggal: string) => {
    const deadline = new Date(tanggal)
    return deadline < today
  }
  
  const upcomingIndex = tasks.findIndex(
    task => new Date(task.tanggal) >= today
  )
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-5">Task Timeline</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-200" />

        <ul className="flex flex-col gap-5">
          {tasks.map((task, index) => {
            const overdue = isOverdue(task.tanggal)
            const isRedDot = overdue || index === upcomingIndex

            return (
              <li key={index} className="flex gap-4 pl-0">
                {/* Dot */}
                <div className="relative flex-shrink-0 mt-1">
                  <span
                    className={`block w-3 h-3 rounded-full border-2 z-10 relative
                      ${isRedDot
                        ? 'bg-red-800 '
                        : 'bg-gray-400'
                      }`}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {task.tanggal}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TaskTimeline