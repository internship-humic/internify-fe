// CertificateAvailable.tsx
import { useState, useEffect } from "react";
import { Download, Link, Printer } from "lucide-react";
import type { ProjectDetail } from "../../../../types/project.types";
import type { Certificate } from "../../../../types/certificate.types";
import { downloadCertificatePdf, downloadCertificateImage } from "../../../utils/Certificates";
import { generateCertificate } from "../../../utils/SertificateGenerator";
import { resolveFileUrl } from "../../../utils/resolveFileFromUrl";
import { customToast } from "../../../utils/showToast";

interface CertificateAvailableProps {
  project: ProjectDetail;
  certificate: Certificate;
  templateUrl: string;
}

function formatDateIndo(date: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDateIndo(startDate)} - ${formatDateIndo(endDate)}`;
}

export default function CertificateAvailable({ project, certificate, templateUrl }: CertificateAvailableProps) {
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

  const duration = formatDateRange(project?.start_date, project?.end_date)


  useEffect(() => {
    if (!templateUrl) return;
    const verifyUrl = `${window.location.origin}/verify-certificate/${certificate.uuid}`;

    generateCertificate(
      resolveFileUrl(templateUrl),
      certificate.user.full_name,
      certificate.project.project_name,
      certificate.certificate_no,
      duration,
      verifyUrl,
    )
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      })
      .finally(() => setLoadingPreview(false));

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [templateUrl, certificate.user.full_name]);


  const handleDownloadImage = async () => {
    setDownloadingImg(true);
    try {
      await downloadCertificateImage(certificate, templateUrl, "png");
    } catch {
      customToast.error("Gagal mengunduh sertifikat!", "Terjadi kendala saat mengunduh sertifikat!");
    } finally {
      setDownloadingImg(false);
    }
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      await downloadCertificatePdf(certificate, templateUrl);
    } catch {
      customToast.error("Gagal mengunduh sertifikat!", "Terjadi kendala saat mengunduh sertifikat!");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleShareLinkedIn = () => {
    const verifyUrl = `${window.location.origin}/verify-certificate/${certificate.uuid}`;
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: certificate.project.project_name,
      organizationName: "Internify",
      certUrl: verifyUrl,
      certId: certificate.certificate_no,
    });
    window.open(
      `https://www.linkedin.com/profile/add?${params.toString()}`,
      "_blank",
      "width=600,height=600,noopener,noreferrer"
    );
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
            className="rounded-xl object-contain border-2"
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
                <span className="text-font">{row.label}</span>
                <span className="text-font-shade font-bold">{row.value}</span>
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
            <button
              onClick={handleShareLinkedIn}
              className="flex items-center justify-center gap-2 w-full bg-[#0A66C2] hover:bg-[#004182] active:scale-95 transition-all text-white font-semibold py-2 rounded-xl text-sm"
            >
              {/* LinkedIn icon */}
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Tambah ke Profil LinkedIn
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
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/verify-certificate/${certificate.uuid}`);
                  customToast.success("Link berhasil disalin!");
                }}
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