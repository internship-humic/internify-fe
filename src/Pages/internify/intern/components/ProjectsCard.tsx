import { useNavigate } from 'react-router-dom'

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-full flex flex-col">
      {/* Thumbnail */}
      <div className="h-[150px] bg-gradient-to-tr from-red-700 to-red-800 overflow-hidden">
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Content */}
      <div className="min-h-[180px] max-h-[210px] flex-1 flex flex-col justify-between py-3">
        <div className="px-3 flex flex-col gap-2">
          <p className="text-xs lg:text-sm font-semibold text-gray-800 leading-tight">{name}</p>

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
        </div>
        {/* Button */}
        <div className="flex items-end justify-end px-3 pb-1">
          <button
            onClick={() => navigate(`/intern/projects/${toSlug(name)}`)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl transition-colors"
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard