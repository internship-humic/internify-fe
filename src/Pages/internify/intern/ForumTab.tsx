import { useParams } from 'react-router-dom';
import ProjectTimeline from './components/ProjectTimeline';
import TaskCard from './components/ProjectTaskCard';
import HeroProject from './components/Hero-project';
import { useProjectTasks } from '../../../hooks/useTasks';
import type { Project } from '../../../types/project.types';

export default function ForumTab({ project }: { project: Project }) {
  const { slug } = useParams<{ slug: string }>();
  const { tasks, loading, error } = useProjectTasks(slug ?? "");
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
      <div className="flex flex-col gap-7 md:flex-row md:items-start">
        <div className="w-full md:w-1/5 bg-white rounded-xl p-5 border border-box-border shrink-0">
          <ProjectTimeline tasks={tasks} />
        </div>
        <div className="w-full border-t border-box-border md:border-t-0 pt-4 md:pt-0 md:w-4/5">
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada task.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}