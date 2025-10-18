import humiclogo from "../assets/whiteLogo.png";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      id="footer"
      className="footer-container flex flex-col px-6 md:px-16 lg:px-[140px] bg-[#263742] mt-[60px] text-white pt-[60px] pb-[20px]"
    >
      <div className="head-of-footer flex flex-col lg:flex-row justify-between gap-10">
        {/* Right Section */}
        <div className="right-section flex flex-col items-start">
          <img src={humiclogo} className="w-[160px]" alt="Humic Logo" />
          <p className="text-[16px] mt-[20px]">
            <span className="font-bold text-[16px]">
              Gedung Kultubai Selatan, Blok F
            </span>{" "}
            <br />
            Jl. Telekomunikasi, Terusan Buah Batu Bandung <br />
            Jawa Barat, Indonesia. 40257
          </p>
          <div className="icons-media flex flex-row items-center gap-4 mt-[40px]">
            <a
              href="https://www.instagram.com/fariedgnwn"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram p-[10px] border-2 rounded-full"
            >
              <FaInstagram className="text-[24px]" />
            </a>
            <a
              href="https://www.linkedin.com/company/humic-engineering/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin p-[10px] border-2 rounded-full"
            >
              <FaLinkedinIn className="text-[24px]" />
            </a>
            <div className="mail p-[10px] border-2 rounded-full">
              <MdOutlineEmail className="text-[24px]" />
            </div>
          </div>
        </div>
        {/* Left Section */}
        <div className="left-section flex flex-col sm:flex-row gap-10">
          <div className="sec-1 flex flex-col gap-3">
            <p className="font-bold">Internship</p>
            <p>Beranda</p>
            <p>Tentang</p>
            <p>Life at Humic</p>
          </div>
          <div className="sec-2 flex flex-col gap-3">
            <p className="font-bold">Lainnya</p>
            <p>Humic Website</p>
            <p>Our Activity</p>
            <p>Life at Humic</p>
            <p
              onClick={() => navigate("/our-developer")}
              className="cursor-pointer"
            >
              Our Developer
            </p>
          </div>
        </div>
      </div>
      <h2 className="flex flex-col sm:flex-row justify-center items-center mt-[80px] text-center text-sm sm:text-base">
        &copy; 2025 Humic Research Center
        <span className="font-bold sm:ml-[10px]">
          Persyaratan Layanan | Kebijakan Privasi
        </span>
      </h2>
    </footer>
  );
};

export default Footer;
