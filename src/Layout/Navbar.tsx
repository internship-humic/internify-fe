import { useState } from "react";
import humiclogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (location.pathname === "/") {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { replace: false });
      setTimeout(() => {
        document
          .getElementById("footer")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 500); 
    }
  };

  return (
    <nav className="bg-[#D7E1E8] px-4 py-5 mx-5 rounded-2xl shadow-md">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <img
          src={humiclogo}
          alt="Humic Logo"
          onClick={() => navigate("/")}
          className="w-[130px] cursor-pointer"
        />

        {/* Burger menu */}
        <div className="md:hidden">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  openMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-[18px] font-semibold">
          <button
            onClick={() => navigate("/about-us")}
            className="hover:text-blue-600 transition cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={handleContactClick}
            className="hover:text-blue-600 transition cursor-pointer"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate("/internships")}
            className="hover:text-blue-600 transition cursor-pointer"
          >
            Internship
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {openMenu && (
        <div className="md:hidden mt-4 text-[18px] font-semibold space-y-3">
          <button
            onClick={() => {
              navigate("/about-us");
              setOpenMenu(false);
            }}
            className="block w-full text-left hover:text-blue-600 transition"
          >
            About Us
          </button>
          <button
            onClick={() => {
              handleContactClick();
              setOpenMenu(false);
            }}
            className="block w-full text-left hover:text-blue-600 transition"
          >
            Contact Us
          </button>

          <button
            onClick={() => {
              navigate("/internships");
              setOpenMenu(false);
            }}
            className="block w-full text-left hover:text-blue-600 transition"
          >
            Internship
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
