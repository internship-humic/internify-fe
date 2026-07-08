// src/pages/mentor/EligibleInternTable.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Loader2
} from "lucide-react";
import type { InternSubmissionProgress } from "../../../../hooks/useInternProgress";
import JSZip from "jszip";
import { generateCertificate, resolveImageUrl } from "../../../utils/SertificateGenerator";
import { useGenerateCertificates } from "../../../../hooks/useCertificates";
import Avatar from "../../Avatar";
import ProgressBar from "../../ProgressBar";
import { customToast } from "../../../utils/showToast";
import type { Project } from "../../../../types/project.types";

interface EligibleInternTableProps {
  interns: InternSubmissionProgress[];
  loading: boolean;
  eligibleCount: number;
  project: Project
}

const PER_PAGE = 5;

const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatDateIndo(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${BULAN_ID[month - 1]} ${year}`;
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDateIndo(startDate)} - ${formatDateIndo(endDate)}`;
}

function StatusBadge({ status }: { status: boolean }) {
  return (
    <div className={`flex items-center gap-1 text-[11px] font-extrabold tracking-wide ${status ? "text-green-600" : "text-orange-500"}`}>
      {status
        ? <CheckCircle2 className="w-3.5 h-3.5" />
        : <AlertCircle className="w-3.5 h-3.5" />}
      {status ? "Eligible" : "Incomplete"}
    </div>
  );
}

// Main Component
export default function EligibleInternTable({
  interns,
  loading,
  eligibleCount,
  project
  // Durasi tanggal Proyek
}: EligibleInternTableProps) {
  const navigate = useNavigate();
  const { generate: SubmitCertificates } = useGenerateCertificates();

  const initialSelected = new Set(
    interns.filter(i => i.is_eligible).map(i => i.id_user)
  );
  const [selected, setSelected] = useState<Set<number>>(initialSelected);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(interns.length / PER_PAGE);
  const paginated = interns.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const eligibleIds = interns.filter(i => i.is_eligible).map(i => i.id_user);
  const allEligibleSelected = eligibleIds.every(id => selected.has(id));

  const toggleSelectAll = () => {
    setSelected(allEligibleSelected ? new Set() : new Set(eligibleIds));
  };

  const toggleOne = (id: number, isEligible: boolean) => {
    if (!isEligible) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!project?.certificate_template) {
      customToast.error("Template belum ada", "Template sertifikat belum diupload.");
      return;
    }
    if (selected.size === 0) {
      customToast.error("Tidak ada intern dipilih", "Pilih minimal satu intern untuk generate sertifikat.");
      return;
    }

    setGenerating(true);
    setGenerateError(null);

    const ok = await customToast.promise(
      (async () => {
        const result = await SubmitCertificates(project.id, Array.from(selected));
        if (!result) throw new Error("Tidak ada data sertifikat yang dikembalikan.");

        const zip = new JSZip();
        const templateUrl = resolveImageUrl(project.certificate_template!);

        const duration = formatDateRange(project.start_date, project.end_date);
        
        await Promise.all(
          result.map(async (cert) => {
            const verifyUrl = `${window.location.origin}/verify-certificate/${cert.uuid}`;
            const blob = await generateCertificate(
              templateUrl,
              cert.user.full_name,
              cert.project.project_name,
              cert.certificate_no,
              verifyUrl,
              duration
            );
            zip.file(`Sertifikat - ${cert.user.full_name}.png`, blob);
          })
        );
      })(),
      {
        loading: "Generating sertifikat...",
        success: () => ({
          title: "Sertifikat berhasil dibuat",
          description: `${selected.size} sertifikat berhasil digenerate.`,
        }),
        error: (err) => ({
          title: "Gagal generate sertifikat",
          description: err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.",
        }),
      }
    ).then(() => true).catch(() => false);

    setGenerating(false);
    if (ok) navigate(`/mentor/certificates/${project.id}/result`);
  };

  if (loading) {
    return (
      <div className="lg:col-span-5 flex items-center justify-center py-20 text-gray-400 text-sm">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Memuat data intern...
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      {/* Roster Card */}
      <div className="border border-box-border rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Intern Roster</h3>
            <p className="text-xs text-gray-400 mt-0.5 leading-snug max-w-xs">
              Confirm completion status before final certificate generation.
            </p>
          </div>
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors flex-shrink-0 ml-4"
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${allEligibleSelected ? "bg-[#B30000] border-[#B30000]" : "border-gray-300"
              }`}>
              {allEligibleSelected && (
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              )}
            </div>
            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
              Select All Eligible ({eligibleCount})
            </span>
          </button>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-[16px_1fr_96px_88px_60px] items-center gap-x-3 px-5 py-2.5 bg-gray-50/70 border-b border-gray-100">
          <div />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Intern Name</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Task Progress</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Action</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {paginated.map((intern) => {
            const isChecked = selected.has(intern.id_user);
            const isIncomplete = !intern.is_eligible;
            const initials = intern.full_name
              .split(" ")
              .slice(0, 2)
              .map(n => n[0])
              .join("")
              .toUpperCase();
            return (
              <div
                key={intern.id_user}
                className="grid grid-cols-[16px_1fr_96px_88px_60px] items-center gap-x-3 px-5 py-3.5 hover:bg-gray-50/40 transition-colors"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleOne(intern.id_user, intern.is_eligible)}
                  disabled={isIncomplete}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isIncomplete
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                    : isChecked
                      ? "bg-[#B30000] border-[#B30000]"
                      : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {isChecked && !isIncomplete && (
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  )}
                </button>

                {/* Name + role */}
                <div className="flex items-center gap-3">
                  {intern.avatar ? (
                    <img src={intern.avatar} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <Avatar initials={initials} />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-900">{intern.full_name}</p>
                    <p className="text-[11px] text-gray-400">{intern.email}</p>
                  </div>
                </div>

                {/* Task Progress */}
                <div className="flex justify-center">
                  <ProgressBar value={intern.submitted} total={intern.total_tasks} />
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <StatusBadge status={intern.is_eligible} />
                </div>

                {/* Action */}
                <div className="flex justify-center">
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
            Showing {(page - 1) * PER_PAGE + 1} to {Math.min(page * PER_PAGE, interns.length)} of {interns.length} entries
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
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${n === page
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

      {generateError && (
        <p className="text-xs text-red-500 font-medium text-right">{generateError}</p>
      )}

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between">
        <button
          className="text-gray-700 hover:underline"
          onClick={() => navigate(`/mentor/certificates/${project?.slug}/result`)}>
          Ke Hasil
        </button>
        <button
          onClick={handleGenerate}
          disabled={generating || selected.size === 0}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#B30000] hover:bg-red-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Certificates
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>

      </div>
    </div>
  );
}
