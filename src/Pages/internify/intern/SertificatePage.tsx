import { useMemo } from "react";
import { useParams } from "react-router-dom";
import CertificateAvailable from "./components/CertificateAvailabe";
import CertificateNotAvailable from "./components/CertificateNotAvailable";
import SertificateHistory from "./components/CertificateHistory";
import { useMyCertificates } from "../../../hooks/useSertificates";
import { useProjectDetail } from "../../../hooks/useProjects";

const SertificatePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading: projectLoading } = useProjectDetail(slug ?? "");
  const { certificates, loading: certLoading } = useMyCertificates();

  const allTasksDone = !projectLoading && !!project && project.task_done >= project.total_tasks;

  const alreadyDone = useMemo(() => {
    if (!project || !certificates.length) return false;
    return certificates.some((cert) => cert.project.id === project.id);
  }, [certificates, project]);

  const progress =
    project && project.total_tasks > 0
      ? Math.round((project.task_done / project.total_tasks) * 100)
      : 0;

  const remainingTasks = project ? project.total_tasks - project.task_done : 0;

  const isLoading = projectLoading || certLoading;
  const showCertificate = alreadyDone;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Loading...
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
          {showCertificate ? (
            <CertificateAvailable project={project} />
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

export default SertificatePage;