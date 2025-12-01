import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";
import axios from "axios";

type Application = {
  id: number;
  nama_depan: string;
  posisi: string;
  status: string;
};

const InternshipList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/lamaran-magang-api/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const raw = Array.isArray(res.data.data) ? res.data.data : [];

          const mapped: Application[] = raw.map((item: any) => ({
            id: item.id,
            nama_depan: item.mahasiswa?.nama_depan ?? "",
            posisi: item.lowongan_magang?.posisi ?? "",
            status: item.status ?? "diproses",
          }));

          setApplications(mapped);
        })
        .catch((err) => {
          console.error("Gagal mengambil data lamaran:", err);
        });
    };

    fetchApplications();

    const interval = setInterval(fetchApplications, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "diterima":
        return "bg-green-500 text-white";
      case "ditolak":
        return "bg-red-500 text-white";
      case "diproses":
      default:
        return "bg-yellow-400 text-black";
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.toLowerCase();
    const nama = (app.nama_depan ?? "").toLowerCase();
    const posisi = (app.posisi ?? "").toLowerCase();

    return nama.includes(term) || posisi.includes(term);
  });

  const currentItems = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handleExportExcel = async (): Promise<boolean> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/lamaran-magang-api/export`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Gagal mengekspor data:", error);
      alert("Gagal mengekspor data. Silakan coba lagi.");
      return false;
    }
  };

  const handleUpdateBatch = async () => {
    const exportSuccess = await handleExportExcel();

    if (!exportSuccess) {
      return;
    }

    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus seluruh data pelamar setelah melakukan ekspor?"
    );

    if (!confirmDelete) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/lamaran-magang-api/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications([]);
      alert("Data pelamar berhasil dihapus setelah diekspor.");
    } catch (error) {
      console.error("Gagal menghapus data pelamar:", error);
      alert("Gagal menghapus data pelamar. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[24px]">Daftar Pelamar</h2>
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Cari Nama, Posisi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-2xl w-[20rem] border border-slate-400"
              />
              <button
                onClick={handleUpdateBatch}
                className="bg-[#923120] hover:bg-[#8d5050] cursor-pointer text-white px-4 py-2 rounded-lg flex flex-row items-center gap-2"
              >
                Update Batch{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </span>
              </button>
              <button
                onClick={handleExportExcel}
                className="bg-[#227014] hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                Ekspor ke Excel
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Posisi</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{app.nama_depan}</td>
                    <td className="px-6 py-3">{app.posisi}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusStyle(
                          app.status ?? "diproses"
                        )}`}
                      >
                        {(app.status ?? "diproses").charAt(0).toUpperCase() +
                          (app.status ?? "diproses").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {/* <button
                        onClick={() => handleStatusUpdate("diterima")}
                        className="bg-[#3BB525] hover:bg-green-600 cursor-pointer text-white p-2 rounded-xl"
                      >
                        Terima
                      </button>

                      <button
                        onClick={() => handleStatusUpdate("ditolak")}
                        className="bg-[#C3423F] hover:bg-red-600 cursor-pointer text-white p-2 rounded-xl"
                      >
                        Tolak
                      </button> */}

                      <button
                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-2 rounded-xl"
                        onClick={() =>
                          navigate(`/internships-details-admin/${app.id}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {applications.length === 0 && (
              <p className="text-center text-gray-500 mt-5">Tidak ada data.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipList;
