interface Task {
  tanggal: string
  title: string
  description: string
}

interface TaskTimelineProps {
  tasks?: Task[]
}

const defaultTasks: Task[] = [
  {
    tanggal: 'MAY 14, 2026 AT 23:59 PM',
    title: 'Laporan tugas 1',
    description: 'Berisi design uiux, dan user flow dari aplikasi internify',
  },
  {
    tanggal: 'MAY 15, 2026 AT 23:59 PM',
    title: 'Laporan tugas 1',
    description: 'Berisi design uiux, dan user flow dari aplikasi internify',
  },
  {
    tanggal: 'MAY 16, 2026 AT 23:59 PM',
    title: 'Laporan tugas 1',
    description: 'Berisi design uiux, dan user flow dari aplikasi internify',
  },
]

const TaskTimeline = ({ tasks = defaultTasks }: TaskTimelineProps) => {
  const today = new Date()

  const isOverdue = (tanggal: string) => {
    const deadline = new Date(tanggal)
    return deadline < today
  }

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-5">Task Timeline</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-200" />

        <ul className="flex flex-col gap-5">
          {tasks.map((task, index) => {
            const overdue = isOverdue(task.tanggal)

            return (
              <li key={index} className="flex gap-4 pl-0">
                {/* Dot */}
                <div className="relative flex-shrink-0 mt-1">
                  <span
                    className={`block w-3 h-3 rounded-full border-2 z-10 relative
                      ${overdue
                        ? 'bg-red-500 border-red-500'
                        : 'bg-white border-gray-300'
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