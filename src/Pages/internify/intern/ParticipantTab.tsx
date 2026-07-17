import { Users } from 'lucide-react';
import type { ProjectDetail, ProjectMember } from '../../../types/project.types';
import { useState } from 'react';
import { getInitials } from '../../../hooks/useUser';
import { resolveFileUrl } from '../../utils/resolveFileFromUrl';

export default function ParticipantsTab({ project }: { project: ProjectDetail }) {
  const [ImageError, setImageError] = useState(false);
  const Avatar = resolveFileUrl(project.admin.profile_picture);
  const hasAvatar = !!Avatar && !ImageError;
  return (
    <div>
      {/* Mentor */}
      <div className="mb-8">
        <h3 className="font-bold text-font-shade mb-3.5">Mentor</h3>
        <div className="border-b border-box-border pb-4">
          <div className="flex items-center gap-3">
            {hasAvatar ? (
              <img
                src={Avatar}
                alt={project.admin.full_name}
                className="w-[40px] h-[40px] object-cover rounded-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-[#B30000] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-wide">
                  {getInitials(project.admin.full_name)}
                </span>
              </div>
            )}
            <span className="text-md text-font">{project.admin.full_name}</span>
          </div>
        </div>
      </div>

      {/* Members */}
      <div>
        <h3 className="font-bold text-font-shade mb-3.5">Members</h3>
        {project.members.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16'>
            <Users className='w-12 h-12 text-font-shade mx-auto'/>
            <p className="text-sm text-font-shade mt-3">Belum ada anggota.</p>
          </div>
        ) : (
          <>
            {project.members.map((member: ProjectMember, idx) => (
              <div
                key={member.id}
                className={`flex items-center justify-between py-3 ${
                  idx < project.members.length - 1 ? 'border-b border-box-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.full_name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm text-[#333]">{member.full_name}</span>
                    <span className="text-[11px] text-gray-400">{member.email}</span>
                  </div>
                </div>
                <span className="text-[13px] text-[#555] font-semibold">{member.kelompok_peminatan}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}