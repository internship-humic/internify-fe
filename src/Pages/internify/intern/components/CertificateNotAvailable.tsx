import { Lock, Clock } from "lucide-react";

export default function CertificateNotAvailable({ progress, remainingTasks }: { progress: number; remainingTasks: number }) {
  return (
    <div className="bg-white w-full h-full rounded-2xl border border-gray-100 shadow-sm px-24 flex flex-col items-center justify-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className=" w-45 h-45 border-2 border-dashed border-gray-600 rounded-xl flex justify-center items-center">

          <div className="w-30 h-30 flex items-center rounded-lg justify-center bg-gray-300">
            <Lock className="w-16 h-16 text-red-700" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-amber-500 rounded- flex items-center justify-center shadow-md">
            <Clock className="w-5 h-5 text-yellow-800" />
          </div>
        </div>
      </div>

      <h2 className="text-[37px] font-bold text-gray-900 mb-3">Sertifikat Belum Tersedia</h2>
      <p className="text-gray-500 text-[17px] mb-6">
        Anda harus menyelesaikan <span className="font-bold text-red-600">semua tugas proyek</span> sebelum dapat mengunduh sertifikat kelulusan.
        Silakan periksa kembali progres tugas Anda di menu Proyek.
      </p>

      {/* Progress Bar */}
      <div className="w-1/3">
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
        <p className="text-xs text-gray-400 mt-2 text-left">
          Selesaikan {remainingTasks} tugas lagi untuk membuka akses.
        </p>
      </div>
    </div>
  );
}