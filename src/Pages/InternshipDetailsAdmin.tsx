import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import axios from "axios";

const InternshipDetailsAdmin = () => {
  const { id } = useParams(); // id lamaran magang
  const [applicant, setApplicant] = useState<any>(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/lamaran-magang-api/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setApplicant(res.data.data[0]);
      })
      .catch((err) => {
        console.error("Gagal fetch detail lamaran", err);
      });
  }, [id]);

  const handleStatusUpdate = (status: "diterima" | "ditolak") => {
    axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/lamaran-magang-api/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert(`Status berhasil diubah menjadi ${status}`);
        setApplicant((prev: any) => ({ ...prev, status }));
      })
      .catch((err) => {
        console.error("Gagal update status", err);
      });
  };

  if (!applicant) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="container-header flex flex-row items-center justify-between mb-10">
            <h2 className="text-[24px] font-semibold">Detail Pelamar</h2>
            {/* Status Indikator */}
            <div className="mt-10">
              <span
                className={`px-4 py-2 rounded-lg text-white font-semibold ${
                  applicant.status === "diterima"
                    ? "bg-green-500"
                    : applicant.status === "ditolak"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {applicant.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-[24px] font-semibold">
                {applicant.nama_depan} {applicant.nama_belakang}
              </h2>
              <p className="text-[#747474]">{applicant.email}</p>
              <p className="text-[#747474]">{applicant.kontak}</p>
            </div>

            {/* Status Button */}
            <div className="flex gap-3">
              <button
                onClick={() => handleStatusUpdate("diterima")}
                className="bg-[#3BB525] hover:bg-green-600 cursor-pointer text-white px-3 py-2 rounded-xl"
              >
                Terima
              </button>
              <button
                onClick={() => handleStatusUpdate("ditolak")}
                className="bg-[#C3423F] hover:bg-red-600 cursor-pointer text-white px-3 py-2 rounded-xl"
              >
                Tolak
              </button>
            </div>
          </div>

          {/* Detail */}
          <div className="flex gap-[200px] mb-12">
            <div className="flex flex-col gap-4">
              <p>
                <span className="font-semibold">Jurusan:</span>{" "}
                {applicant.jurusan}
              </p>
              <p>
                <span className="font-semibold">Posisi yang dilamar:</span>{" "}
                {applicant.posisi}
              </p>
              <div className="flex gap-2 items-center">
                <h2 className="font-semibold">Skill:</h2>
                {applicant.relevant_skills
                  .split(",")
                  .map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[#9F9F9F] font-semibold px-3 py-1 border border-[#9F9F9F] rounded-3xl"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>

            {/* CV & Portofolio */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">CV:</h2>
                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}${
                    applicant.cv_path
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D78108] text-white px-4 py-2 rounded-xl"
                >
                  Lihat CV
                </a>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Portofolio:</h2>
                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}${
                    applicant.portofolio_path
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#995010] text-white px-4 py-2 rounded-xl"
                >
                  Lihat Portofolio
                </a>
              </div>
            </div>
          </div>

          {/* Motivasi */}
          <div>
            <h2 className="font-semibold mb-3">Motivasi</h2>
            <p className="leading-7">{applicant.motivasi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsAdmin;
