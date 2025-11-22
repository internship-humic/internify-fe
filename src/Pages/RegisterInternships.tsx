import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

const RegisterInternships = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [posisi, setPosisi] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    email: "",
    kontak: "",
    universitas: "",
    negara: "",
    jurusan: "",
    batch: "",
    motivasi: "",
    relevant_skills: "",
    cv: null as File | null,
    portofolio: null as File | null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.cv || !formData.portofolio) {
      alert("CV dan Portofolio wajib diunggah!");
      return;
    }

    if (!recaptchaToken) {
      alert("Silakan verifikasi reCAPTCHA terlebih dahulu.");
      return;
    }

    const data = new FormData();
    data.append("nama_depan", formData.nama_depan);
    if (formData.nama_belakang.trim() !== "") {
      data.append("nama_belakang", formData.nama_belakang);
    }
    data.append("email", formData.email);
    data.append("kontak", formData.kontak);
    data.append("universitas", formData.universitas);
    data.append("negara", formData.negara);
    data.append("jurusan", formData.jurusan);
    data.append("batch", formData.batch);
    data.append("motivasi", formData.motivasi);
    data.append("relevant_skills", formData.relevant_skills);
    data.append("g-recaptcha-response", recaptchaToken);
    if (formData.cv) data.append("cv", formData.cv);
    if (formData.portofolio) data.append("portofolio", formData.portofolio);

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/lamaran-magang-api/add/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
      navigate("/register-done");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
        alert("Gagal mengirim form. Silakan coba lagi.");
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPosisi = async () => {
      if (!id) {
        console.warn("⚠️ ID belum tersedia, skip fetchPosisi()");
        return;
      }

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/lowongan-magang-api/get/id/${id}`
        );

        console.log("Response posisi:", response.data);

        const posisiValue = response.data?.data?.posisi;
        if (posisiValue) {
          setPosisi(posisiValue);
        } else {
          console.warn("Tidak ada field posisi di response:", response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data posisi:", error);
      }
    };
    fetchPosisi();
  }, [id]);

  return (
    <div className="body-of-register min-h-screen bg-[#F8F9FA]">
      <div className="nav-section py-[20px]">
        <Navbar />
      </div>

      <div className="form-input-container flex flex-col text-[#494949] justify-center items-center">
        <div className="title-of-form">
          <h2 className="font-bold text-[32px] text-black mt-[40px]">
            {posisi || "Loading..."}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[70rem] px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <label className="block mb-1 font-bold">Nama depan</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="Muhammad Budi"
              value={formData.nama_depan}
              onChange={(e) =>
                setFormData({ ...formData, nama_depan: e.target.value })
              }
            />
            <p className="text-sm text-[#C3423F] mt-1">*required</p>
          </div>

          <div>
            <label className="block mb-1 font-bold">Nama belakang</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="Pekerti"
              value={formData.nama_belakang}
              onChange={(e) =>
                setFormData({ ...formData, nama_belakang: e.target.value })
              }
            />
            <p className="text-sm text-[#C3423F] mt-1">*required</p>
          </div>

          <div>
            <label className="block mb-1 font-bold">Email</label>
            <input
              type="email"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <p className="text-sm text-[#C3423F] mt-1">*email or SSO</p>
          </div>

          <div>
            <label className="block mb-1 font-bold">Kontak</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="08123456789"
              value={formData.kontak}
              onChange={(e) =>
                setFormData({ ...formData, kontak: e.target.value })
              }
            />
          </div>
          
          <div>
            <label className="block mb-1 font-bold">Universitas</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="Telkom University Bandung"
              value={formData.universitas}
              onChange={(e) =>
                setFormData({ ...formData, universitas: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">Negara</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="Indonesia"
              value={formData.negara}
              onChange={(e) =>
                setFormData({ ...formData, negara: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">Jurusan</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="Informatika"
              value={formData.jurusan}
              onChange={(e) =>
                setFormData({ ...formData, jurusan: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">Skill</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="JavaScript,Python,Figma"
              value={formData.relevant_skills}
              onChange={(e) =>
                setFormData({ ...formData, relevant_skills: e.target.value })
              }
            />
            <p className="text-sm text-[#C3423F] mt-1">*separate with commas</p>
          </div>

          <div>
            <label className="block mb-1 font-bold">Batch</label>
            <input
              type="text"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              placeholder="1"
              value={formData.batch}
              onChange={(e) =>
                setFormData({ ...formData, batch: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">
              CV (Curriculum Vitae)
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              onChange={(e) =>
                setFormData({ ...formData, cv: e.target.files?.[0] || null })
              }
            />
            <p className="text-sm text-[#C3423F] mt-1">
              *only accept pdf files only
            </p>
          </div>

          <div>
            <label className="block mb-1 font-bold">Portofolio</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 text-black"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  portofolio: e.target.files?.[0] || null,
                })
              }
            />
            <p className="text-sm text-[#C3423F] mt-1">
              *only accept pdf files only
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-bold">
              Motivasi ingin bergabung ke Humic?
            </label>
            <textarea
              className="w-full border-2 border-[#A9B5C0] rounded-md p-2 mt-3 min-h-[120px] text-black"
              placeholder="Saya ingin belajar lebih banyak mengenai desain antarmuka pengguna..."
              value={formData.motivasi}
              onChange={(e) =>
                setFormData({ ...formData, motivasi: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2 flex items-start gap-2">
            <input type="checkbox" className="mt-1" required />
            <p className="text-[16px] text-black">
              Dengan melanjutkan, saya mengonfirmasi bahwa saya telah membaca
              secara seksama dan menyetujui{" "}
              <span className="text-[#C3423F] underline">
                Persyaratan Layanan
              </span>{" "}
              dan{" "}
              <span className="text-[#C3423F] underline">
                Kebijakan Privasi
              </span>
              .
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col items-center justify-center gap-10 text-center mt-[40px]">
            {/* Sisipkan reCAPTCHA */}

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => {
                setRecaptchaToken(token);
              }}
              onExpired={() => setRecaptchaToken(null)}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-9 py-3 rounded-xl cursor-pointer hover:bg-[#975553] font-bold shadow-2xl ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#C3423F] text-white"
              }`}
            >
              {isSubmitting ? "Mengirim..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterInternships;
