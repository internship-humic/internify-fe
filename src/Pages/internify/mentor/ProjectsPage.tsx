import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectDetail } from '../../../hooks/useProjects';
import MentorForumTab from './ProjectForumTab';
import InternsTab from './ProjectsInternTab';
import TaskTab from './TaskTab';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'forum' | 'participants' | 'Task'>('forum');
  const { project, loading, error } = useProjectDetail(slug ?? "");

  if (loading) return <p className="p-10 text-gray-400">Memuat project...</p>;
  if (error)   return <p className="p-10 text-red-500">{error}</p>;
  if (!project) return <p className="p-10 text-gray-400">Project tidak ditemukan.</p>

  if (!project) {
    return (
      <div className="p-10 text-[#888]">
        Project tidak ditemukan.
      </div>
    );
  }

  const tabClass = (tab: string) =>
    `pr-0 py-2.5 mr-7 text-sm bg-transparent border-0 cursor-pointer transition-colors duration-150 border-b-2 ${activeTab === tab
      ? 'font-bold text-[#C0392B] border-[#C0392B]'
      : 'font-medium text-[#666] border-transparent'
    }`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="">

        {/* Tabs */}
        <div className="flex mb-4 border-b-1 border-gray-300">
          <button className={tabClass('forum')} onClick={() => setActiveTab('forum')}>
            Forum
          </button>
          <button className={tabClass('participants')} onClick={() => setActiveTab('participants')}>
            Participants
          </button>
          <button className={tabClass('Task')} onClick={() => setActiveTab('Task')}>
            Tasks
          </button>
        </div>

        {/* Tab content */}
        {(() => {
          switch (activeTab) {
            case 'forum':
              return <MentorForumTab project={project} />;
            case 'participants':
              return <InternsTab project={project} />;
            case 'Task':
              return <TaskTab project={project} />;
            default:
              return null;
          }
          })()}
      </div>
    </div>
  );
}