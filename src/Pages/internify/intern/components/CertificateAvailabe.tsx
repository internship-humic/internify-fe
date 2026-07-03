// CertificateAvailable.tsx
import { useState, useEffect } from "react";
import { Download, Link, Printer } from "lucide-react";
import type { ProjectDetail } from "../../../../types/project.types";
import type { Certificate } from "../../../../types/certificate.types";
import { downloadCertificatePdf, downloadCertificateImage } from "../../../utils/Certificates";
import { generateCertificate, resolveImageUrl } from "../../../utils/SertificateGenerator";

interface CertificateAvailableProps {
  project: ProjectDetail | null;
  certificate: Certificate;
  templateUrl: string;
}

export default function CertificateAvailable({ project, certificate, templateUrl }: CertificateAvailableProps) {
  // const [copied, setCopied] = useState(false);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

  useEffect(() => {
    if (!templateUrl) return;

    generateCertificate(resolveImageUrl(templateUrl), certificate.user.full_name, certificate.project.project_name, certificate.certificate_no, certificate.uuid)
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      })
      .finally(() => setLoadingPreview(false));

    // Cleanup supaya tidak memory leak
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [templateUrl, certificate.user.full_name]);

  const duration = project
    ? (() => {
      const start = new Date(project.start_date);
      const end = new Date(project.end_date);
      const diffMs = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;
      if (months > 0 && days > 0) return `${months} Bulan ${days} Hari`;
      if (months > 0) return `${months} Bulan`;
      return `${diffDays} Hari`;
    })()
    : "-";

  const handleDownloadImage = async () => {
    setDownloadingImg(true);
    try {
      await downloadCertificateImage(certificate, templateUrl, "png");
    } finally {
      setDownloadingImg(false);
    }
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      await downloadCertificatePdf(certificate, templateUrl);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Certificate Card */}
      <div className="flex rounded-xl p-5 mb-1 border bg-box-primary border-box-border shadow-md items-center justify-center">
        {loadingPreview ? (
          <div className="w-[550px] h-[350px] flex items-center justify-center text-gray-400 text-sm">
            Memuat sertifikat...
          </div>
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt="Certificate"
            className="rounded-xl w-[550px] h-[350px] object-contain"
          />
        ) : (
          <div className="w-[550px] h-[350px] flex items-center justify-center text-gray-400 text-sm">
            Gagal memuat sertifikat.
          </div>
        )}
      </div>

      {/* Program Summary */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-card-outline shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">Ringkasan Program</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Nama Program", value: project?.project_name ?? "-" },
              { label: "Durasi", value: duration },
              { label: "No. Sertifikat", value: certificate.certificate_no ?? "-" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center text-sm border-b border-card-outline pb-2 last:border-0"
              >
                <span className="text-gray-500">{row.label}</span>
                <span className="text-gray-800 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-card-outline shadow-sm p-5">
          <div className="flex flex-col gap-3">
            {/* Unduh Sertifikat */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="flex items-center justify-center gap-2 w-full bg-red-700 hover:bg-red-800 active:scale-95 transition-all text-white font-semibold py-2 rounded-xl text-sm"
            >
              <Download className="w-4 h-4" />
              {downloadingPdf ? "Memproses" : "Unduh Sertifikat"}
            </button>

            {/* Bagikan ke LinkedIn */}
            <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold py-2 rounded-xl text-sm">
              Bagikan ke LinkedIn
            </button>

            {/* Cetak & Salin Link */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadImage}
                disabled={downloadingImg}
                className="flex flex-col items-center justify-center gap-1.5 border border-card-outline hover:bg-gray-50 active:scale-95 transition-all text-red-700 font-medium py-3.5 rounded-xl text-sm">
                <Printer className="w-5 h-5" />
                {downloadingImg ? "Memproses" : "Cetak"}
              </button>
              <button
                // onClick={handleCopyLink}
                className="flex flex-col items-center justify-center gap-1.5 border border-card-outline hover:bg-gray-50 active:scale-95 transition-all text-red-700 font-medium py-3.5 rounded-xl text-sm"
              >
                <Link className="w-5 h-5" />
                  Salin Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}