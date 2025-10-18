import { useState } from "react";

const faqData = [
  {
    question: "Bagaimana cara magang disini?",
    answer: "Pilih Internship, Kemudian Lakukan Proses Administrasi",
  },
  {
    question: "Apakah saya bisa melamar lebih dari satu lowongan?",
    answer: "Tidak Bisa, Hanya Bisa Melamar 1 Lowongan",
  },
  {
    question: "Bagaimana saya tahu jika lamaran saya diterima atau ditolak?",
    answer: "Sistem Akan Mengirimkan Pesan Diterima/Ditolak Ke Email Anda",
  },
  {
    question: "Berapa lama durasi magang di Humic?",
    answer: "Cek Instagram Kita Yah, Disana Tertera Durasi Magangnya",
  },
  {
    question: "Apakah data pribadi saya aman?",
    answer: "Data Pribadi Dipastikan Aman, Sistem Ini Memiliki Admin Dashboard",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="hero-5-section flex flex-col lg:flex-row items-start lg:items-center justify-between mt-25 px-6 md:px-16 lg:px-[150px] pb-[60px] gap-10">
      <div className="content-of-5 w-full lg:w-[610px]">
        <h2 className="font-bold text-2xl md:text-3xl">Frequently Asked Questions</h2>
        <p className="font-medium text-base mt-4">
          Berikut adalah informasi mengenai pertanyaan umum seputar program magang di Humic, termasuk tata cara pendaftaran dan persyaratan yang perlu dipenuhi. Masih ada yang perlu ditanyakan? Silahkan{" "}
          <span className="text-[#C3423F] font-semibold">DM</span> kami
        </p>
      </div>
      <div className="faq-content-list space-y-6 w-full lg:w-[700px]">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-[#FAF0EF] shadow-md rounded-sm">
            <button onClick={() => toggleItem(index)} className="w-full flex items-center cursor-pointer justify-between p-4 focus:outline-none">
              <span className="text-[16px] font-semibold text-left text-[#C3423F]">{faq.question}</span>
              <span className="text-[20px] font-bold text-[#C3423F]">{openIndex === index ? "-" : "+"}</span>
            </button>
            <div className={`px-4 pb-4 text-black transition-all duration-300 ${openIndex === index ? "block" : "hidden"}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
