import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import axios from "axios";

const AddProduct = () => {
  const [posisi, setPosisi] = useState("");
  const [kelompok, setKelompok] = useState("");
  const [kelompokOptions, setKelompokOptions] = useState<string[]>([]);
  const [lokasi, setLokasi] = useState("");
  const [paid, setPaid] = useState("paid");
  const [durasiAwal, setDurasiAwal] = useState("");
  const [durasiAkhir, setDurasiAkhir] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isCustomKelompok, setIsCustomKelompok] = useState(false);
  const [customKelompok, setCustomKelompok] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/lowongan-magang-api/get/kelompok-all`
      )
      .then((res) => {
        const data = res.data.data;
        setKelompokOptions(data);
        if (data.length > 0) {
          setKelompok(data[0]);
          setIsCustomKelompok(false);
        } else {
          setIsCustomKelompok(true);
        }
      })
      .catch((err) => {
        console.error("Gagal memuat kelompok peminatan:", err);
        setIsCustomKelompok(true);
      });
  }, []);

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
    formData.append("posisi", posisi);
    formData.append(
      "kelompok_peminatan",
      isCustomKelompok || kelompokOptions.length === 0
        ? customKelompok
        : kelompok
    );
    formData.append("lokasi", lokasi);
    formData.append("jobdesk", jobdesk);
    formData.append("kualifikasi", getRandomKualifikasi());
    formData.append("benefit", getRandomBenefit());
    formData.append("durasi_awal", durasiAwal);
    formData.append("durasi_akhir", durasiAkhir);
    formData.append("paid", paid);
    if (image) formData.append("image", image);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/lowongan-magang-api/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Internship berhasil ditambahkan!");
      navigate("/lowongan-list");
    } catch (error) {
      console.error("Error adding internship:", error);
      alert("Gagal menambahkan internship.");
    }
  };

  const getRandomKualifikasi = () => {
    const list = [
      "Menguasai tools desain",
      "Bisa bekerja dalam tim",
      "Memiliki laptop pribadi",
      "Menguasai dasar HTML & CSS",
    ];
    return list[Math.floor(Math.random() * list.length)];
  };

  const getRandomBenefit = () => {
    const list = [
      "Sertifikat",
      "Uang transport",
      "Mentoring langsung",
      "Kesempatan kerja tetap",
    ];
    return list[Math.floor(Math.random() * list.length)];
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Tambah Lowongan</h2>
            <button
              className="bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white px-6 py-2 rounded-md font-medium"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <form className="flex flex-col gap-6 max-w-full">
            {/* Internship Fields Only */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Kategori Internship
                </label>

                {/* Jika ada data dari API */}
                {kelompokOptions.length > 0 && (
                  <select
                    className="border border-gray-300 rounded-lg p-3"
                    value={kelompok}
                    onChange={(e) => {
                      const value = e.target.value;
                      setKelompok(value);
                      setIsCustomKelompok(value === "lainnya");
                    }}
                  >
                    {kelompokOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="lainnya">Lainnya (masukan manual)</option>
                  </select>
                )}

                {(isCustomKelompok || kelompokOptions.length === 0) && (
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3 mt-2"
                    placeholder="Tulis kategori internship baru"
                    value={customKelompok}
                    onChange={(e) => setCustomKelompok(e.target.value)}
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Paid</label>
                <select
                  className="border border-gray-300 rounded-lg p-3"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Lokasi</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Onsite,Jakarta"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nama Internship</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3"
                  value={posisi}
                  onChange={(e) => setPosisi(e.target.value)}
                  placeholder="UI/UX Designer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Tanggal Mulai Oprec
                </label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-3"
                  value={durasiAwal}
                  onChange={(e) => setDurasiAwal(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Tanggal Akhir Oprec
                </label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-3"
                  value={durasiAkhir}
                  onChange={(e) => setDurasiAkhir(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-sm font-medium">Thumbnail / Image</label>
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
                model={jobdesk}
                onModelChange={(model: any) => setJobdesk(model)}
                config={{
                  placeholderText: "Tulis deskripsi lowongan...",
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

export default AddProduct;
