import { useEffect, useState } from "react";
import axios from "axios";
import bghero2 from "../assets/hero1about.png";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Internships = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  type Internship = {
    id: string;
    title: string;
    location: string;
    category: string;
    status: string;
    statusColor: string;
    isPaid: boolean;
  };

  const [internships, setInternships] = useState<Internship[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/lowongan-magang-api/get/kelompok-all`
      )
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => {
        console.error("Gagal mengambil kategori:", err);
      });
  }, []);

  useEffect(() => {
    const fetchInternships = () => {
      const url = selectedCategory
        ? `${
            import.meta.env.VITE_API_BASE_URL
          }/lowongan-magang-api/get/kelompok/${selectedCategory}`
        : `${import.meta.env.VITE_API_BASE_URL}/lowongan-magang-api/get`;

      axios
        .get(url)
        .then((response) => {
          const result = response.data.data.map((item: any) => ({
            id: item.id,
            title: item.posisi,
            location: item.lokasi,
            category: item.kelompok_peminatan,
            status: item.status_lowongan === "dibuka" ? "Opened" : "Closed",
            statusColor:
              item.status_lowongan === "dibuka" ? "#4EAD00" : "#C3423F",
            isPaid: item.paid === "paid",
          }));
          setInternships(result);
        })
        .catch((error) => {
          console.error("Failed to fetch internships:", error);
        });
    };

    fetchInternships();

    const interval = setInterval(() => {
      fetchInternships();
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const filteredInternships = internships.filter(
    (intern) =>
      intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const param = searchParams.get("search") || "";
    setSearchTerm(param);
  }, [searchParams]);
  return (
    <div className="interships-container-body bg-[#F8F9FA] min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[90vh] text-white"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0,0,0,0)), url(${bghero2})`,
        }}
      >
        <div className="absolute py-[20px] top-0 left-0 w-full z-10 text-black">
          <Navbar />
        </div>

        <div className="flex items-center justify-center h-full px-4 pt-[90px] md:pt-[300px] text-center">
          <div>
            <h1 className="text-[32px] md:text-5xl font-bold mb-4">
              Cari internship
            </h1>
            <p className="mb-6 max-w-[700px] mx-auto text-[20px] md:text-base">
              Berikut merupakan daftar internship yang sedang dibuka. Harap
              untuk memperhatikan syarat dan ketentuan untuk setiap posisi yang
              tersedia.
            </p>

            {/* Search Box */}
            <div className="search-section bg-white p-[15px] rounded-xl shadow-md w-full mt-[40px] text-black">
              <form className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Cari program magang atau pelatihan..."
                  className="flex-1 outline-none text-[16px] px-3 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="w-7 h-7 text-red-700 cursor-not-allowed"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"
                  />
                </svg>
              </form>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap mt-[20px] gap-4 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? "" : category
                    )
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${
                    selectedCategory === category
                      ? "bg-[#C3423F] text-white border-[#C3423F]"
                      : "bg-[#FAF0EF] text-[#C3423F] border-[#C3423F] hover:bg-[#C3423F] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Internship List */}
      <div className="hero-of-list-internships flex flex-col px-[10px] lg:px-[300px] pt-[50px] gap-[30px] pb-[50px]">
        {filteredInternships.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada data.</p>
        ) : (
          filteredInternships.map((intern, index) => (
            <div
              key={index}
              className={`card-1 flex flex-col items-start p-5 lg:p-7 rounded-xl shadow-2xl ${
                intern.status === "Opened"
                  ? "bg-white cursor-pointer hover:shadow-xl transition"
                  : "bg-gray-200 cursor-not-allowed opacity-60"
              }`}
              onClick={() => {
                if (intern.status === "Opened") {
                  navigate(`/details/${intern.id}`);
                }
              }}
            >
              <div className="head-indicator flex flex-row justify-between items-center w-full">
                <h2 className="font-bold text-[18px] lg:text-[24px]">
                  {intern.title}
                </h2>
                <h2
                  className="p-2 border-2 text-[12px] lg:text-[14px] font-bold rounded-4xl"
                  style={{
                    backgroundColor:
                      intern.status === "Opened" ? "#F6FFF4" : "#FAF0EF",
                    color: intern.statusColor,
                    borderColor: intern.statusColor,
                  }}
                >
                  {intern.status}
                </h2>
              </div>

              <div className="caption-content mt-4 flex flex-row items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2">
                  {/* Lokasi */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 lg:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />{" "}
                  </svg>
                  <h2 className="text-[14px] lg:text-[16px]">
                    {intern.location}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Kategori */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 lg:size-6"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />{" "}
                  </svg>
                  <h2 className="text-[14px] lg:text-[16px]">
                    {intern.category}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Paid */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 lg:size-6"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />{" "}
                  </svg>
                  <h2 className="text-[14px] lg:text-[16px]">
                    {intern.isPaid ? "Paid" : "Unpaid"}
                  </h2>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Internships;
