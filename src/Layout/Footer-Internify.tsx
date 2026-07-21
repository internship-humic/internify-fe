import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import logoHumic from "../assets/logo.png";

const internshipLinks = [
  { label: "Beranda", path: "/" },
  { label: "Tentang", path: "/about-us" },
  { label: "Life At Humic", path: "" },
  { label: "Our Developer", path: "/our-developer" }
];

const externalLinks = [
  { label: "Humic Website", href: "https://humic.telkomuniversity.ac.id/" },
  { label: "Our Activity", href: "https://humic.telkomuniversity.ac.id/humicinmedia/" },
  { label: "Life At Humic", href: "" },
  // { label: "Our Developer", href: "#" },
];

const socials = [
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/humicengineering/" },
  { label: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/humic-engineering/" },
  { label: "Email", icon: FaRegEnvelope, href: "" },
];

export function FooterIntern() {
  return (
    <footer className="bg-white border-t border-gray-300 px-14 py-8 flex gap-12 flex-wrap">
      {/* Brand info */}
      <div className="flex flex-col gap-1 flex-shrink-0 w-70 items-start">
        <img
          src={logoHumic}
          alt="logo humic"
          className="w-[130px]"
        />
        <address className="text-[13px] text-gray-800 not-italic mt-[10px]">
          Gedung Kultubai Selatan, Blok F
          Jl. Telekomunikasi, Terusan Buah Batu Bandung
          Jawa Barat, Indonesia. 40257
        </address>
        <div className="flex gap-2  mt-[13px]">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 border rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Link columns */}
      <div className="flex gap-12 flex-1 justify-end flex-wrap">
        <div className="flex flex-col gap-2 min-w-[140px]">
          <p className="text-[13px] font-bold text-gray-900">Internship</p>
          <ul className="flex flex-col gap-0.5 font-semibold">
            {internshipLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="text-[12.5px] text-gray-600 hover:text-red-800 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 min-w-[140px]">
          <p className="text-[13px] font-bold text-gray-900">Lainnya</p>
          <ul className="flex flex-col gap-0.5 font-semibold">
            {externalLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] text-gray-600 hover:text-red-800 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default FooterIntern;

