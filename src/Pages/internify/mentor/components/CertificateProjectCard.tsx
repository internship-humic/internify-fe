import { CalendarDays } from "lucide-react";
import type { Project } from "../../../../types/project.types";

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isCompleted = status === "COMPLETED";
  return (
    <span
      className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border ${
        isCompleted
          ? "bg-green-50 text-green-600 border-green-200"
          : "bg-yellow-50 text-yellow-600 border-yellow-200"
      }`}
    >
      {status}
    </span>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export default function CertificateProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col gap-4"
    >
      {/* Top: status badge */}
      <div className="flex items-start justify-between">
        <StatusBadge status={project.status} />
      </div>

      {/* Title + period */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1.5">
          {project.project_name}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
          <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{project.start_date} - {project.end_date}</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Intern count */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-medium mb-0.5">Interns</p>
          <p className="text-sm font-extrabold text-[#B30000]">
            {project.total_members} interns
          </p>
        </div>
      </div>
    </div>
  );
}
