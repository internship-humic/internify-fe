import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import ManageInternsModal from './components/AddInternsDialog';
import type { ProjectDetail, ProjectMember } from '../../../types/project.types';
import { useRemoveMember } from '../../../hooks/useProjects';
import { customToast } from '../../utils/showToast';
import { resolveFileUrl, getInitials } from '../../../hooks/useUser';

export default function InternsTab({ project }: { project: ProjectDetail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<ProjectMember[]>(project.members);
  const { remove, loading } = useRemoveMember();
  const isProjectActive = project?.status === "active"
  const [adminImageError, setAdminImageError] = useState(false);
  const adminAvatar = resolveFileUrl(project.admin.profile_picture);
  const adminHasPhoto = !!adminAvatar && !adminImageError;

  const handleModalClose = (finalMembers: ProjectMember[]) => {
    setMembers(finalMembers);
    setIsModalOpen(false);
  };

  const handleRemove = async (id_user: number) => {
    const res = await remove({ id_project: project.id, id_user });
    if (res !== null) {
      setMembers(prev => prev.filter(m => m.id !== id_user));
      customToast.success('Member removed', 'The intern has been successfully removed from this project.');
    } else {
      customToast.error('Failed to remove', 'An error occurred while removing the member. Please try again.');
    }
  };

  return (
    <div>
      {/* Mentor */}
      <div className="mb-8">
        <h3 className=" font-bold text-base text-[#1a1a1a] mb-3.5">
          Mentor
        </h3>
        <div className="border-b border-gray-300 pb-4">
          <div className="flex items-center gap-3 ">
            {adminHasPhoto ? (
              <img
                src={adminAvatar}
                alt={project.admin.full_name}
                className="w-[35px] h-[35px] object-cover rounded-full"
                onError={() => setAdminImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-[#B30000] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-wide">
                  {getInitials(project.admin.full_name)}
                </span>
              </div>
            )}
            <span className=" text-sm text-[#333]">
              {project.admin.full_name}
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
            disabled={!isProjectActive}
            className={`border border-gray-500 px-2 py-1 rounded-md transition-colors ${!isProjectActive ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
              }`}
          >
            <span className='flex items-center gap-3 text-[11px]'>
              <Plus className='w-3 h-3' />Add
            </span>
          </button>
        </div>
        {members.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16'>
            <Users className='w-12 h-12 text-gray-300 mx-auto' />
            <p className="text-sm text-font mt-3">Belum ada anggota.</p>
          </div>
        ) : (
          members.map((member: ProjectMember, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between py-3 ${idx < members.length - 1 ? 'border-b border-gray-300' : ''
                }`}
            >
              <div className="flex items-center gap-3">
                <span className=" text-sm text-font">
                  {member.email}
                </span>
              </div>
              <span className=" text-[13px] text-font font-semibold">
                {member.position}
              </span>
              <div>
                <button
                  onClick={() => handleRemove(member.id)}
                  disabled={loading || !isProjectActive}
                  className='flex items-center gap-1 text-[11px] bg-red-600 text-white py-1 px-2 rounded-md disabled:opacity-50 hover:bg-red-700 transition-colors disabled:cursor-not-allowed'
                >
                  <Plus className='w-4 h-4' />Delete
                </button>
              </div>
            </div>
          )))}
      </div>
      {isModalOpen && <ManageInternsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        projectId={project.id}
        initialMembers={members}
      />}
    </div>
  );
}