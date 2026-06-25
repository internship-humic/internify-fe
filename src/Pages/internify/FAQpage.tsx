import api from "../../lib/api";
import { useEffect, useState } from "react";

interface FAQ {
  id: number;
  pertanyaan: string;
  jawaban: string;
  created_at: string;
}

export default function FAQPage() {
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/faq-api/get")
      .then((res) => {
        setFaq(res.data.data); // ambil array dari field "data"
      })
      .catch((err) => {
        console.error("Gagal fetch FAQ:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="page-title">FAQ</h1>
        <p className="page-title-desc">
          Quick answers to common questions about the Internify LMS platform.
        </p>
      </div>

      {/* FAQ Lists */}
      {loading ? (
        <p className="text-gray-500">Memuat FAQ...</p>
      ) : (
        <div className="space-y-8 max-w-auto">
          {faq.map((item) => (
            <div key={item.id} className="relative shadow-md group py-5 px-10 rounded-md bg-white">
              
              {/* Item Question */}
              <h2 className="text-[17px] font-bold text-[#8A0000] tracking-tight leading-snug mb-2 border-l-4 border-[#8A0000] pl-3">
                {item.pertanyaan}
              </h2>

              <p className="text-[14px] pl-8 text-[#8A0000] font-light leading-relaxed tracking-normal">
                {item.jawaban}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}