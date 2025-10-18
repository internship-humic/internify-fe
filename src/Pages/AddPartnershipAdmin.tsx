import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddPartnershipAdmin = () => {
  const navigate = useNavigate();

  const [namaPartner, setNamaPartner] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
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

    if (!namaPartner || !thumbnail) {
      setError("Nama dan thumbnail harus diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("nama_partner", namaPartner);
    formData.append("image", thumbnail);

    // Ambil token dari cookie seperti yang kamu minta
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      setError("Token tidak ditemukan. Silakan login kembali.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/partnership-api/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Partnership berhasil ditambahkan!");
        navigate("/partnership-admin");
      } else {
        setError(data.message || "Gagal menambahkan partnership.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />

      <div className="flex flex-row">
        <SidebarAdmin />

        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="header-button flex flex-row justify-between items-center mb-[45px]">
            <h2 className="text-[24px] font-semibold">Tambah Partnership</h2>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white px-6 py-2 rounded-md font-medium"
            >
              Submit
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <div className="flex flex-row gap-16">
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

export default AddPartnershipAdmin;
