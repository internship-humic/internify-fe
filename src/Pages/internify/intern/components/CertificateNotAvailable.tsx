import { Lock, Clock } from "lucide-react";

export default function CertificateNotAvailable({ progress, remainingTasks }: { progress: number; remainingTasks: number }) {
  return (
    <div className="bg-white w-full rounded-2xl border border-gray-100 shadow-sm py-16 p-23 flex flex-col items-center text-center max-w-3/5 mx-auto z-10">
      {/* Icon */}
      <div className="relative mb-6">
        <div className=" w-33 h-33 border-2 border-dashed border-gray-600 rounded-xl flex justify-center items-center">

        <div className="w-20 h-20 flex items-center rounded-lg justify-center bg-gray-300">
          <Lock className="w-10 h-10 text-red-700" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-500 rounded- flex items-center justify-center shadow-md">
          <Clock className="w-4 h-4 text-yellow-800" />
        </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">Sertifikat Belum Tersedia</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        Anda harus menyelesaikan semua tugas proyek sebelum dapat mengunduh sertifikat kelulusan.
        Silakan periksa kembali progres tugas Anda di menu Proyek.
      </p>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progres Proyek</span>
          <span className="text-sm font-bold text-red-700">{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
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