// src/pages/mentor/CertificateList.tsx
import { useNavigate } from "react-router-dom";
import {CalendarDays} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type CertStatus = "COMPLETED" | "PENDING CERTS";

interface Project {
  id: number;
  title: string;
  period: string;
  internCount: number;
  status: CertStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Autonomous Navigation Systems",
    period: "Jan 2024 - Apr 2024",
    internCount: 14,
    status: "COMPLETED",
  },
  {
    id: 2,
    title: "Full-Stack Fintech Solution",
    period: "Feb 2024 - June 2024",
    internCount: 8,
    status: "PENDING CERTS",
  },
  {
    id: 3,
    title: "User Experience Audit 2024",
    period: "Mar 2024 - May 2024",
    internCount: 5,
    status: "PENDING CERTS",
  },
  {
    id: 4,
    title: "Edge Computing Framework",
    period: "Dec 2023 - Mar 2024",
    internCount: 21,
    status: "COMPLETED",
  },
];

// ─── Sub Components ───────────────────────────────────────────────────────────

/** Badge status: COMPLETED (hijau) vs PENDING CERTS (kuning) */
function StatusBadge({ status }: { status: CertStatus }) {
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

/** Satu card project */
function ProjectCard({
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
      {/* Top: icon + status */}
      <div className="flex items-start justify-between">
        <StatusBadge status={project.status} />
      </div>

      {/* Title + period */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1.5">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
          <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{project.period}</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Intern count + avatars */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-medium mb-0.5">Interns</p>
          <p className="text-sm font-extrabold text-[#B30000]">
            {project.internCount} {project.internCount === 1 ? "intern" : "Interns"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CertificateList() {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/mentor/certificates/${id}`);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-1 text-xs font-medium text-[#B30000]">
        Certificates &rsaquo;
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* Section: List Projects */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">List Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}