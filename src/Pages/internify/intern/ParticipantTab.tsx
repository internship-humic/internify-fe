import { useParams } from 'react-router-dom';
import { useProjectInterns } from '../../../hooks/useProjectDetail';
import type { Project } from '../../../types/project.types';

export default function ParticipantsTab({ project }: { project: Project }) {
  const { id } = useParams<{ id: string }>();
  const { interns, loading, error } = useProjectInterns(id ?? "");

  return (
    <div>
      {/* Mentor */}
      <div className="mb-8">
        <h3 className="font-bold text-font-shade mb-3.5">Mentor</h3>
        <div className="border-b border-[#eee] pb-4">
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
            <span className="text-sm text-font">{project.admin.full_name}</span>
          </div>
        </div>
      </div>

      {/* Members */}
      <div>
        <h3 className="font-bold text-font-shade mb-3.5">Members</h3>

        {loading && (
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && interns.map((intern, idx) => (
          <div
            key={intern.id}
            className={`flex items-center justify-between py-3 ${
              idx < interns.length - 1 ? 'border-b border-[#f0f0f0]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {intern.avatar ? (
                <img
                  src={intern.avatar}
                  alt={intern.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0" />
              )}
              <div className="flex flex-col">
                <span className="text-sm text-[#333]">{intern.name}</span>
                <span className="text-[11px] text-gray-400">{intern.email}</span>
              </div>
            </div>
            <span className="text-[13px] text-[#555] font-semibold">{intern.role}</span>
          </div>
        ))}

        {!loading && !error && interns.length === 0 && (
          <p className="text-sm text-gray-400">Belum ada members.</p>
        )}
      </div>
    </div>
  );
}