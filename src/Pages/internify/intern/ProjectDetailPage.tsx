import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectDetail } from '../../../hooks/useProjectDetail';
import ForumTab from './ForumTab';
import ParticipantsTab from './ParticipantTab';

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>(); 
  const { project, loading, error } = useProjectDetail(id ?? "");
  const [activeTab, setActiveTab] = useState<'forum' | 'participants'>('forum');

  // Fallback sederhana
  if (loading) return <p className="p-10 text-gray-400">Memuat project...</p>;
  if (error)   return <p className="p-10 text-red-500">{error}</p>;
  if (!project) return <p className="p-10 text-gray-400">Project tidak ditemukan.</p>;

  const tabClass = (tab: string) =>
    `pr-0 py-2.5 mr-7 text-sm bg-transparent border-0 cursor-pointer transition-colors duration-150 border-b-2 ${activeTab === tab
      ? 'font-bold text-[#C0392B] border-[#C0392B]'
      : 'font-medium text-[#666] border-transparent'
    }`;

  return (
    <div>
      <div>
        {/* Tabs */}
        <div className="flex mb-4">
          <button className={tabClass('forum')} onClick={() => setActiveTab('forum')}>
            Forum
          </button>
          <button className={tabClass('participants')} onClick={() => setActiveTab('participants')}>
            Participants
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'forum'
          ? <ForumTab project={project} />
          : <ParticipantsTab project={project} />
        }
      </div>
    </div>
  );
}