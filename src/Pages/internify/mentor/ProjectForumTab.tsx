import type { Project } from '../../../lib/mockProjects';
import ProjectTimeline from '../intern/components/ProjectTimeline';
import HeroProject from '../intern/components/Hero-project';
import MentorTaskCard from './components/MentorTaskCard';

export default function MentorForumTab({ project }: { project: Project }) {
  return (
    <div>
      {/* Hero banner */}
      <HeroProject title={project.name} description={project.description} />

      {/* Timeline + Task list */}
      <div className="flex gap-7 items-start">
        <div className="w-1/5 bg-white rounded-xl p-5 shadow-md shrink-0">
          <ProjectTimeline tasks={project.tasks} />
        </div>

        <div className="w-4/5">
          {project.tasks.map((task, idx) => (
            <MentorTaskCard 
            key={idx}
            task={task}
            projectName={project.name} />
          ))}
        </div>
      </div>
    </div>
  );
}