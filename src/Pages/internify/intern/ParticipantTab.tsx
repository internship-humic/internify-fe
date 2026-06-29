import type { ProjectDetail, ProjectMember } from '../../../types/project.types';

export default function ParticipantsTab({ project }: { project: ProjectDetail }) {
  return (
    <div>
      {/* Mentor */}
      <div className="mb-8">
        <h3 className="font-bold text-font-shade mb-3.5">Mentor</h3>
        <div className="border-b border-box-border pb-4">
          <div className="flex items-center gap-3">
            {project.admin.profile_picture ? (
              <img
                src={project.admin.profile_picture}
                alt={project.admin.full_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200" />
            )}
            <span className="text-md text-font">{project.admin.full_name}</span>
          </div>
        </div>
      </div>

      {/* Members */}
      <div>
        <h3 className="font-bold text-font-shade mb-3.5">Members</h3>
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

        {project.members.length === 0 && (
          <p className="text-sm text-gray-400">Belum ada members.</p>
        )}
      </div>
    </div>
  );
}