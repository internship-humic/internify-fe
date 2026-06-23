// src/pages/mentor/CertificateDetail.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type InternStatus = "ELIGIBLE" | "INCOMPLETE";

interface Intern {
  id: number;
  name: string;
  role: string;
  initials: string;
  taskProgress: number;
  taskTotal: number;
  status: InternStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockProject = {
  title: "Edge Computing Framework",
  period: "Dec 2023 — Mar 2024",
  status: "COMPLETED" as const,
  scope:
    "Advanced research and implementation of low-latency computing nodes at the network edge, focusing on real-time data processing for autonomous systems.",
  totalInterns: 21,
  eligibleInterns: 18,
};

const mockInterns: Intern[] = [
  { id: 1, name: "Marcus Rodriguez", role: "Software Engineer Intern",    initials: "MR", taskProgress: 10, taskTotal: 10, status: "ELIGIBLE"   },
  { id: 2, name: "Priya Sharma",     role: "Frontend Developer Intern",   initials: "PS", taskProgress: 8,  taskTotal: 10, status: "INCOMPLETE" },
  { id: 3, name: "James Smith",      role: "QA Engineering Intern",       initials: "JS", taskProgress: 10, taskTotal: 10, status: "ELIGIBLE"   },
  { id: 4, name: "Nina Castillo",    role: "Mobile Development Intern",   initials: "NC", taskProgress: 9,  taskTotal: 10, status: "ELIGIBLE"   },
  { id: 5, name: "Derek Lim",        role: "DevOps & Cloud Intern",       initials: "DL", taskProgress: 7,  taskTotal: 10, status: "INCOMPLETE" },
  { id: 6, name: "Alex Johnson",     role: "Backend Engineering Intern",  initials: "AJ", taskProgress: 10, taskTotal: 10, status: "ELIGIBLE"   },
];

const TOTAL_ENTRIES = 1284;
const PER_PAGE = 3;

// ─── Avatar ───────────────────────────────────────────────────────────────────
const avatarColors: Record<string, string> = {
  MR: "bg-blue-100 text-blue-700",
  PS: "bg-purple-100 text-purple-700",
  JS: "bg-green-100 text-green-700",
  NC: "bg-pink-100 text-pink-700",
  DL: "bg-teal-100 text-teal-700",
  AJ: "bg-orange-100 text-orange-700",
};

function Avatar({ initials }: { initials: string }) {
  const color = avatarColors[initials] ?? "bg-gray-100 text-gray-500";
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.round((value / total) * 100);
  const isComplete = value === total;
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isComplete ? "bg-[#B30000]" : "bg-gray-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-bold ${isComplete ? "text-[#B30000]" : "text-gray-500"}`}>
        {value}/{total}
      </span>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: InternStatus }) {
  const isEligible = status === "ELIGIBLE";
  return (
    <div className={`flex items-center gap-1 text-[11px] font-extrabold tracking-wide ${isEligible ? "text-green-600" : "text-orange-500"}`}>
      {isEligible
        ? <CheckCircle2 className="w-3.5 h-3.5" />
        : <AlertCircle  className="w-3.5 h-3.5" />}
      {status}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CertificateDetail() {
  const navigate = useNavigate();

  // Selected interns (checked)
  const initialSelected = new Set(
    mockInterns.filter((i) => i.status === "ELIGIBLE").map((i) => i.id)
  );
  const [selected, setSelected] = useState<Set<number>>(initialSelected);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(mockInterns.length / PER_PAGE);
  const paginated  = mockInterns.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const eligibleIds = mockInterns.filter((i) => i.status === "ELIGIBLE").map((i) => i.id);
  const allEligibleSelected = eligibleIds.every((id) => selected.has(id));

  const toggleSelectAll = () => {
    if (allEligibleSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(eligibleIds));
    }
  };

  const toggleOne = (id: number, status: InternStatus) => {
    if (status === "INCOMPLETE") return; // tidak bisa dipilih
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div
        className="mb-1 text-xs font-medium text-[#B30000] cursor-pointer w-fit"
        onClick={() => navigate("/mentor/certificates/all")}
      >
        Certificates &rsaquo;
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── LEFT: Project Info ── */}
        <div className="space-y-5">
          {/* Status badge */}
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-green-600 tracking-wide">
            <CheckCircle2 className="w-4 h-4" />
            COMPLETED
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {mockProject.title}
          </h2>

          {/* Period */}
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <CalendarDays className="w-4 h-4 flex-shrink-0" />
            {mockProject.period}
          </div>

          {/* Project Scope */}
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Project Scope
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {mockProject.scope}
            </p>
          </div>

          {/* Stats: Total & Eligible */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[#B30000]">{mockProject.totalInterns}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Total Interns</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-2xl font-extrabold text-gray-900">{mockProject.eligibleInterns}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Eligible</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Intern Roster ── */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">

          {/* Roster Header */}
          <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Intern Roster</h3>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug max-w-xs">
                Confirm completion status before final certificate generation.
              </p>
            </div>
            {/* Select All button */}
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors flex-shrink-0 ml-4"
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                allEligibleSelected ? "bg-[#B30000] border-[#B30000]" : "border-gray-300"
              }`}>
                {allEligibleSelected && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                Select All Eligible ({mockProject.eligibleInterns})
              </span>
            </button>
          </div>

          {/* Column Headers */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-5 py-2.5 bg-gray-50/70 border-b border-gray-100">
            <div className="w-4" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Intern Name</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-20 text-center">Task Progress</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-24 text-center">Status</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-16 text-center">Action</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {paginated.map((intern) => {
              const isChecked    = selected.has(intern.id);
              const isIncomplete = intern.status === "INCOMPLETE";
              return (
                <div
                  key={intern.id}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-5 py-3.5 hover:bg-gray-50/40 transition-colors"
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleOne(intern.id, intern.status)}
                    disabled={isIncomplete}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isIncomplete
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : isChecked
                        ? "bg-[#B30000] border-[#B30000]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {isChecked && !isIncomplete && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  {/* Name + role */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar initials={intern.initials} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 leading-tight truncate">{intern.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">{intern.role}</p>
                    </div>
                  </div>

                  {/* Task Progress */}
                  <div className="w-20 flex justify-center">
                    <ProgressBar value={intern.taskProgress} total={intern.taskTotal} />
                  </div>

                  {/* Status */}
                  <div className="w-24 flex justify-center">
                    <StatusBadge status={intern.status} />
                  </div>

                  {/* Action */}
                  <div className="w-16 flex justify-center">
                    {isIncomplete ? (
                      <button className="text-[11px] font-extrabold text-[#B30000] hover:underline whitespace-nowrap">
                        Nag Intern
                      </button>
                    ) : (
                      <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400 font-medium">
              Showing {(page - 1) * PER_PAGE + 1} to {Math.min(page * PER_PAGE, mockInterns.length)} of {TOTAL_ENTRIES.toLocaleString()} entries
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
                disabled={page === totalPages}
                className="p-1 border border-gray-200 rounded-md bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate("/mentor/certificates/all")}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Project Selection
        </button>
        <button
          onClick={() => navigate("/mentor/certificates/result")}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#B30000] hover:bg-[#990000] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
        >
          Generate Certificates
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}