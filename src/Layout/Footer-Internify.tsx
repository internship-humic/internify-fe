import { Briefcase, Globe, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaRegEnvelope } from "react-icons/fa";

const footerLinks = {
  Internship: [
    { label: "Beranda", path: "/" },
    { label: "Tentang", path: "/tentang" },
    { label: "Life At Humic", path: "/life" },
  ],
  "Internify Logo": [
    { label: "Humic Website", path: "/humic" },
    { label: "Our Activity", path: "/activity" },
    { label: "Life At Humic", path: "/life-humic" },
    { label: "Our Developer", path: "/developer" },
  ],
};

const socials = [
  { label: "Instagram", icon: FaInstagram, href: "https://placeholder.com" },
  { label: "LinkedIn", icon: FaLinkedin, href: "https://placeholder.com" },
  { label: "Email", icon: FaRegEnvelope, href: "https://placeholder.com" },
];


export function FooterIntern() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-300 px-14 py-8 flex gap-12 flex-wrap">
      {/* Brand info */}
      <div className="flex flex-col gap-2 flex-shrink-0 w-70">
        <address className="text-xs text-gray-800 leading-relaxed not-italic">
          Gedung Kultubai Selatan, Blok F
          Jl. Telekomunikasi, Terusan Buah Batu Bandung
          Jawa Barat, Indonesia. 40257
        </address>
        <div className="flex gap-2 mt-1">
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
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-2.5 min-w-[110px]">
            <p className="text-[13px] font-bold text-gray-900">{title}</p>
            <ul className="flex flex-col gap-0.5">
              {links.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-[12.5px] text-gray-600 hover:text-red-800 transition-colors text-left bg-transparent border-none p-0 cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}


export default FooterIntern
