import MentorProjectCard from './components/MentorProjectCard';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateProjectModal from './components/CreateProjectDialog';
import { useProjectsByRole } from '../../../hooks/useListProjects';

export default function MentorProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects, loading, error, refetch } = useProjectsByRole();

  const openDialog = () => {
    setIsModalOpen(true);
  };
  const closeDialog = () => {
    setIsModalOpen(false);
  };
  const handleRefetch = () => {
    closeDialog();
    refetch();
  }

  if (loading) return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );

  if (error) return <p className="text-danger text-md">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="page-title">List Projects</h1>
          <p className="page-title-desc">Create, manage, and monitor ongoing projects and assignments.</p>
        </div>
        <div>
          <button
            onClick={openDialog}
            className="flex items-center gap-2 px-4 py-1 bg-[#C0392B] text-white rounded-lg hover:bg-[#A93226] transition-colors duration-150"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-stretch">
        {projects.map(project => (
          <MentorProjectCard 
          key={project.id}
          {...project}
          onArchived={refetch}
          onCompleted={refetch}
         />
        ))}
      </div>

      {isModalOpen && (
        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={closeDialog}
          onSuccess={handleRefetch}
        />
      )}
    </div>
  );
};