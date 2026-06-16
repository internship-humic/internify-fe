import { Award } from "lucide-react";
import { history, type CertificateHistory } from "../../../lib/mockSertificates";
import certificateImg from "../../../assets/certificate.png";

export default function SertificateList() {
    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="page-title">Certificate History</h1>
                <p className="page-title-desc">All your earned internship certificates</p>
            </div>

            {/* Grid */}
            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Award className="w-12 h-12 mb-3 opacity-40" />
                    <p className="text-sm">No certificates yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {history.map((item: CertificateHistory) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            {/* Thumbnail */}
                            <div className="p-6 pb-0">
                                <div className="rounded-lg overflow-hidden">
                                    <img
                                        src={certificateImg}
                                        alt={item.title}
                                        className="w-full h-[160px] object-cover"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-4 py-3">
                                <p className="text-xs text-gray-400 mb-0.5">{item.month}</p>
                                <p className="text-sm font-semibold text-gray-800 leading-snug">{item.title}</p>
                                <p className="text-xs text-gray-500 mt-1">Grade: <span className="font-bold text-red-600">{item.grade}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}