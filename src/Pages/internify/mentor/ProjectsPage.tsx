import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockProjects } from '../../../lib/mockProjects';
import MentorForumTab from './ProjectForumTab';
import InternsTab from './ProjectsInternTab';
import TaskTab from './TaskTab';

// ─── ProjectDetailPage ─────────────────────────────────────────────────────────
const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'forum' | 'participants' | 'Task'>('forum');

  const project = mockProjects.find((p) => toSlug(p.name) === slug);

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
              return <TaskTab project={project} />; // Tambahkan komponen TaskTab di sini
            default:
              return null;
          }
          })()}
      </div>
    </div>
  );
}