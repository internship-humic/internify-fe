import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockProjects } from '../../../lib/mockData';
import ForumTab from './ForumTab';
import ParticipantsTab from './ParticipantTab';
import { ChevronLeft } from 'lucide-react';

// ─── ProjectDetailPage ─────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'forum' | 'participants'>('forum');

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/intern/projects');
    }
  };

  const project = mockProjects.find((p) => p.id === Number(id));

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
    <div className="container">
      <div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 text-sm font-medium text-[#666] hover:text-[#C0392B] transition-colors duration-150 group"
        >
          <span className='flex flex-row gap-2'>
            <ChevronLeft width={20} height={20} className="transition-transform duration-150 group-hover:-translate-x-1" />
            Kembali ke Daftar Project
          </span>
        </button>

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