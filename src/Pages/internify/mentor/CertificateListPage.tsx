// src/pages/mentor/CertificateListPage.tsx
import { useNavigate } from "react-router-dom";
import CertificateProjectCard from "./components/CertificateProjectCard";
import { useProjects } from "../../../hooks/useProjects";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CertificateList() {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  const handleCardClick = (slug: string) => {
    navigate(`/mentor/certificates/${slug}`);
  };

  if (loading){
    <p>on loading</p>
  }

  if (error){
    <p>error: {error}</p>
  }
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* Section: List Projects */}
      <div>
        <h2 className="text-base font-bold text-font-shade mb-4">List Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <CertificateProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}