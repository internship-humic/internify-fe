import api from "../../lib/api";
import { useEffect, useState } from "react";

interface FAQ {
  id: number;
  pertanyaan: string;
  jawaban: string;
  created_at: string;
}

// Skeleton item that mirrors the real FAQ card shape
function FAQSkeleton() {
  return (
    <div className="relative shadow-md py-5 px-10 rounded-md bg-white border-l-6 border-gray-200 animate-pulse">
      {/* Question bar */}
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
      {/* Answer bars */}
      <div className="pl-8 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/faq-api/get")
      .then((res) => {
        setFaq(res.data.data);
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
        <div className="space-y-8 max-w-auto">
          {[...Array(5)].map((_, i) => (
            <FAQSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-8 max-w-auto">
          {faq.map((item) => (
            <div key={item.id} className="relative shadow-md group py-5 px-10 rounded-md bg-white border-l-6 border-red hover:shadow-xl">
              
              {/* Item Question */}
              <h2 className="text-[17px] font-bold text-red tracking-tight leading-snug mb-2">
                {item.pertanyaan}
              </h2>

              <p className="text-[14px] pl-8 text-redfont-light leading-relaxed tracking-normal">
                {item.jawaban}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}