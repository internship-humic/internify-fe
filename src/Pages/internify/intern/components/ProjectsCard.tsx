import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Project } from '../../../../types/project.types';

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const getDynamicIcon = (iconName: string) => {
  const formatted = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[formatted];
  return Icon ?? LucideIcons.FolderOpen;
};

const ProjectCard = (project: Project) => {
  const navigate = useNavigate();
  const Icon = getDynamicIcon(project.project_icon);


  const tasksDone = -1; 
  const tasksTotal = project.total_tasks;

  return (
    <div
      onClick={() => navigate(`/intern/projects/${project.id}`)}
      className=" rounded-xl overflow-hidden shadow-sm border border-gray-100 w-full flex flex-col cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      {/* Thumbnail */}
      <div className="h-[150px] bg-gradient-to-tr from-red-700 to-red-800 overflow-hidden flex items-center justify-center">
        <Icon className="w-12 h-12 text-white opacity-80" />
      </div>

      {/* Content */}
      <div className="min-h-[180px] max-h-[200px] flex-1 flex flex-col justify-between py-3">
        <div className="px-3 flex flex-col gap-2">
          {/* Project Name */}
          <p className="text-xs lg:text-sm font-semibold text-gray-800 leading-tight">
            {project.project_name}
          </p>

          {/* Mentor */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {project.admin.profile_picture ? (
                <img
                  src={project.admin.profile_picture}
                  alt={project.admin.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            <span className="text-xs text-gray-500 truncate">{project.admin.email}</span>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-300"
                style={{ width: tasksTotal > 0 ? `${(tasksDone / tasksTotal) * 100}%` : '0%' }}
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
            onClick={(e) => {
              e.stopPropagation(); // ← cegah trigger onClick card dua kali
              navigate(`/intern/projects/${toSlug(project.project_name)}`);
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl transition-colors"
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;