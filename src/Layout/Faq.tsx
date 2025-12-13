import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

type FaqItem = {
  id: number;
  pertanyaan: string;
  jawaban: string;
  created_at?: string;
};

const Faq = () => {
  const location = useLocation();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqIdFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const raw = params.get("faq");
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) ? n : null;
  }, [location.search]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaq = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/faq-api/get`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );

        if (response.data?.status) {
          const items: FaqItem[] = Array.isArray(response.data.data)
            ? response.data.data
            : [];
          setFaqData(items);
        } else {
          setFaqData([]);
          setError(response.data?.message || "Gagal mengambil data FAQ.");
        }
      } catch (err: any) {
        console.error("Gagal mengambil data FAQ:", err);
        setFaqData([]);
        setError(
          err?.response?.data?.message ||
            "Terjadi kesalahan saat mengambil data FAQ."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, []);

  // Auto-scroll ke section FAQ kalau ada #faq
  useEffect(() => {
    if (location.hash === "#faq") {
      // wrapper ada di Landing: <div id="faq"><Faq/></div>
      // ini memastikan scroll halus
      const el = document.getElementById("faq");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  // Auto-open FAQ tertentu kalau ?faq=ID ada dan data sudah ke-load
  useEffect(() => {
    if (!faqIdFromUrl) return;
    if (faqData.length === 0) return;

    const idx = faqData.findIndex((f) => f.id === faqIdFromUrl);
    if (idx !== -1) {
      setOpenIndex(idx);

      // Optional: setelah open, pastikan tetap terlihat
      setTimeout(() => {
        const el = document.getElementById("faq");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, [faqIdFromUrl, faqData]);

  return (
    <div className="hero-5-section flex flex-col lg:flex-row items-start lg:items-center justify-between mt-25 px-6 md:px-16 lg:px-[150px] pb-[60px] gap-10">
      {/* UI tetap sama persis */}
      <div className="content-of-5 w-full lg:w-[610px]">
        <h2 className="font-bold text-2xl md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="font-medium text-base mt-4">
          Berikut adalah informasi mengenai pertanyaan umum seputar program magang
          di Humic, termasuk tata cara pendaftaran dan persyaratan yang perlu
          dipenuhi. Masih ada yang perlu ditanyakan? Silahkan{" "}
          <span className="text-[#C3423F] font-semibold">DM</span> kami
        </p>

        {loading && <p className="mt-4 text-sm text-gray-600">Memuat FAQ...</p>}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>

      <div className="faq-content-list space-y-6 w-full lg:w-[700px]">
        {!loading && !error && faqData.length === 0 && (
          <div className="bg-[#FAF0EF] shadow-md rounded-sm p-4">
            <p className="text-sm text-gray-700">Belum ada FAQ.</p>
          </div>
        )}

        {faqData.map((faq, index) => (
          <div
            key={faq.id ?? index}
            className="bg-[#FAF0EF] shadow-md rounded-sm"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center cursor-pointer justify-between p-4 focus:outline-none"
            >
              <span className="text-[16px] font-semibold text-left text-[#C3423F]">
                {faq.pertanyaan}
              </span>
              <span className="text-[20px] font-bold text-[#C3423F]">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            <div
              className={`px-4 pb-4 text-black transition-all duration-300 ${
                openIndex === index ? "block" : "hidden"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: faq.jawaban }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
