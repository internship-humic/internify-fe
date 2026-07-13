// src/pages/intern/SertificatePage.tsx
import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import CertificateAvailable from "./components/CertificateAvailabe";
import CertificateNotAvailable from "./components/CertificateNotAvailable";
import SertificateHistory from "./components/CertificateHistory";

import { useProjectDetail } from "../../../hooks/useProjects";
import { useMyCertificates } from "../../../hooks/useCertificates";
import type { Project } from "../../../types/project.types";

export default function InternCertificateDetail () {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const projectFromList = location.state?.project as Project | undefined;

  const { project: projectDetail, loading: projectLoading } = useProjectDetail(slug ?? "");
  const { certificates, loading: certLoading, refetch: refetchCertificates } = useMyCertificates();


  const myCertificateForProject = useMemo(() => {
    if (!projectDetail) return null;
    return certificates.find((cert) => cert.id_project === projectDetail.id);
  }, [projectDetail, certificates]);

  const project = useMemo(() => {
    if (!projectDetail) return null;
    return {
      ...projectDetail,
      task_done: projectFromList?.task_done ?? 0,
      total_tasks: projectFromList?.total_tasks ?? projectDetail.total_tasks,
    };
  }, [projectDetail, projectFromList]);

  const allTasksDone = !projectLoading && !!project && project.task_done >= project.total_tasks;

  const progress =
    project && project.total_tasks > 0
      ? Math.round((project.task_done / project.total_tasks) * 100)
      : 0;
  const remainingTasks = project ? project.total_tasks - project.task_done : 0;
  const isLoading = projectLoading || certLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Memuat Data...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">View and download internship certificates</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="w-full lg:w-5/8 flex flex-col">
          {myCertificateForProject ? (
            <CertificateAvailable
              project={project}
              certificate={myCertificateForProject}
              templateUrl = {project?.certificate_template ?? ""}
            />
          ) : (
            <CertificateNotAvailable
              progress={progress}
              remainingTasks={remainingTasks}
              allTasksDone={allTasksDone}
            />
          )}
        </div>
        <div className="w-full lg:w-3/8 flex-shrink-0">
          <SertificateHistory />
        </div>
      </div>
    </div>
  );
};