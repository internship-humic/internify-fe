import type { Project, Intern } from '../../../lib/mockData';

export default function ParticipantsTab({ project }: { project: Project }) {
  return (
    <div>
      {/* Mentor */}
      <div className="mb-8">
        <h3 className=" font-bold text-base text-[#1a1a1a] mb-3.5">
          Mentor
        </h3>
        <div className="border-b border-[#eee] pb-4">
          <div className="flex items-center gap-3">
            <span className=" text-sm text-[#333]">
              {project.mentor}
            </span>
          </div>
        </div>
      </div>

      {/* Members */}
      <div>
        <h3 className="font-bold text-base text-[#1a1a1a] mb-3.5">
          Members
        </h3>
        {project.interns.map((intern: Intern, idx: number) => (
          <div
            key={idx}
            className={`flex items-center justify-between py-3 ${
              idx < project.interns.length - 1 ? 'border-b border-[#f0f0f0]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className=" text-sm text-[#333]">
                {intern.name}
              </span>
            </div>
            <span className=" text-[13px] text-[#555] font-semibold">
              {intern.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}