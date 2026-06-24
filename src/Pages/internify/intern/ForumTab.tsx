import { useParams } from 'react-router-dom';
import ProjectTimeline from './components/ProjectTimeline';
import TaskCard from './components/ProjectTaskCard';
import HeroProject from './components/Hero-project';
import { useProjectTasks } from '../../../hooks/useProjectDetail';
import type { Project } from '../../../types/project.types';

export default function ForumTab({ project }: { project: Project }) {
  const { id } = useParams<{id:string}>();
  const { tasks, loading, error } = useProjectTasks(id ?? "");
  return (
    <div>
      {/* Hero banner */}
      <HeroProject title={project.project_name} description={project.description} />

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-3 mt-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-5">{error}</p>}

      {/* Timeline + Task list */}
      <div className="flex gap-7 items-start">
        <div className="w-1/5 bg-white rounded-xl p-5 shadow-md shrink-0">
          {/* <ProjectTimeline tasks=tasks /> */}
        </div>

        <div className="w-4/5">
          {tasks.length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada task.</p>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} projectName={project.project_name} />
              ))
            )}
        </div>
      </div>
    </div>
  );
}