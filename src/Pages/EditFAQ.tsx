import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import axios from "axios";

const EditFaq = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("<p></p>");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  const navigate = useNavigate();

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchFaqDetail = async () => {
      if (!id) return;

      setLoading(true);
      setPrefilled(false);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/faq-api/get/${id}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
        );

        if (res.data?.status) {
          const data = res.data.data;
          setQuestions(data?.pertanyaan ?? "");
          setAnswers(data?.jawaban ?? "<p></p>");
          setPrefilled(true);
        } else {
          alert(res.data?.message || "Gagal mengambil detail FAQ.");
          navigate("/faq-list");
        }
      } catch (e: any) {
        console.error(e);
        alert(e?.response?.data?.message || "Gagal mengambil detail FAQ.");
        navigate("/faq-list");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqDetail();
  }, [id]);

  const handleSubmit = async () => {
    if (!token) return alert("Token tidak ditemukan.");
    if (!id) return alert("ID FAQ tidak ditemukan.");
    if (!questions || !answers) return alert("Semua field wajib diisi.");

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/faq-api/update/${id}`,
        { pertanyaan: questions, jawaban: answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.status) {
        alert("Faq berhasil diperbarui!");
        navigate("/faq-list");
      } else {
        alert(res.data?.message || "Gagal memperbarui faq.");
      }
    } catch (e: any) {
      console.error(e);
      alert(
        e?.response?.data?.message || "Terjadi kesalahan saat memperbarui faq."
      );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />
      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">
              Edit Frequently Asked Questions
            </h2>
            <button
              className="bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white px-6 py-2 rounded-md font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>

          <form className="flex flex-col gap-6 max-w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Questions</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="Tulis pertanyaan kamu..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Answers</label>

              {/* Render Froala hanya setelah mount + data terisi */}
              {mounted && prefilled ? (
                <FroalaEditor
                  key={id}
                  tag="textarea"
                  model={answers}
                  onModelChange={(model: any) => setAnswers(model ?? "<p></p>")}
                  config={{
                    placeholderText: "Tulis jawaban kamu...",
                    charCounterCount: true,
                    toolbarSticky: true,
                    heightMin: 200,
                  }}
                />
              ) : (
                <div className="border border-gray-300 rounded-lg p-3 text-gray-500">
                  {loading ? "Memuat editor..." : "Menyiapkan editor..."}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
