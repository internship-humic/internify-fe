import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../Layout/SidebarAdmin";
import NavbarAdmin from "../Layout/NavbarAdmin";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import axios from "axios";

const AddFaq = () => {
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
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

    if (!questions || !answers) {
      alert("Semua field wajib diisi.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/faq-api/add`,
        {
          pertanyaan: questions,
          jawaban: answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        alert("Faq berhasil ditambahkan!");
        navigate("/faq-list");
      } else {
        alert(response.data.message || "Gagal menambahkan faq.");
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Error response data:", error.response.data);
      }
      console.error("Error adding faq:", error);
      alert("Terjadi kesalahan saat menambahkan faq.");
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
              Tambah Frequently Asked Questions
            </h2>
            <button
              className="bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white px-6 py-2 rounded-md font-medium"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <form className="flex flex-col gap-6 max-w-full">
            {/* Questions */}
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

            {/* Answers */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Answers</label>
              <FroalaEditor
                tag="textarea"
                model={answers}
                onModelChange={(model: any) => setAnswers(model)}
                config={{
                  placeholderText: "Tulis jawaban kamu...",
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

export default AddFaq;
