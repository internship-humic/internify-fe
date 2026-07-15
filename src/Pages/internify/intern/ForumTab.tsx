import ProjectTimeline from './components/ProjectTimeline';
import TaskCard from './components/ProjectTaskCard';
import HeroProject from './components/Hero-project';
import { useProjectMyTasks } from '../../../hooks/useProjects';
import type { Project } from '../../../types/project.types';
import { FileText } from 'lucide-react';

export default function ForumTab({ project }: { project: Project }) {
  const { tasks, loading, error } = useProjectMyTasks(project.id);

  const renderSkeleton = () => (
    <div className="flex flex-col gap-7 md:flex-row md:items-start mt-5 animate-pulse">
      <div className="w-full md:w-1/5 box p-5">
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 flex-1 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-box-border md:border-t-0 pt-4 md:pt-0 md:w-4/5 flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-box-secondary" />
        ))}
      </div>
    </div>
  );

  const isEmpty = !loading && !error && tasks.length === 0;

  return (
    <div>
      <HeroProject title={project.project_name} description={project.description} />

      {/* Urutan eksklusif: hanya satu state yang tampil dalam satu waktu */}
      {loading ? (
        renderSkeleton()
      ) : error ? (
        <p className="text-red-500 text-sm mt-5">{error}</p>
      ) : isEmpty ? (
        <div className="flex flex-col justify-center items-center mt-5">
          <FileText className="text-font mb-3" size={48} />
          <p className="text-md text-font-shade">Belum ada tugas yang dapat dikerjakan.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-7 md:flex-row md:items-start mt-5">
          <div className="w-full md:w-1/5 box p-5">
            <ProjectTimeline tasks={tasks} />
          </div>
          <div className="w-full border-t border-box-border md:border-t-0 pt-4 md:pt-0 md:w-4/5">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}