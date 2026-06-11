import { mockProjects } from '../../../lib/mockData';
import MentorProjectCard from './components/MentorProjectCard';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateProjectModal from './components/CreateProjectDialog';

export default function MentorProjectsPage(){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDialog = () => {
    setIsModalOpen(true);
  };

  const closeDialog = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="page-title">List Projects</h1>
          <p className="page-title-desc">Create, manage, and monitor ongoing projects and assignments.</p>
        </div>
        <div>
          {/* Tombol pemicu buka modal */}
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
        {mockProjects.map(project => (
          <MentorProjectCard key={project.id} {...project} />
        ))}
      </div>

      {isModalOpen && (
        <CreateProjectModal 
          isOpen={isModalOpen} 
          onClose={closeDialog} 
        />
      )}
    </div>
  );
};