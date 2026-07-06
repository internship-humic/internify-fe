import { Trash2, UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Project } from '../../../../types/project.types';
import { useArchiveProject } from '../../../../hooks/useProjects';
import { customToast } from '../../../utils/showToast';

const getDynamicIcon = (iconName: string) => {
  const formatted = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[formatted];
  return Icon ?? LucideIcons.FolderOpen;
};

interface MentorProjectCardProps extends Project {
  onArchived?: () => void;
}

export default function MentorProjectCard({ onArchived, ...project} : MentorProjectCardProps) {
  const navigate = useNavigate();
  const { archive, loading } = useArchiveProject();

  const handleCardClick = () => {
    navigate(`/mentor/projects/${project.slug}`)
  };
  const Icon = getDynamicIcon(project.project_icon);

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const confirmed = window.confirm(`Arsipkan project "${project.project_name}"?`);
    if (!confirmed) return;

    const result = await archive(project.id);

    if (result) {
      customToast.success(
        "Berhasil!",
        "Projek Berhasil Diarsipkan (archived)"
      )
      onArchived?.();
    } else {
      customToast.error(
        "Gagal!",
        "Projek gagal diarsipkan (archived)"
      )
    }
  };

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
        <div className="flex items-center text-xs text-gray-500 gap-1">
          {project.status === "active" ? (
            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Active</span>
          ) : project.status === "completed" ? (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Completed</span>
          ) : project.status === "archived" ? (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">Archived</span>
          ) : (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">Inactive</span>
          )}
        </div>
      </div>


      {/* Footer */}
      <div className="border-t border-gray-300 text-gray-400 flex justify-end p-2 bg-gray-50/50">
        <button
          onClick={handleDeleteClick}
          disabled={loading}
          className="hover:text-red-600 transition-colors disabled:opacity-50"
          aria-label={`Archive ${project.project_name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}