import { useState } from "react";
import { Download, History , Link, Award, Printer } from "lucide-react";
import { type CertificateData, type CertificateHistory } from "../../../../lib/mockData";
import certificateImg from "../../../../assets/certificate.png";

export default function CertificateAvailable({ data }: { data: CertificateData }) {
  const { certificate, history } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* LEFT: Certificate Preview + Actions */}
      <div className="w-full lg:w-4/6 flex flex-col gap-4">
        {/* Certificate Card */}
        <div className="flex rounded-xl p-10 mb-3 border border-gray-300 shadow-md items-center justify-center">
          <img
            src={certificateImg}
            alt="Certificate"
            className="rounded-xl w-[550px] h-[350px]"
          />
        </div>

        {/* Program Summary */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-800 text-sm">Ringkasan Program</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Nama Program", value: certificate.programName },
                { label: "Durasi", value: certificate.duration },
                {
                  label: "Nilai Akhir",
                  value: (
                    <span className="text-red-600 font-bold">
                      {certificate.finalScore}/100 ({certificate.grade})
                    </span>
                  ),
                },
                {
                  label: "Status",
                  value: (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {certificate.status}
                    </span>
                  ),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0"
                >
                  <span className="text-gray-500">{row.label}</span>
                  <span className="text-gray-800 font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex flex-col gap-3">

              {/* Unduh Sertifikat */}
              <button className="flex items-center justify-center gap-2 w-full bg-red-700 hover:bg-red-800 active:scale-95 transition-all text-white font-semibold py-3.5 rounded-xl text-sm">
                <Download className="w-4 h-4" />
                Unduh Sertifikat (PDF)
              </button>

              {/* Bagikan ke LinkedIn */}
              <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold py-3.5 rounded-xl text-sm">
                Bagikan ke LinkedIn
              </button>

              {/* Cetak & Salin Link */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-red-700 font-medium py-3.5 rounded-xl text-sm">
                  <Printer className="w-5 h-5" />
                  Cetak
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-red-700 font-medium py-3.5 rounded-xl text-sm"
                >
                  <Link className="w-5 h-5" />
                  {copied ? "Copied!" : "Salin Link"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Certificate History */}
      <div className="w-full lg:w-2/6 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-red-700" />
            <h3 className="font-semibold text-gray-800 text-lg">Certificate History</h3>
          </div>

          <div className="space-y-3">
            {history.map((item: CertificateHistory) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-full flex justify-center">
                  <img
                    src={certificateImg}
                    alt="Certificate"
                    className="rounded-xl h-[200px]"
                  />
                </div>
                <div className="w-full">
                  <p className="text-xs">{item.month}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Grade: {item.grade}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full my-3 flex justify-end">
            <button className="text-sm text-red-500 font-semibold hover:underline">
              See more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}