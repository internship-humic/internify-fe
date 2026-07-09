import { useState } from 'react';
import { ClipboardCheck, Trash2, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../../../types/project.types';
import { useArchiveProject, useCompleteProject } from '../../../../hooks/useProjects';
import { customToast } from '../../../utils/showToast';
import ArchiveProjectDialog from './ArchiveProjectDialog';
import CompleteProjectDialog from './CompleteProjectDialog';
import { getProjectIcon } from '../../../../lib/ProjectIcons';

interface MentorProjectCardProps extends Project {
  onArchived?: () => void;
  onCompleted?: () => void;
}

export default function MentorProjectCard({ onArchived, onCompleted, ...project }: MentorProjectCardProps) {
  const navigate = useNavigate();
  const { archive, loading: archiveLoading } = useArchiveProject();
  const { complete, loading: completeLoading } = useCompleteProject();

  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);

  const handleCardClick = () => {
    navigate(`/mentor/projects/${project.slug}`);
  };

 const Icon = getProjectIcon(project.project_icon); 

  /* ── Archive ─────────────────────────────────────────────── */
  const handleArchiveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowArchiveDialog(true);
  };

  const handleArchiveConfirm = async () => {
    const result = await archive(project.id);
    setShowArchiveDialog(false);

    if (result) {
      customToast.success("Berhasil!", "Projek berubah status menjadi Archived (Diarsipkan");
      onArchived?.();
    } else {
      customToast.error("Gagal!", "Projek gagal diarsipkan (archived)");
    }
  };

  /* ── Complete ────────────────────────────────────────────── */
  const handleCompleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowCompleteDialog(true);
  };

  const handleCompleteConfirm = async () => {
    const result = await complete(project.id);
    setShowCompleteDialog(false);

    if (result) {
      customToast.success("Berhasil!", "Projek  berubah status menjadi completed (selesai)");
      onCompleted?.();
    } else {
      customToast.error("Gagal!", "Projek gagal diselesaikan (completed)");
    }
  };

  return (
    <>
      {/* Archive Confirmation Dialog */}
      <ArchiveProjectDialog
        isOpen={showArchiveDialog}
        projectName={project.project_name}
        loading={archiveLoading}
        onConfirm={handleArchiveConfirm}
        onClose={() => setShowArchiveDialog(false)}
      />

      {/* Complete Confirmation Dialog */}
      <CompleteProjectDialog
        isOpen={showCompleteDialog}
        projectName={project.project_name}
        loading={completeLoading}
        onConfirm={handleCompleteConfirm}
        onClose={() => setShowCompleteDialog(false)}
      />

      {/* Card */}
      <div
        onClick={handleCardClick}
        className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 w-[180px] min-h-[270px] hover:bg-gray-50 transition-colors cursor-pointer"
      >
        {/* Thumbnail */}
        <div
          style={{ backgroundColor: project.background_color ?? '#dc2626' }}
          className="h-[150px] overflow-hidden shrink-0 flex items-center justify-center"
        >
          <Icon className="w-12 h-12 text-white opacity-80" />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
              {project.project_name}
            </p>
          </div>

          {/* Interns Count */}
          <div className="flex items-center gap-2 mt-auto">
            <UsersRound className="text-gray-400 w-4 h-4" />
            <span className="text-xs text-gray-500 truncate">
              {project.total_members}/{project.total_members}
            </span>
          </div>

          {/* Status Badge */}
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

        {/* Footer Actions */}
        <div className="border-t border-gray-300 text-gray-400 flex justify-end gap-1 p-2 bg-gray-50/50">
          {/* Complete Button */}
          <button
            onClick={handleCompleteButtonClick}
            disabled={completeLoading}
            className="p-1 rounded hover:text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
            aria-label={`Selesaikan ${project.project_name}`}
            title="Selesaikan project"
          >
            <ClipboardCheck className="w-4 h-4" />
          </button>

          {/* Archive Button */}
          <button
            onClick={handleArchiveButtonClick}
            disabled={archiveLoading}
            className="p-1 rounded hover:text-yellow-600 hover:bg-yellow-50 transition-colors disabled:opacity-50"
            aria-label={`Arsipkan ${project.project_name}`}
            title="Arsipkan project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}