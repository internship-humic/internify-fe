// src/pages/mentor/CertificateListPage.tsx
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import CertificateProjectCard from "./components/CertificateProjectCard";
import { useProjects } from "../../../hooks/useProjects";
import emptyimage from "../../../assets/Learning-amico.svg";

function CertCardSkeleton() {
  return (
    <div className="bg-white border border-card-outline rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* Thumbnail */}
      <div className="p-6 pb-0">
        <div className="rounded-lg overflow-hidden">
          <div className="w-full h-32 bg-gray-200 rounded-lg" />
        </div>
      </div>
      {/* Info */}
      <div className="px-4 py-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function CertificateList() {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  const handleCardClick = (slug: string) => {
    navigate(`/mentor/certificates/${slug}`);
  };

  const isEmpty = !loading && !error && projects.length === 0;
  const hasProjects = !loading && !error && projects.length > 0;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* Loading Skeleton - struktur sama persis dengan body */}
      {loading && (
        <div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <CertCardSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center justify-center py-20 text-red-500 gap-2">
          <AlertCircle className="w-6 h-6" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Empty */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-20 gap-5 text-font-shade">
          <img src={emptyimage} alt="Tidak ada projek" className="w-64 h-64" />
          <p className="text-[18px]">Tidak ada projek yang berlangsung.</p>
        </div>
      )}

      {/* Section: List Projects - hanya tampil kalau ada project */}
      {hasProjects && (
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
      )}
    </div>
  );
}