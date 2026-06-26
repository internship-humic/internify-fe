import { Trash2, UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Project } from '../../../../types/project.types';

const getDynamicIcon = (iconName: string) => {
  const formatted = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[formatted];
  return Icon ?? LucideIcons.FolderOpen;
};

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function MentorProjectCard(project: Project) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/mentor/projects/${toSlug(project.slug)}`)
  };
  const Icon = getDynamicIcon(project.project_icon);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }
  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-[180px] min-h-[270px]hover:bg-gray-50 transition-colors">
      {/* Thumbnail */}
      <div style={{ backgroundColor: project.background_color ?? '#dc2626' }} className="h-[150px] overflow-hidden shrink-0 flex items-center justify-center">
        <Icon className="w-12 h-12 text-white opacity-80" />
      </div>

      {/* Content*/}
      <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
            {project.project_name}
          </p>
        </div>

        {/* Interns Count */}
        <div className="flex items-center gap-2 mt-auto">
          <UsersRound className='text-gray-400 w-4 h-4' />
          <span className="text-xs text-gray-500 truncate">
            {project.total_members}/{project.total_members}
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