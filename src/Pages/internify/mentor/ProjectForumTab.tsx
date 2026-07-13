import ProjectTimeline from '../intern/components/ProjectTimeline';
import HeroProject from '../intern/components/Hero-project';
import MentorTaskCard from './components/MentorTaskCard';
import { useProjectTasks } from '../../../hooks/useTasks';
import type { Project } from '../../../types/project.types';
import { FileText } from 'lucide-react';

export default function MentorForumTab({ project }: { project: Project }) {
  const { tasks, loading, error } = useProjectTasks(project.id);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <HeroProject title={project.project_name} description={project.description} />
      {loading && (
        <div className="flex flex-col gap-3 mt-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!loading && tasks.length === 0 ? (
        <div className='flex justify-center items-center flex-col mt-5'>
          <FileText className='text-font mb-3' size={48} />
          <p className="text-md text-font-shade">Belum ada tugas yang dapat dikerjakan.</p>
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col gap-7 md:flex-row md:items-start mt-5">
            <div className="w-full md:w-1/5 bg-white rounded-xl p-5 border border-box-border shrink-0">
              <ProjectTimeline tasks={tasks} />
            </div>

            <div className="w-full border-t border-box-border md:border-t-0 pt-4 md:pt-0 md:w-4/5">
              {tasks.map((task) => (
                <MentorTaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
