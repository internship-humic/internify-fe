// src/pages/mentor/CertificateResult.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  FolderArchive,
  Search,
  Eye,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface InternCert {
  id: number;
  name: string;
  role: string;
  initials: string;
  credentialId: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockCerts: InternCert[] = [
  { id: 1, name: "Alex Johnson",  role: "Backend Engineering",    initials: "AJ", credentialId: "CERT-2023-0045" },
  { id: 2, name: "Sarah Lin",     role: "UI/UX Design Specialist",initials: "SL", credentialId: "CERT-2023-0046" },
  { id: 3, name: "Marcus Kane",   role: "Data Analytics",         initials: "MK", credentialId: "CERT-2023-0047" },
  { id: 4, name: "Priya Sharma",  role: "Frontend Engineering",   initials: "PS", credentialId: "CERT-2023-0048" },
  { id: 5, name: "Derek Lim",     role: "DevOps & Cloud",         initials: "DL", credentialId: "CERT-2023-0049" },
  { id: 6, name: "Nina Castillo", role: "Mobile Development",     initials: "NC", credentialId: "CERT-2023-0050" },
];

const TOTAL_CERTS = 18;
const PER_PAGE   = 3;

// ─── Avatar ───────────────────────────────────────────────────────────────────
const avatarColors: Record<string, string> = {
  AJ: "bg-blue-100 text-blue-700",
  SL: "bg-purple-100 text-purple-700",
  MK: "bg-orange-100 text-orange-700",
  PS: "bg-teal-100 text-teal-700",
  DL: "bg-green-100 text-green-700",
  NC: "bg-pink-100 text-pink-700",
};

function Avatar({ initials }: { initials: string }) {
  const color = avatarColors[initials] ?? "bg-gray-100 text-gray-600";
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CertificateResult() {
  const navigate   = useNavigate();
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);

  // Filter + paginate
  const filtered = mockCerts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-1 text-xs font-medium text-[#B30000] cursor-pointer w-fit"
           onClick={() => navigate("/mentor/certificates/all")}>
        Certificates &rsaquo;
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* ── Success Hero ── */}
      <div className="flex flex-col items-center text-center mb-8 px-4">
        {/* Icon circle */}
        <div className="w-16 h-16 rounded-full bg-[#B30000] flex items-center justify-center shadow-lg mb-5">
          <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#B30000] mb-3 leading-tight">
          {TOTAL_CERTS} Certificates Successfully Generated!
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-6">
          The validation engine has processed all engineering credentials. You can now
          publish them to the public registry or download the batch for offline distribution.
        </p>

        {/* Download CTA */}
        <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-[#B30000] bg-white hover:bg-red-50 hover:border-red-200 shadow-sm transition-colors">
          <FolderArchive className="w-4 h-4" />
          Download All (ZIP)
        </button>
      </div>

      {/* ── Bottom Section: Table + Preview Card ── */}
      <div className="flex flex-col xl:flex-row gap-4 items-start">

        {/* Recipient Directory Table */}
        <div className="flex-1 min-w-0 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Recipient Directory</h3>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Filter interns..."
                value={search}
                onChange={handleSearch}
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 w-44 transition-colors"
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
                  {/* Name + role */}
                  <div className="flex items-center gap-3">
                    <Avatar initials={cert.initials} />
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{cert.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{cert.role}</p>
                    </div>
                  </div>

                  {/* Credential ID */}
                  <p className="text-xs font-mono text-gray-500 tracking-wide">{cert.credentialId}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Share">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400 font-medium">
              Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1} to{" "}
              {Math.min(page * PER_PAGE, filtered.length)} of {TOTAL_CERTS} interns
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

        {/* Preview Card (placeholder — gambar belum diimplementasi) */}
        <div className="xl:w-64 w-full flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 via-[#7a1010] to-[#B30000] shadow-md min-h-[200px] flex flex-col justify-end p-5">
          <div className="mt-auto">
            <p className="text-white font-extrabold text-base leading-snug">
              Institutional Excellence
            </p>
            <p className="text-red-200 text-xs mt-1">
              Certified via Mentor Portal v2.4
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}