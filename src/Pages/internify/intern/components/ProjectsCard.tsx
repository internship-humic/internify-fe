import { useNavigate } from 'react-router-dom';
import { getProjectIcon } from '../../../../lib/ProjectIcons';
import type { Project } from '../../../../types/project.types';
import { resolveFileUrl } from '../../../utils/resolveFileFromUrl';

const ProjectCard = (project: Project) => {
  const navigate = useNavigate();
  const Icon = getProjectIcon(project.project_icon);
  const Avatar = resolveFileUrl(project.admin.profile_picture);
  const tasksDone = project.task_done;
  const tasksTotal = project.total_tasks;

  return (
    <div
      onClick={() => navigate(`/intern/projects/${project.slug}`)}
      className="w-[220px] min-h-[320px] flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      {/* Thumbnail */}
      <div
        style={{ backgroundColor: project.background_color ?? '#dc2626' }}
        className="h-[150px] flex items-center justify-center flex-shrink-0"
      >
        <Icon className="w-12 h-12 text-white opacity-80" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between py-3">
        <div className="px-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {project.project_name}
          </p>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {Avatar ? (
                <img
                  src={Avatar}
                  alt={project.admin.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            <span className="text-xs text-gray-500 truncate">{project.admin.email}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-300"
                style={{ width: tasksTotal > 0 ? `${(tasksDone / tasksTotal) * 100}%` : '0%' }}
              />
            </div>
            <span className="text-font text-[12px] font-bold text-right">
              {tasksDone}/{tasksTotal}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-end px-3">
          <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl transition-colors">
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;