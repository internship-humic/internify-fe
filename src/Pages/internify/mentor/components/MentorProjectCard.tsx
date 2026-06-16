import { Trash2, UsersRound } from 'lucide-react'
import type { Intern } from '../../../../lib/mockProjects'
import { useNavigate } from 'react-router-dom'

interface ProjectCardProps {
  id: number | string
  name: string
  interns: Intern[]
  thumbnailUrl?: string
}

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function MentorProjectCard({
  id,
  name,
  interns,
  thumbnailUrl
}: ProjectCardProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/mentor/projects/${toSlug(name)}`)
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('Delete project dengan id:', id)
  }
  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-[180px] min-h-[270px]hover:bg-gray-50 transition-colors">
      {/* Thumbnail */}
      <div className="h-[150px] bg-gradient-to-tr from-red-700 to-red-800 overflow-hidden shrink-0">
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Content*/}
      <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
            {name}
          </p>
        </div>

        {/* Interns Count */}
        <div className="flex items-center gap-2 mt-auto">
          <UsersRound className='text-gray-400 w-4 h-4' />
          <span className="text-xs text-gray-500 truncate">
            {interns.length}/{interns.length}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 text-gray-400 flex justify-end p-2 bg-gray-50/50">
        <button onClick={handleDeleteClick} className="hover:text-red-600 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}