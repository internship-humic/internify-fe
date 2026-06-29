import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, UploadCloud, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useUploadCertificateTemplate } from "../../../hooks/useSertificates";
import { useProjectDetail } from "../../../hooks/useProjects";
import EligibleInternTable from "./components/EligibleInternTable";
import { useProjectInternProgress } from "../../../hooks/useInternProgress"

export default function CertificateDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, error } = useProjectDetail(slug ?? "");
  const { upload, loading: uploading, error: uploadError } = useUploadCertificateTemplate();
  const { data: internProgress, loading: progressLoading } = useProjectInternProgress(slug ?? "");
  const eligibleCount = internProgress.filter(i => i.is_eligible).length;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile || !project) return;
    const result = await upload(project.id, selectedFile);
    if (result) {
      setUploadSuccess(true);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Memuat data project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <XCircle className="w-10 h-10 text-red-400" />
        <p className="text-gray-500 text-sm">{error ?? "Project tidak ditemukan."}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-[#B30000] font-semibold hover:underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 items-start">
        {/* ── Left Column ── */}
        <div className="space-y-4 lg:col-span-3">
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {project.project_name}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <CalendarDays className="w-4 h-4 flex-shrink-0" />
            {new Date(project.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            {" — "}
            {new Date(project.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </div>

          {/* ── Upload Template ── */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">
              Certificate Template
            </label>

            {/* Drop Zone */}
            <div
              className="border-2 border-dashed border-card-outline bg-primary-foreground rounded-xl p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-red-50/20 transition-colors group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-5 h-5 text-[#B30000]" />
              </div>
              {selectedFile ? (
                <>
                  <p className="text-xs font-bold text-gray-800 truncate max-w-[180px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold text-gray-800">Upload Certificate Image</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Feedback */}
            {uploadSuccess && (
              <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Template berhasil diupload!
              </div>
            )}
            {uploadError && (
              <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
                <XCircle className="w-4 h-4" />
                {uploadError}
              </div>
            )}

            {/* Upload Button */}
            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 py-2 bg-[#B30000] hover:bg-red-800 disabled:opacity-60 text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload Template
                  </>
                )}
              </button>
            )}
          </div>

          {/* ── Project Scope ── */}
          <div className="border border-card-outline rounded-xl p-5">
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Project Scope
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-card-outline rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[#B30000]">{project.total_members}</p>
              <p className="text-xs text-font font-medium mt-0.5">Total Interns</p>
            </div>
            <div className="border border-card-outline rounded-xl p-4">
              <p className="text-2xl font-extrabold text-gray-900">{eligibleCount}</p>
              <p className="text-xs text-font font-medium mt-0.5">Eligible</p>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <EligibleInternTable
          interns={internProgress}
          loading={progressLoading}
          eligibleCount={eligibleCount}
        />
      </div>
    </div>
  );
}