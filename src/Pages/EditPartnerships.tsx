import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditPartnerships = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaPartner, setNamaPartner] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    const fetchPartnershipData = async () => {
      if (!id) {
        setError("ID tidak ditemukan");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/partnership-api/get/${id}`
        );

        const result = await response.json();

        console.log("GET result:", result.data);

        if (response.ok) {
          setNamaPartner(result.data[0].nama_partner);
          setPreviewUrl(
            `${import.meta.env.VITE_API_BASE_URL}` + result.data[0].image_path
          );
        } else {
          setError(result.message || "Gagal memuat data partnership.");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      }
    };

    fetchPartnershipData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Format file tidak didukung.");
        return;
      }
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();

    if (!namaPartner) {
      setError("Nama partnership harus diisi.");
      return;
    }

    if (!token || !id) {
      setError("Token atau ID tidak ditemukan.");
      return;
    }

    const formData = new FormData();
    formData.append("nama_partner", namaPartner);
    if (thumbnail) formData.append("image", thumbnail);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/partnership-api/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Partnership berhasil diperbarui!");
        navigate("/partnership-admin");
      } else {
        setError(result.message || "Gagal memperbarui partnership.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memperbarui data.");
    }
  };

  const handleDelete = async () => {
    if (!token || !id) {
      setError("Token atau ID tidak ditemukan.");
      return;
    }

    const confirmDelete = confirm(
      "Apakah kamu yakin ingin menghapus partnership ini?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/partnership-api/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Partnership berhasil dihapus!");
        navigate("/partnership-admin");
      } else {
        setError(result.message || "Gagal menghapus partnership.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-[45px]">
            <h2 className="text-[24px] font-semibold">Edit Partnership</h2>
            <div className="flex gap-4 pr-10">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#4CAF50] hover:bg-[#89c58c] cursor-pointer text-white px-6 py-3 rounded-xl w-[200px] font-semibold"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-[#E53935] hover:bg-[#9e5857] cursor-pointer text-white px-6 py-3 rounded-xl w-[200px] font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <div className="flex flex-row gap-10">
              <div className="flex flex-col items-start gap-[15px]">
                <h2 className="text-[16px] font-bold">Nama</h2>
                <input
                  type="text"
                  value={namaPartner}
                  onChange={(e) => setNamaPartner(e.target.value)}
                  placeholder="Nama Partnership"
                  className="border-2 px-[15px] py-[10px] border-[#A9B5C0] rounded-xl w-[600px]"
                />
              </div>
              <div className="flex flex-col items-start gap-[15px]">
                <h2 className="text-[16px] font-bold">Thumbnail</h2>
                <input
                  type="file"
                  accept=".jpg,.png,.webp"
                  onChange={handleImageChange}
                  className="border-2 px-[15px] py-[10px] border-[#A9B5C0] rounded-xl w-[600px]"
                />
                <p className="text-[#C3423F] text-[12px]">
                  *file harus berformat .jpg .png .webp dengan resolusi maksimal
                  1024 x 500
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[16px] font-bold mb-2">Preview</h2>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-[800px] h-auto border rounded-xl"
                />
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPartnerships;
