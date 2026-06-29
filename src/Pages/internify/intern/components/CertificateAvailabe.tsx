import { useState } from "react";
import { Download, Link, Printer } from "lucide-react";
import type { ProjectDetail } from "../../../../types/project.types";
import certificateImg from "../../../../assets/certificate.png";

interface CertificateAvailableProps {
  project: ProjectDetail | null;
}

export default function CertificateAvailable({ project }: CertificateAvailableProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hitung durasi dari start_date - end_date
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

  return (
    <div className="flex flex-col gap-4">
      {/* Certificate Card */}
        <div className="flex rounded-xl p-5 mb-1 border bg-box-primary border-box-border shadow-md items-center justify-center">
          <img
            src={certificateImg}
            alt="Certificate"
            className="rounded-xl w-[550px] h-[350px]"
          />
        </div>

        {/* Program Summary */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-800 text-sm">Ringkasan Program</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Nama Program", value: project?.project_name ?? "-" },
                { label: "Durasi", value: duration },
                { label: "Total Tugas", value: project ? `${project.total_tasks} Tugas` : "-" },
                {
                  label: "Status",
                  value: (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      UNVERIFIED
                    </span>
                  ),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0"
                >
                  <span className="text-gray-500">{row.label}</span>
                  <span className="text-gray-800 font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex flex-col gap-3">

              {/* Unduh Sertifikat */}
              <button className="flex items-center justify-center gap-2 w-full bg-red-700 hover:bg-red-800 active:scale-95 transition-all text-white font-semibold py-2 rounded-xl text-sm">
                <Download className="w-4 h-4" />
                Unduh Sertifikat (PDF)
              </button>

              {/* Bagikan ke LinkedIn */}
              <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold py-2 rounded-xl text-sm">
                Bagikan ke LinkedIn
              </button>

              {/* Cetak & Salin Link */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-red-700 font-medium py-3.5 rounded-xl text-sm">
                  <Printer className="w-5 h-5" />
                  Cetak
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-red-700 font-medium py-3.5 rounded-xl text-sm"
                >
                  <Link className="w-5 h-5" />
                  {copied ? "Copied!" : "Salin Link"}
                </button>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
}