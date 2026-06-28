import { Award, Loader2, AlertCircle } from "lucide-react";
import { useMyCertificates } from "../../../hooks/useSertificates";
import type { Certificate } from "../../../types/certificate.types";
import certificateImg from "../../../assets/certificate.png";

export default function SertificateList() {
    const { certificates, loading, error } = useMyCertificates();

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="page-title">Certificate History</h1>
                <p className="page-title-desc">All your earned internship certificates</p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-sm">Loading certificates...</span>
                </div>
            )}

            {/* Error */}
            {error && !loading && (
                <div className="flex items-center justify-center py-20 text-red-500 gap-2">
                    <AlertCircle className="w-6 h-6" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && certificates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-sm">No certificates yet.</p>
                </div>
            )}

            {/* Grid */}
            {!loading && !error && certificates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certificates.map((item: Certificate) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            {/* Thumbnail */}
                            <div className="p-6 pb-0">
                                <div className="rounded-lg overflow-hidden">
                                    <img
                                        src={certificateImg}
                                        alt={item.project.project_name}
                                        className="w-full h-[160px] object-cover"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-4 py-3">
                                <p className="text-xs text-gray-400 mb-0.5">
                                    {new Date(item.issued_at).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </p>
                                <p className="text-sm font-semibold text-gray-800 leading-snug">
                                    {item.project.project_name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    No: <span className="font-bold text-red-600">{item.certificate_no}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}