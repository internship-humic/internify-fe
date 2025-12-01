import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Applicant = {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  kontak: string;
  jurusan: string;
  motivasi: string;
  relevant_skills: string;
  cv_path: string;
  portofolio_path: string;
  posisi: string;
  kelompok_peminatan?: string;
  status: string;
};

const InternshipDetailsAdmin = () => {
  const { id } = useParams(); // id lamaran magang
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

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
        const raw =
          Array.isArray(res.data?.data) && res.data.data.length > 0
            ? res.data.data[0]
            : Array.isArray(res.data)
            ? res.data[0]
            : res.data?.data ?? res.data;

        if (!raw) {
          setError("Data lamaran tidak ditemukan.");
          return;
        }

        const mapped: Applicant = {
          id: raw.id,

          nama_depan: raw.mahasiswa?.nama_depan ?? "",
          nama_belakang: raw.mahasiswa?.nama_belakang ?? "",
          email: raw.mahasiswa?.email ?? raw.email ?? "",
          kontak: raw.mahasiswa?.kontak ?? raw.kontak ?? "",
          jurusan: raw.mahasiswa?.jurusan ?? raw.jurusan ?? "",

          posisi: raw.lowongan_magang?.posisi ?? raw.posisi ?? "",
          kelompok_peminatan:
            raw.lowongan_magang?.kelompok_peminatan ??
            raw.kelompok_peminatan ??
            "",

          motivasi: raw.mahasiswa?.motivasi ?? raw.motivasi ?? "",

          relevant_skills:
            raw.mahasiswa?.relevant_skills ??
            raw.relevant_skills ??
            raw.relevant_skill ??
            "",

          cv_path: raw.cv_path ?? raw.mahasiswa?.cv_path ?? "",
          portofolio_path:
            raw.portofolio_path ?? raw.mahasiswa?.portofolio_path ?? "",

          status: raw.status ?? "diproses",
        };

        setApplicant(mapped);
        setError(null);
      })

      .catch((err) => {
        console.error("Gagal fetch detail lamaran", err);
        setError("Gagal mengambil detail lamaran.");
      });
  }, [id]);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const handleStatusUpdate = (status: "diterima" | "ditolak") => {
    if (!id) return;

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
        setApplicant((prev) => (prev ? { ...prev, status } : prev));
        navigate("/internships-list")
      })
      .catch((err) => {
        console.error("Gagal update status", err);
      });
  };

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

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
                <span className="font-semibold">Negara:</span>{" "}
                {applicant.jurusan}
              </p>
              <p>
                <span className="font-semibold">Universitas:</span>{" "}
                {applicant.jurusan}
              </p>
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
                {(applicant.relevant_skills || "")
                  .split(",")
                  .filter((s) => s.trim() !== "")
                  .map((skill, idx) => (
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
