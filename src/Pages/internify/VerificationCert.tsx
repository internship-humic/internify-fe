import { useParams } from "react-router-dom";
import { useCertificateVerification } from "../../hooks/useCertificates";

export default function VerificationCert() {
  const { uuid } = useParams<{ uuid: string }>();
  const { verification, loading, error } = useCertificateVerification(uuid ?? "");

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Memverifikasi sertifikat...</p>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Sertifikat Tidak Valid</h1>
        <p className="text-gray-500">
          Sertifikat dengan UUID ini tidak dapat ditemukan atau sudah tidak berlaku.
        </p>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Sertifikat Valid
        </h1>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500">Nama Intern</span>
            <p className="font-semibold">{verification.intern_name}</p>
          </div>
          <div>
            <span className="text-gray-500">Proyek</span>
            <p className="font-semibold">{verification.project_name}</p>
          </div>
          <div>
            <span className="text-gray-500">Tanggal Terbit</span>
            <p className="font-semibold">
              {new Date(verification.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <span className="text-gray-500">UUID</span>
            <p className="font-mono text-xs break-all">{verification.uuid}</p>
          </div>
        </div>
      </div>
    </div>
  );
}