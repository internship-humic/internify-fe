import { useState, useMemo } from "react";
import CertificateAvailable from "./components/CertificateAvailabe";
import CertificateNotAvailable from "./components/CertificateNotAvailable";
import SertificateHistory from "./components/CertificateHistory";
import { useMyCertificates, useClaimCertificate } from "../../../hooks/useSertificates";
import { useMyProjects } from "../../../hooks/useProjects";
import type { ProjectDetail } from "../../../types/project.types";

const SertificatePage = () => {
  const { projects, loading: projectsLoading } = useMyProjects();
  const { certificates, loading: certLoading } = useMyCertificates();
  const { claim, loading: claiming } = useClaimCertificate();
  const [justClaimed, setJustClaimed] = useState(false);

  const current_task = useMemo(() => {
    if (!projects || projects.length === 0) return null;
    return projects.find((p) => p.task_done < p.total_tasks) ?? null;
  }, [projects]);

  const finished_task = useMemo((): ProjectDetail | null => {
    if (!projects || projects.length === 0) return null;
    return projects.find((p) => p.task_done >= p.total_tasks) ?? null;
  }, [projects]);

  // Cek apakah finished_task sudah punya certificate di backend
  const alreadyClaimed = useMemo(() => {
    if (!finished_task || !certificates.length) return false;
    return certificates.some((cert) => cert.project.id === finished_task.id);
  }, [certificates, finished_task]);

  const allTasksDone = !projectsLoading && current_task === null && projects.length > 0;

  const progress =
    current_task && current_task.total_tasks > 0
      ? Math.round((current_task.task_done / current_task.total_tasks) * 100)
      : 100;

  const remainingTasks = current_task
    ? current_task.total_tasks - current_task.task_done
    : 0;

  const handleClaim = async () => {
    if (!finished_task) return;
    const result = await claim(finished_task.id);
    if (result) setJustClaimed(true);
  };

  const isLoading = projectsLoading || certLoading;
  const showCertificate = alreadyClaimed || justClaimed;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Loading...
      </div>
    );
  }
  console.log(finished_task)
  return (
    <div>
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">View and download internship certificates</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="w-full lg:w-5/8 flex flex-col">
          {showCertificate ? (
            <CertificateAvailable project={finished_task} />
          ) : (
            <CertificateNotAvailable
              progress={progress}
              remainingTasks={remainingTasks}
              allTasksDone={allTasksDone}
              onClaim={handleClaim}
              claiming={claiming}
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

export default SertificatePage;