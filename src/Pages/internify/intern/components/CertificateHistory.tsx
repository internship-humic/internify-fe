import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import { type CertificateHistory, history as certificateHistory } from "../../../../lib/mockSertificates";
import certificateImg from "../../../../assets/certificate.png";

export default function SertificateHistory() {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-red-700" />
                <h3 className="font-semibold text-gray-800 text-lg">Certificate History</h3>
            </div>

            <div className="space-y-3">
                {certificateHistory.slice(0, 2).map((item: CertificateHistory) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <div className="w-full flex justify-center">
                            <img
                                src={certificateImg}
                                alt="Certificate"
                                className="rounded-xl h-[150px] w-[150px] w-full object-cover"
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-xs text-gray-400">{item.month}</p>
                            <p className="text-sm font-semibold text-gray-800 leading-tight">{item.title}</p>
                            <p className="text-sm text-gray-500">Grade: {item.grade}</p>
                        </div>
                    </div>
                ))}
            </div>

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