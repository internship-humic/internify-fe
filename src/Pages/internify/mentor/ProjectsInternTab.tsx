import { useState } from 'react';
import type { Project, Intern } from '../../../lib/mockData';
import { Plus } from 'lucide-react';
import ManageInternsModal from './components/AddInternsDialog';

export default function InternsTab({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Mentor */}
      <div className="mb-8">
        <h3 className=" font-bold text-base text-[#1a1a1a] mb-3.5">
          Mentor
        </h3>
        <div className="border-b border-gray-300 pb-4">
          <div className="flex items-center gap-3">
            <span className=" text-sm text-[#333]">
              {project.mentor}
            </span>
          </div>
        </div>
      </div>

      {/* Members */}
      <div>
        <div className='flex justify-between mb-3.5 '>
          <h3 className="font-bold text-base text-black">
            Members
          </h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='bg-gray-300 border border-gray-500 px-2 py-1 rounded-xl hover:bg-gray-400 transition-colors'
          >
            <span className='flex items-center gap-3 text-[14px]'>
              <Plus className='w-3 h-3'/>Add
            </span>
          </button>
        </div>
        {project.interns.map((intern: Intern, idx: number) => (
          <div
            key={idx}
            className={`flex items-center justify-between py-3 ${idx < project.interns.length - 1 ? 'border-b border-gray-300' : ''
              }`}
          >
            <div className="flex items-center gap-3">
              <span className=" text-sm text-[#333]">
                {intern.email}
              </span>
            </div>
            <span className=" text-[13px] text-[#555] font-semibold">
              {intern.role}
            </span>
          </div>
        ))}
      </div>
      {isModalOpen && <ManageInternsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />}
    </div>
  );
}