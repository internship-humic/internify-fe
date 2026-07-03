import { useState } from "react";
import { CheckCircle2, FolderArchive, Loader2 } from "lucide-react";
import { useProjectCertificates } from "../../../hooks/useCertificates";
import { useProjectDetail } from "../../../hooks/useProjects";
import { useParams } from "react-router-dom";
import { downloadAllCertificatesZip } from "../../utils/Certificates";
import CertResultTable from "./components/CertResultTable";

export default function CertificateResult() {
  const { slug } = useParams<{ slug: string }>();
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState<{ done: number; total: number } | null>(null);

  const { project, loading: projectLoading, error: projectError } = useProjectDetail(slug ?? "");
  const { certificates, loading: certLoading, error: certError } = useProjectCertificates(project?.id ?? 0);

  const loading = projectLoading || certLoading;
  const error = projectError || certError;

  const handleDownloadZip = async () => {
    if (!project || certificates.length === 0) return;
    setZipping(true);
    setZipProgress({ done: 0, total: certificates.length });
    try {
      await downloadAllCertificatesZip(
        certificates,
        project.certificate_template ?? "",
        project.project_name,
        (done, total) => setZipProgress({ done, total })
      );
    } catch (err) {
      console.error("Gagal download ZIP:", err);
    } finally {
      setZipping(false);
      setZipProgress(null);
    }
  };

  if (loading) return <p>Sedang Memuat...</p>;
  if (error) return <div className="text-sm text-red-500 p-4">Gagal memuat data sertifikat.</div>;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* Success Hero */}
      <div className="flex flex-col items-center text-center mb-8 px-4">
        <div className="w-16 h-16 rounded-full bg-red flex items-center justify-center shadow-lg mb-5">
          <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-red mb-3 leading-tight">
          {certificates.length} Certificates has been Generated!
        </h2>
        <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-6">
          The validation engine has processed all engineering credentials. You can now
          publish them to the public registry or download the batch for offline distribution.
        </p>
        <button
          onClick={handleDownloadZip}
          disabled={zipping || certificates.length === 0}
          className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-red bg-white hover:bg-red-50 hover:border-red-200 shadow-sm transition-colors disabled:opacity-50"
        >
          {zipping ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {zipProgress ? `Mengemas ${zipProgress.done}/${zipProgress.total}...` : "Menyiapkan..."}
            </>
          ) : (
            <>
              <FolderArchive className="w-4 h-4" />
              Download All (ZIP)
            </>
          )}
        </button>
      </div>

      {/* Table */}
      <CertResultTable 
        certificates={certificates} 
        templateUrl={project?.certificate_template ?? ""}
      />
    </div>
  );
}