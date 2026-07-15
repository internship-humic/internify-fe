import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectDetail } from '../../../hooks/useProjects';
import ForumTab from './ForumTab';
import ParticipantsTab from './ParticipantTab';
import { Loader2 } from 'lucide-react';

function ProjectDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Tab bar skeleton — tinggi & spacing disamakan dengan tombol tab asli */}
      <div className="flex mb-6 border-b border-card-outline">
        <div className="pr-0 py-2.5 mr-7">
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
        <div className="pr-0 py-2.5 mr-7">
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      </div>

      {/* Konten tab skeleton (default tab = forum) */}
      <div className="flex flex-col gap-4 mb-5 h-screen">

        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-gray-400">
          <Loader2 className="w-[45px] h-[45px] animate-spin" />
          <span>Memuat Konten..</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, error } = useProjectDetail(slug ?? "");
  const [activeTab, setActiveTab] = useState<'forum' | 'participants'>('forum');

  if (loading) return <ProjectDetailSkeleton />;
  if (error) return <p className="p-10 text-red-500">{error}</p>;

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
        <div className="flex mb-4 border-b border-card-outline">
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