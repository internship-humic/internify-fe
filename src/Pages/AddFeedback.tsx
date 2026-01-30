import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import axios from "axios";

const AddFeedback = () => {
  const [posisi, setPosisi] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [nama, setNama] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [batch, setBatch] = useState("");
  const [feedback, setFeedbacks] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      alert("Token tidak ditemukan.");
      return;
    }

    if (!nama || !universitas || !posisi || !batch || !year || !feedback) {
      alert("Semua field wajib diisi.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("universitas", universitas);
      formData.append("posisi", posisi);
      formData.append("batch", batch);
      formData.append("tahun", year);
      formData.append("pesan", feedback);
      if (image) formData.append("image", image);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/feedback-api/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        alert("Feedback berhasil ditambahkan!");
        navigate("/feedback-list");
      } else {
        alert(response.data.message || "Gagal menambahkan feedback.");
      }
    } catch (error: any) {
      console.error("Error adding feedback:", error);
      alert("Terjadi kesalahan saat menambahkan feedback.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Tambah Feedback</h2>
            <button
              className="bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white px-6 py-2 rounded-md font-medium"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <form className="flex flex-col gap-6 max-w-full">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nama</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Universitas</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={universitas}
                  onChange={(e) => setUniversitas(e.target.value)}
                  placeholder="Telkom University Bandung"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Posisi</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={posisi}
                  onChange={(e) => setPosisi(e.target.value)}
                  placeholder="UI/UX Designer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Batch</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tahun</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2025"
                />
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-sm font-medium">Image anda</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="border border-gray-300 rounded-lg p-3"
                />
              </div>
            </div>

            {/* Isi Konten */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Isi Konten</label>
              <FroalaEditor
                tag="textarea"
                model={feedback}
                onModelChange={(model: any) => setFeedbacks(model)}
                config={{
                  placeholderText: "Tulis feedback kamu...",
                  charCounterCount: true,
                  toolbarSticky: true,
                  heightMin: 200,
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
