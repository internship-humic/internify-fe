import { useNavigate } from 'react-router-dom'

interface ProjectCardProps {
  id: number | string
  name: string
  mentor: string
  avatarUrl?: string
  thumbnailUrl?: string
  progress: number
  tasksDone: number
  tasksTotal: number
}

const ProjectCard = ({
  id,
  name,
  mentor,
  avatarUrl,
  thumbnailUrl,
  progress,
  tasksDone,
  tasksTotal,
}: ProjectCardProps) => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-[260px] flex flex-col">
      {/* Thumbnail */}
      <div className="h-[150px] bg-gradient-to-tr from-red-700 to-red-800 overflow-hidden">
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{name}</p>

        {/* Mentor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={mentor} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300" />
            )}
          </div>
          <span className="text-xs text-gray-500 truncate">{mentor}</span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1">
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 text-right">
            {tasksDone}/{tasksTotal}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/intern/projects/${id}`)}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 rounded-lg transition-colors"
        >
          View Project
        </button>
      </div>
    </div>
  )
}

export default ProjectCard