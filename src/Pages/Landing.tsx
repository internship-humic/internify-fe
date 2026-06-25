import Navbar from "../Layout/Navbar";
import team from "../assets/teamwokr.jpg";
import bghero1 from "../assets/hero1.png";
import Footer from "../Layout/Footer";
import Faq from "../Layout/Faq";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Internship = {
  id: string;
  posisi: string;
  image_path: string;
  status_lowongan: string;
};

type Feedback = {
  id: number;
  nama: string;
  universitas: string;
  pesan: string;
  batch: number;
  posisi: string;
  tahun: number;
  image_path: string;
  created_at: string;
};

const Landing = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Smooth fade animation
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const FADE_MS = 450;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/internships?search=${encodeURIComponent(search)}`);
    }
  };

  // helper url image
  const getFeedbackImageUrl = (path: string) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };

  const currentFeedback = useMemo(() => {
    if (feedbacks.length === 0) return null;
    return feedbacks[displayIndex];
  }, [feedbacks, displayIndex]);

  const currentImgUrl = useMemo(() => {
    if (!currentFeedback) return "";
    return getFeedbackImageUrl(currentFeedback.image_path);
  }, [currentFeedback]);

  useEffect(() => {
    // Fetch internships
    fetch(`${import.meta.env.VITE_API_BASE_URL}/lowongan-magang-api/get`)
      .then((res) => res.json())
      .then((data) => {
        setInternships(data.data);
      })
      .catch((error) => {
        console.error("Error fetching internships:", error);
      });

    // Fetch feedback
    fetch(`${import.meta.env.VITE_API_BASE_URL}/feedback-api/get`)
      .then((res) => res.json())
      .then((data) => {
        const arr = data.data as Feedback[];
        setFeedbacks(arr);
        setActiveIndex(0);
        setDisplayIndex(0);
        setFadeIn(true);
      })
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  // Auto slide target index
  useEffect(() => {
    if (feedbacks.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbacks.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [feedbacks.length]);

  // ✅ Animasi fade 2-phase: fade-out -> switch content -> fade-in
  useEffect(() => {
    if (feedbacks.length === 0) return;
    if (activeIndex === displayIndex) return;

    // 1) fade-out konten lama
    setFadeIn(false);

    // 2) setelah fade-out selesai, ganti konten, lalu fade-in
    const t = setTimeout(() => {
      setDisplayIndex(activeIndex);

      // next frame biar browser apply dom update
      requestAnimationFrame(() => {
        setFadeIn(true);
      });
    }, FADE_MS);

    return () => clearTimeout(t);
  }, [activeIndex, displayIndex, feedbacks.length]);

  // preload gambar slide berikutnya biar next slide lebih cepat
  useEffect(() => {
    if (feedbacks.length === 0) return;

    const next = feedbacks[(activeIndex + 1) % feedbacks.length];
    const nextUrl = getFeedbackImageUrl(next.image_path);
    if (!nextUrl) return;

    const img = new Image();
    img.decoding = "async";
    img.src = nextUrl;
  }, [activeIndex, feedbacks]);

  return (
    <div className="body-landing bg-[#F8F9FA] min-h-screen">
      <div className="navbar-section py-[20px]">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div
        className="hero-section relative flex flex-col items-start justify-center h-[350px] mx-5 sm:mx-8 lg:mx-[20px] mt-[20px] rounded-2xl overflow-hidden p-5 sm:p-[30px] text-white"
        style={{
          backgroundImage: `url(${bghero1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 w-full">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[40px] text-white">
            Tingkatkan keahlian, perluas kesempatan
          </h2>
          <h2 className="font-semibold text-base sm:text-lg lg:text-[20px] text-white mt-2">
            Asah keterampilanmu dan jadilah mahasiswa yang siap bersaing di dunia
            industri
          </h2>

          <div className="search-section bg-white p-[15px] rounded-xl shadow-md w-full max-w-lg mt-[40px] text-black">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari program magang atau pelatihan..."
                className="flex-1 outline-none text-[16px] px-3 py-2"
              />
              <svg
                className="w-7 h-7 text-red-700 cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                onClick={() => {
                  if (search.trim())
                    navigate(`/internships?search=${encodeURIComponent(search)}`);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
                />
              </svg>
            </form>
          </div>
        </div>
      </div>

      {/* Hero 2 Section */}
      <div className="hero2-section flex flex-col lg:flex-row items-center mx-5 sm:mx-[20px] mt-[50px] rounded-2xl justify-between overflow-hidden relative">
        <div className="text-section w-full lg:w-[700px] z-10 px-5 sm:px-[30px] py-6 sm:py-[40px]">
          <h2 className="font-bold text-2xl sm:text-[32px] mb-4">
            Life at Humic Engineering
          </h2>
          <p className="font-medium text-base sm:text-[16px]">
            Raih pengalaman internship yang bernilai dengan berkontribusi langsung
            dalam pengembangan solusi teknologi kami. Kembangkan kompetensi Anda
            melalui keterlibatan nyata dalam proyek IT serta bimbingan langsung
            dari para expert di bidang Software engineering dan IoT.
          </p>
        </div>

        <div className="image-section w-full lg:w-[70rem] h-[300px] lg:h-full relative mt-5 lg:mt-0">
          <img src={team} alt="Team" className="w-full h-full object-cover" />
          <div className="absolute left-0 top-0 w-full h-full lg:bg-gradient-to-r from-[#F8F9FA] via-white/60 to-transparent "></div>
        </div>
      </div>

      {/* Hero 3 Section */}
      {feedbacks.length > 0 && currentFeedback && (
        <div className="hero-3-section mx-5 lg:mx-[80px] xl:mx-[140px] mt-[60px] rounded-2xl bg-[#F8F9FA]">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch py-10 px-4 sm:px-8">
            {/* LEFT: image */}
            <div className="relative flex-1 min-h-[320px] lg:min-h-[380px] flex items-center justify-center">
              <div
                className={`w-[230px] h-[320px] sm:w-[260px] sm:h-[340px] lg:w-[280px] lg:h-[360px]
                            rounded-xl shadow-xl bg-white/70 backdrop-blur p-3 flex items-center justify-center
                            transition-opacity duration-[450ms] ease-in-out
                            ${fadeIn ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  key={currentImgUrl}
                  src={currentImgUrl}
                  alt={currentFeedback.nama}
                  loading="eager"
                  decoding="async"
                  // @ts-ignore
                  fetchpriority="high"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* RIGHT: text */}
            <div
              className={`flex-1 flex flex-col justify-between transition-opacity duration-[450ms] ease-in-out
                          ${fadeIn ? "opacity-100" : "opacity-0"}`}
            >
              <div>
                <h2 className="font-bold text-2xl sm:text-[32px] text-[#111827]">
                  Kata mereka tentang Humic Engineering
                </h2>

                <p
                  className="font-medium text-base sm:text-[16px] text-[#4B5563] mt-4 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: currentFeedback.pesan,
                  }}
                />

                <p className="mt-5 text-[16px] text-[#C3423F] font-semibold">
                  {currentFeedback.nama},{" "}
                  <span className="font-normal text-[#6B7280]">
                    {currentFeedback.posisi} · Humic Internship Batch{" "}
                    {currentFeedback.batch} {currentFeedback.tahun}
                  </span>
                </p>

                <p className="mt-1 text-sm text-[#9CA3AF]">
                  {currentFeedback.universitas}
                </p>
              </div>

              <div className="mt-8" />
            </div>
          </div>
        </div>
      )}

      {/* Hero 4 Section */}
      <div className="hero4-section flex flex-col justify-center items-center mt-[50px]">
        <h2 className="font-bold text-2xl sm:text-[32px] text-center">
          Jelajahi posisi yang kamu inginkan
        </h2>

        <div className="card-container mt-[110px] flex flex-wrap items-center justify-center gap-10 sm:gap-[60px] xl:gap-[80px] mx-3 sm:mx-[10px]">
          {internships.map((intern) => {
            const isClosed = intern.status_lowongan === "ditutup";

            return (
              <div
                key={intern.id}
                className={`relative w-64 h-64 rounded-xl overflow-hidden shadow-lg transform transition duration-300 ${
                  isClosed
                    ? "cursor-not-allowed grayscale"
                    : "cursor-pointer hover:scale-105"
                }`}
                onClick={() => {
                  if (!isClosed) {
                    navigate(`/details/${intern.id}`);
                  }
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL}${intern.image_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />

                <div
                  className={`relative z-10 flex flex-col justify-end h-full p-4 ${
                    isClosed ? "text-gray-400" : "text-white"
                  }`}
                >
                  <div className="font-semibold text-[20px] leading-[30px]">
                    {intern.posisi}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero 5 Section FaQ */}
      <div id="faq">
        <Faq />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
