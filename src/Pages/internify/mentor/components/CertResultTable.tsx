import { useState } from "react";
import {
  Search, Eye, Download,
  ChevronLeft, ChevronRight, Loader2,
} from "lucide-react";
import type { Certificate } from "../../../../types/certificate.types";
import {
  previewCertificate,
  downloadCertificatePdf,
} from "../../../utils/Certificates";

const PER_PAGE = 5;

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 bg-gray-100 text-gray-600">
      {getInitials(name)}
    </div>
  );
}

interface CertificateTableProps {
  certificates: Certificate[];
  templateUrl: string;
}

export default function CertResultTable({ certificates, templateUrl }: CertificateTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handlePreview = (cert: Certificate) => {
    previewCertificate(cert, templateUrl);
  };

  const handleDownloadPdf = async (cert: Certificate) => {
    setDownloadingId(cert.id);
    try {
      await downloadCertificatePdf(cert, templateUrl);
    } catch (err) {
      console.error("Gagal download PDF:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filtered = certificates.filter(
    (c) =>
      c.user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.user.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">Recipient Directory</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Filter interns..."
            value={search}
            onChange={handleSearch}
            className="pl-8 pr-3 py-1.5 text-xs border border-card-outline rounded-lg bg-white text-font-shade placeholder-font focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 w-44 transition-colors"
          />
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[2fr_1.5fr_auto] px-5 py-2.5 bg-gray-50 border-b border-gray-100">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Intern Name</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Credential ID</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {paginated.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            No interns match your search.
          </div>
        ) : (
          paginated.map((cert) => (
            <div
              key={cert.id}
              className="grid grid-cols-[2fr_1.5fr_auto] items-center px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
            >
              {/* Name */}
              <div className="flex items-center gap-3">
                <Avatar name={cert.user.full_name} />
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{cert.user.full_name}</p>
                </div>
              </div>

              {/* Credential ID */}
              <p className="text-xs font-mono text-gray-500 tracking-wide">{cert.uuid}</p>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePreview(cert)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDownloadPdf(cert)}
                  disabled={downloadingId === cert.id}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-40"
                  title="Download PDF"
                >
                  {downloadingId === cert.id
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Download className="w-4 h-4" />
                  }
                </button>
{/* 
                <button
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 bg-gray-50/30">
        <p className="text-xs text-gray-400 font-medium">
          Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1} to{" "}
          {Math.min(page * PER_PAGE, filtered.length)} of {certificates.length} interns
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1 border border-gray-200 rounded-md bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${
                n === page
                  ? "bg-[#B30000] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="p-1 border border-gray-200 rounded-md bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}