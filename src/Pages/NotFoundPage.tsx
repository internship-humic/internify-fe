import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-150 via-slate-300 to-gray-50 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-700 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">

        {/* 404 Large Text */}
        <div className="relative mb-4 select-none">
          <span className="text-[160px] sm:text-[200px] font-black leading-none bg-gradient-to-b from-red to-red/60 bg-clip-text text-transparent">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-red/60 mb-3 tracking-tight">
          Tidak Ditemukan
        </h1>

        {/* Description */}
        <p className="text-slate-800 text-base sm:text-lg mb-10 max-w-md leading-relaxed">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke jalur yang benar.
        </p>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-10" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-red/60 bg-white/30 hover:bg-white/15 text-red-700 font-semibold text-sm transition-all active:scale-95 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-red-900/40"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-slate-600 text-xs">
          Internify &copy; {new Date().getFullYear()} — HUMIC Engineering
        </p>
      </div>
    </div>
  );
}
