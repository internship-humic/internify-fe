import Navbar from "../Layout/Navbar";
import faried from "../assets/faried.jpeg";
import reihan from "../assets/reihan.jpeg";
import yohan from "../assets/yohanes.jpeg";
import shafa from "../assets/shafa.jpeg";
import delkano from "../assets/delkano.jpeg";
import reinhard from "../assets/reinhard.jpeg";
import kakraya from "../assets/kakraya.png";
import Footer from "../Layout/Footer";
import { useEffect } from "react";

const OurDeveloper = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="body-of-developer min-h-screen bg-[#F8F9FA] ">
      {/* Navbar Section */}
      <div className="nav-section py-[20px]">
        <Navbar />
      </div>

      {/* Content */}
      <div className="body-of-content flex flex-col px-6 md:px-10 lg:px-16 py-5">
        <h2 className="text-[32px] font-bold mb-8 text-start">
          Our Developers
        </h2>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {[
            {
              name: "Taufik",
              role: "Project Manager",
              img: kakraya,
              link: "https://www.linkedin.com/in/rayataufik/",
            },
            {
              name: "Reinhard",
              role: "Web Designer",
              img: reinhard,
              link: "https://www.linkedin.com/in/reinhard-situmeang/",
            },
            {
              name: "Shafa",
              role: "Mobile Designer",
              img: shafa,
              link: "https://www.linkedin.com/in/shafasalmapermana/",
            },
            {
              name: "Faried",
              role: "Frontend Developer",
              img: faried,
              link: "https://www.linkedin.com/in/faried-gunawan/",
            },
            {
              name: "Delkano",
              role: "Mobile Developer",
              img: delkano,
              link: "https://www.linkedin.com/in/delkano-berutu-28b7482a2/",
            },
            {
              name: "Yohanes",
              role: "Backend Developer",
              img: yohan,
              link: "https://www.linkedin.com/in/yohanesjanuarico/",
            },
            {
              name: "Reihan",
              role: "Backend Developer",
              img: reihan,
              link: "https://www.linkedin.com/in/reihanramadhana/",
            },
          ].map((dev, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-[260px] flex flex-col items-center text-center"
            >
              <img
                src={dev.img}
                alt={dev.name}
                className="h-60 p-3 rounded-3xl w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-[20px] font-semibold">{dev.name}</h3>
                <p className="text-sm text-gray-500">{dev.role}</p>
                <a
                  href={dev.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 bg-[#FAF0EF] font-semibold text-[#C3423F] rounded-lg px-4 py-2 hover:bg-[#f2e3e1] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 
                1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default OurDeveloper;
