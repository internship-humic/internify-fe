// CertificateNotAvailable.tsx
import { Clock, Lock, Award } from "lucide-react";

interface CertificateNotAvailableProps {
  progress: number;
  remainingTasks: number;
  allTasksDone?: boolean;
  onClaim: () => void;
  claiming: boolean;
  claimError: string | null;
}

export default function CertificateNotAvailable({
  progress,
  remainingTasks,
  allTasksDone = false,
  onClaim,
  claiming,
  claimError,
}: CertificateNotAvailableProps) {
  return (
    <div className="bg-box-primary w-full h-full rounded-2xl border border-box-border shadow-sm px-24 py-12 flex flex-col items-center justify-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-34 h-34 border-2 border-dashed border-gray-600 rounded-xl flex justify-center items-center">
          <div className="w-26 h-26 flex items-center rounded-lg justify-center bg-gray-300">
            {allTasksDone ? (
              <Award className="w-12 h-12 text-green-600" />
            ) : (
              <Lock className="w-12 h-12 text-red-700" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-amber-500 rounded- flex items-center justify-center shadow-md">
            <Clock className="w-4 h-4 text-yellow-800" />
          </div>
        </div>
      </div>

      {allTasksDone ? (
        <>
          <h2 className="text-[37px] font-bold text-gray-900 mb-3">Selamat!</h2>
          <p className="text-gray-500 text-[17px] mb-6 text-center">
            Semua tugas proyek telah selesai. Silahkan tunggu Mentor untuk{" "}
            <span className="font-bold text-green-600">Mempublish Sertifikat</span> kelulusan Anda.
          </p>

          {/* Progress Bar — 100% */}
          <div className="w-1/3 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Progres Proyek</span>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-700 w-full" />
            </div>
          </div>
          <button
            onClick={onClaim}
            disabled={claiming}
            className="mt-0 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {claiming ? "Memproses..." : "Klaim Sertifikat"}
          </button>
          {claimError && <p className="text-red-500 text-sm mt-2">{claimError}</p>}
        </>
      ) : (
        <>
          <h2 className="text-[28px] font-bold text-gray-900 mb-3">Sertifikat Belum Tersedia</h2>
          <p className="text-gray-500 text-[15px] mb-6 text-center">
            Anda harus menyelesaikan <span className="font-bold text-red-600">semua tugas proyek</span> sebelum dapat mengunduh sertifikat kelulusan.
            Silakan periksa kembali progres tugas Anda di menu Proyek.
          </p>

          {/* Progress Bar */}
          <div className="w-1/3">
            <p className="text-xs text-font mt-2">
              Selesaikan {remainingTasks} tugas lagi untuk membuka akses.
            </p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Progres Proyek</span>
              <span className="text-sm font-bold text-red-700">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-700 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}