import ProjectTimeline from '../intern/components/ProjectTimeline';
import HeroProject from '../intern/components/Hero-project';
import MentorTaskCard from './components/MentorTaskCard';
import { useProjectTasks } from '../../../hooks/useTasks';
import type { Project } from '../../../types/project.types';
import { FileText } from 'lucide-react';

export default function MentorForumTab({ project }: { project: Project }) {
  const { tasks, loading, error } = useProjectTasks(project.id);

  // Skeleton meniru layout final: kolom timeline 1/5 + list task card 4/5
  const renderSkeleton = () => (
    <div className="flex flex-col gap-7 md:flex-row md:items-start mt-5 animate-pulse">
      <div className="w-full md:w-1/5 bg-white rounded-xl p-5 border border-box-border shrink-0">
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-3 shrink-0 rounded-full bg-gray-200" />
              <div className="h-3 flex-1 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-box-border md:border-t-0 pt-4 md:pt-0 md:w-4/5 flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );

  // Empty hanya valid setelah loading selesai & tidak error
  const isEmpty = !loading && !error && tasks.length === 0;

  return (
    <div>
      <HeroProject title={project.project_name} description={project.description} />

      {/* Kondisi eksklusif: hanya satu state tampil dalam satu waktu */}
      {loading ? (
        renderSkeleton()
      ) : error ? (
        <p className="text-red-500 text-sm mt-5">{error}</p>
      ) : isEmpty ? (
        <div className="flex flex-col justify-center items-center mt-12">
          <FileText className="text-font mb-6" size={48} />
          <p className="text-md text-font">Belum ada tugas yang dapat dikerjakan.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}