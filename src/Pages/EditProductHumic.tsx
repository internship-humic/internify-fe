import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import axios from "axios";

const EditProductHumic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [namaProject, setNamaProject] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [linkProject, setLinkProject] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/hasil-research-api/get/${id}`
        );

        const data = response.data.data;
        console.log("Response data:", data);

        const project = Array.isArray(data) ? data[0] : data;

        if (project) {
          setNamaProject(project.nama_project || "");
          setDeskripsi(project.deskripsi || "");
          setLinkProject(project.link_project || "");
        } else {
          alert("Data project tidak ditemukan.");
          console.warn("Data kosong:", data);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data project.");
      }
    };

    if (id) {
      console.log("ID dari URL:", id);
      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      alert("Token tidak ditemukan.");
      return;
    }

    const formData = new FormData();
    formData.append("nama_project", namaProject);
    formData.append("deskripsi", deskripsi);
    formData.append("link_project", linkProject);
    if (image) formData.append("image", image);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/hasil-research-api/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Project berhasil diupdate!");
      navigate("/product-list");
    } catch (error) {
      console.error("Gagal mengupdate project:", error);
      alert("Gagal mengupdate project.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Edit Research Project</h2>
            <button
              className="bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white px-6 py-2 rounded-md font-medium"
              onClick={handleSubmit}
            >
              Simpan Perubahan
            </button>
          </div>

          <form className="flex flex-col gap-6 max-w-full">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-sm font-medium">Nama Project</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={namaProject}
                  onChange={(e) => setNamaProject(e.target.value)}
                  placeholder="Contoh: Sistem Rekomendasi Tanaman"
                />
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-sm font-medium">Link Project</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={linkProject}
                  onChange={(e) => setLinkProject(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-sm font-medium">
                  Upload Gambar (Opsional)
                </label>
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

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Deskripsi Project</label>
              <FroalaEditor
                tag="textarea"
                model={deskripsi}
                onModelChange={(model: any) => setDeskripsi(model)}
                config={{
                  placeholderText: "Tulis deskripsi penelitian di sini...",
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

export default EditProductHumic;
