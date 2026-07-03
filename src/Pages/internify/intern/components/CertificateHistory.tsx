import { useNavigate } from "react-router-dom";
import { History, Loader2, AlertCircle } from "lucide-react";
import type { Certificate } from "../../../../types/certificate.types";
import { useMyCertificates } from "../../../../hooks/useCertificates";

export default function SertificateHistory() {
    const navigate = useNavigate();
    const { certificates, loading, error } = useMyCertificates();
    const displayed = certificates.slice(0, 2);

    return (
        <div className="bg-box-primary rounded-2xl border border-box-border shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-red-700" />
                <h3 className="font-semibold text-gray-800 text-lg">Certificate History</h3>
            </div>

            {loading && (
                <div className="flex items-center justify-center py-8 text-gray-400 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading certificates...</span>
                </div>
            )}

            {error && !loading && (
                <div className="flex items-center gap-2 py-6 text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {!loading && !error && displayed.length === 0 && (
                <p className="text-sm text-gray-400 py-6 text-center">No certificates yet.</p>
            )}

            {!loading && !error && displayed.length > 0 && (
                <div className="space-y-3">
                    {displayed.map((item: Certificate) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <div className="w-full">
                                <p className="text-xs text-gray-400">
                                    {new Date(item.issued_at).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </p>
                                <p className="text-sm font-semibold text-gray-800 leading-tight">
                                    {item.project.project_name}
                                </p>
                                <p className="text-sm text-gray-500">No: {item.certificate_no}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="w-full my-3 flex justify-end">
                <button
                    onClick={() => navigate('/intern/certificates/all')}
                    className="text-sm text-red-700 font-semibold hover:underline"
                >
                    See more
                </button>
            </div>
        </div>
    );
}