import { useParams } from "react-router-dom";
import { useCertificateVerification } from "../../hooks/useCertificates";
import logoHumic from "../../assets/logo.png"

export default function VerificationCert() {
  const { uuid } = useParams<{ uuid: string }>();
  const { verification, loading, error } = useCertificateVerification(uuid ?? "");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Memverifikasi sertifikat...</p>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-300 to-gray-50 flex items-center justify-center flex-col px-6 relative overflow-hidden">
        <img
          src={logoHumic}
          alt="Humic Internify"
          className="w-[240px] h-[240x] object-cover mb-10"
        />
        <h1 className="text-2xl font-bold text-red mb-2 animate-pulse">Maaf, ID Sertifikat anda masukkan tidak valid</h1>
        <p className="text-gray-500 text-[16px]">
          Sertifikat dengan UUID ini tidak dapat ditemukan atau sudah tidak berlaku.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-150 via-slate-300 to-gray-50 flex items-center justify-center flex-col px-6 relative overflow-hidden">
        <img
          src={logoHumic}
          alt="Humic Internify"
          className="[240px] h-[240x] object-cover mb-14"
        />
        <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Sertifikat Valid
        </h1>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-font">Nama Intern</span>
            <p className="font-semibold">{verification.intern_name}</p>
          </div>
          <div>
            <span className="text-font">Proyek</span>
            <p className="font-semibold">{verification.project_name}</p>
          </div>
          <div>
            <span className="text-font">Tanggal Terbit</span>
            <p className="font-semibold">
              {new Date(verification.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <span className="text-font">UUID</span>
            <p className="font-mono text-xs break-all">{verification.uuid}</p>
          </div>
        </div>
    </div>
  );
}