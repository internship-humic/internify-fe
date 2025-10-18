import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import doneimg from "../assets/done.png";
import { useNavigate } from "react-router-dom";

const RegisterDone = () => {
  const navigate = useNavigate();
  return (
    <div className="body-of-done min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Navbar Section */}
      <div className="nav-section py-5">
        <Navbar />
      </div>

      {/* Content Container */}
      <div className="container-of-content flex-grow flex flex-col justify-center items-center px-4 md:px-0 text-center">
        <img src={doneimg} alt="Success" className="w-4/5 max-w-[150px] md:max-w-[170px]" />
        <h2 className="font-semibold text-[20px] md:text-[24px] mt-8">Lamaran diterima</h2>
        <p className="mt-3 text-[14px] md:text-[16px] font-normal max-w-[600px]">Kami akan segera memeriksa lamaran kamu. Cek email secara berkala untuk informasi selanjutnya.</p>
        <button className="mt-6 text-white font-bold bg-[#C3423F] hover:bg-[#975553] cursor-pointer px-8 md:px-10 py-3 md:py-4 rounded-2xl shadow-2xl text-sm md:text-base" onClick={() => navigate("/")}>
          Kembali ke Beranda
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegisterDone;
