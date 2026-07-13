import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../../../hooks/useProjects';
import { getProjectIcon } from '../../../../lib/ProjectIcons';
import { RiFileList2Fill } from "react-icons/ri";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const HomeProjectList = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  if (loading) return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded-lg" />
      ))}
    </div>
  );

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-font-shade mb-5">Projects</h2>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg py-2 gap-3">
          <RiFileList2Fill className="w-12 h-12 text-gray-400" />
          <p className="text-sm text-gray-400">Kamu belum tergabung ke projek apapun</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[190px]">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/intern/projects/${toSlug(project.slug)}`)}
              className="flex items-center gap-4 border border-card-outline rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: project.background_color ?? '#dc2626' }}
              >
                {(() => {
                  const Icon = getProjectIcon(project.project_icon);
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <div>
                <p className="text-sm font-semibold text-font-shade">{project.project_name}</p>
                <p className="text-xs text-gray-400">{project.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeProjectList;