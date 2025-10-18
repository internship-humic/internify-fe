import Navbar from "../Layout/Navbar";
import bghero1 from "../assets/hero2about.png";
import bghero2 from "../assets/hero1about.png";
import bghero3 from "../assets/hero3about.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";
import { useEffect } from "react";

const missions = [
  "Becoming the science and technology excellent center in the field of embedded sensor systems to support biomedical applications based on the Internet of Things (IoT).",
  "Becoming the science and technology excellent center on development remote health monitoring systems based on Internet of Things (IoT).",
  "Becoming the science and technology excellent center on Big Data Analytic.",
  "Becoming the science and technology excellent center on health development of Information and Communication Technology (ICT).",
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [partners, setPartners] = useState<Partner[]>([]);
  const [hasPartner, setHasPartner] = useState(true);
  const [researchProducts, setResearchProducts] = useState<ResearchProduct[]>(
    []
  );

  type Partner = {
    id: number;
    nama_partner: string;
    image_path: string;
  };
  type ResearchProduct = {
    id: number;
    nama_project: string;
    image_path: string;
  };

  const slides = [
    {
      image: bghero1,
      title: "About Us",
      description:
        "Research Center Human Centric Engineering (RC HUMIC), merupakan pusat penelitian Telkom University yang berfokus pada pengembangkan rekayasa teknologi yang berkaitan dengan dukungan aktivitas manusia sehari-hari seperti bidang komputasi, informatika, elektronika, robotik, mekanikal, dan teknik biomedis.",
    },
    {
      image: bghero2,
      title: "Visi",
      description:
        "To become an excellent research center in the field of engineering to improve the human health and prosperity",
    },
    {
      image: bghero3,
      title: "Misi",
      description:
        "1. Becoming the science and technology excellent center in the field of embedded sensor systems to support biomedical applications based on the Internet of Things (IoT). 2. Becoming the science and technology excellent center on development remote health monitoring systems based on Internet of Things (IoT).",
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIndex];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = researchProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(researchProducts.length / itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/hasil-research-api/get`)
      .then((res) => res.json())
      .then((data) => {
        setResearchProducts(data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data hasil research:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/partnership-api/get`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No partnership data") {
          setHasPartner(false);
        } else {
          setPartners(data.data);
          setHasPartner(true);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch partnership data:", error);
        setHasPartner(false);
      });
  }, []);

  return (
    <div className="body-of-aboutus bg-[#F8F9FA] min-h-screen">
      {/* Navbar Section */}
      <div className="navbar-section py-5">
        <Navbar />
      </div>

      {/* Hero Section 1 */}
      <div
        className="hero-section relative flex flex-col items-start justify-end
                   h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]
                   mx-5 sm:mx-[25px] mt-5 rounded-2xl overflow-hidden p-6 sm:p-10 md:p-14 text-white transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${currentSlide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-90 z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-full">
          <div className="container-of-content flex flex-col md:flex-row items-start md:items-end md:justify-between gap-6 md:gap-0">
            <div className="right-section max-w-full md:max-w-[670px]">
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                {currentSlide.title}
              </h2>
              {/* Mission Control */}
              {currentSlide.title === "Misi" ? (
                <ol className="list-decimal pl-5 space-y-2 font-normal text-sm sm:text-base md:text-lg mt-3 text-white">
                  {missions.map((mission, index) => (
                    <li key={index}>{mission}</li>
                  ))}
                </ol>
              ) : (
                <p className="font-normal text-sm sm:text-base md:text-lg mt-3 text-white">
                  {currentSlide.description}
                </p>
              )}
            </div>

            {/* Arrow Controls */}
            <div className="left-section flex flex-row items-center gap-6">
              <button
                onClick={prevSlide}
                className="icon-1-right bg-white rounded-full p-2 sm:p-3 md:p-4 hover:bg-gray-200 transition cursor-pointer"
                aria-label="Previous Slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="icon-1-right bg-white rounded-full p-2 sm:p-3 md:p-4 hover:bg-gray-200 transition cursor-pointer"
                aria-label="Next Slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section 2 Partnership */}
      {hasPartner && (
        <div className="hero-2-partnership bg-[#FAF0EF] flex flex-col md:flex-row items-center justify-between mt-12 px-5 sm:px-20 py-16">
          <div className="caption-hero-2 flex flex-col items-start w-full md:w-[540px] mb-8 md:mb-0">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
              Partnership
            </h2>
            <h2 className="font-normal text-sm sm:text-base mt-2">
              Kami bersama-sama menciptakan solusi yang memberdayakan bisnis dan
              meningkatkan efisiensi operasional.
            </h2>
          </div>
          <div className="image-hero-2 flex flex-row flex-wrap justify-start md:justify-center items-center gap-6 md:gap-12 max-w-full md:max-w-[700px]">
            {partners.map((partner) => (
              <img
                key={partner.id}
                src={`${import.meta.env.VITE_API_BASE_URL}${
                  partner.image_path
                }`}
                alt={`Partnership ${partner.nama_partner}`}
                className="w-16 sm:w-20 md:w-24"
              />
            ))}
          </div>
        </div>
      )}

      {/* Hero section 3 */}
      <div className="hero-3-research-product mt-12 px-5 sm:px-20">
        <div className="title-container flex flex-row justify-between items-center mb-6">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            Hasil Produk Research
          </h2>
          <div className="arrow-container flex flex-row items-center gap-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="left bg-[#C3423F] p-2 sm:p-3 rounded-full hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
              aria-label="Previous research product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="right bg-[#C3423F] p-2 sm:p-3 rounded-full hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
              aria-label="Next research product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hero section 3 content */}
      <div className="hero-3-section-content px-5 sm:px-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/details-product/${item.id}`)}
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${item.image_path}`}
                alt={item.nama_project}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-start">
                <p className="font-semibold text-base sm:text-lg line-clamp-2">
                  {item.nama_project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
