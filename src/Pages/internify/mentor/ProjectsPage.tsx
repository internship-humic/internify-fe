import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectDetail } from '../../../hooks/useProjects';
import MentorForumTab from './ProjectForumTab';
import InternsTab from './ProjectsInternTab';
import TaskTab from './ProjectTaskTab';

function ProjectDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Tab bar skeleton — tinggi & spacing disamakan dengan tombol tab asli */}
      <div className="flex mb-4 border-b border-card-outline">
        <div className="pr-0 py-2.5 mr-7">
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
        <div className="pr-0 py-2.5 mr-7">
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
        <div className="pr-0 py-2.5 mr-7">
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      </div>

      {/* Konten tab skeleton (default tab = forum) */}
      <div className="flex flex-col gap-4">
        {/* Composer / input bar */}
        <div className="rounded-lg border border-card-outline p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
            <div className="h-10 flex-1 rounded-md bg-gray-200" />
            <div className="h-9 w-24 shrink-0 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* List card (forum post / participant row) */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-card-outline p-4">
            {/* Header: avatar + nama + timestamp */}
            <div className="mb-3 flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
              <div className="ml-auto h-3 w-16 rounded bg-gray-200" />
            </div>

            {/* Body teks — baris terakhir sengaja lebih pendek biar natural */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-11/12 rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
            </div>

            {/* Footer action */}
            <div className="mt-4 flex gap-3">
              <div className="h-7 w-20 rounded-md bg-gray-200" />
              <div className="h-7 w-20 rounded-md bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'forum' | 'participants' | 'Task'>('forum');
  const { project, loading, error } = useProjectDetail(slug ?? "");

  if (loading) return <ProjectDetailSkeleton/>

  if (error) return <p className="p-10 text-[18px] text-red-700">{error}</p>;

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
      <div>

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