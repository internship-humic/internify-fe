import { useParams } from 'react-router-dom';
import ProjectTimeline from '../intern/components/ProjectTimeline';
import HeroProject from '../intern/components/Hero-project';
import MentorTaskCard from './components/MentorTaskCard';
import { useProjectTasks } from '../../../hooks/useTasks';
import type { Project } from '../../../types/project.types';

export default function MentorForumTab({ project }: { project: Project }) {
  const { slug } = useParams<{ slug: string }>();
  const { tasks, loading, error } = useProjectTasks(slug ?? "");
  return (
    <div>
      {/* Hero banner */}
      <HeroProject title={project.project_name} description={project.description} />

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
              <MentorTaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}