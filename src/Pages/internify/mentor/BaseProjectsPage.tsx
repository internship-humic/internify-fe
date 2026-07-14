import MentorProjectCard from './components/MentorProjectCard';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateProjectModal from './components/CreateProjectDialog';
import { useProjectsByRole } from '../../../hooks/useListProjects';
import TeamPana from '../../../assets/Team-pana.svg';

function MentorProjectCardSkeleton() {
  return (
    <div className="flex flex-row bg-gray-300 rounded-xl overflow-hidden shadow-sm w-[180px] min-h-[270px] animate-pulse">
    </div>
  )
}

export default function MentorProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects, loading, error, refetch } = useProjectsByRole();

  const openDialog = () => setIsModalOpen(true);
  const closeDialog = () => setIsModalOpen(false);
  const handleRefetch = () => {
    closeDialog();
    refetch();
  };


  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-row gap-3 w-full">
          {[...Array(4)].map((_, i) => (
            <MentorProjectCardSkeleton />
          ))}
        </div>
      );
    }

    if (error) return <p className="text-danger text-md">{error}</p>;

    if (projects.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-2 gap-3 mt-19 w-full">
          <img className="w-[440px]" src={TeamPana} alt="" />
          <p className="text-[18px] text-font-shade">
            Belum ada project, buat project dengan klik 'Add'
          </p>
        </div>
      );
    }

    return projects.map(project => (
      <MentorProjectCard
        key={project.id}
        {...project}
        onArchived={refetch}
        onCompleted={refetch}
      />
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="page-title">List Projects</h1>
          <p className="page-title-desc">
            Create, manage, and monitor ongoing projects and assignments.
          </p>
        </div>
        <button
          onClick={openDialog}
          className="flex items-center gap-2 px-4 py-1 bg-[#C0392B] text-white rounded-lg hover:bg-[#A93226] transition-colors duration-150"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-stretch">{renderContent()}</div>

      {isModalOpen && (
        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={closeDialog}
          onSuccess={handleRefetch}
        />
      )}
    </div>
  );
}