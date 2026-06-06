import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderKanban, Award, Settings, HelpCircle, LogOut, ChevronRight, X } from 'lucide-react';

const navItems = [
  { label: "Home", icon: Home, path: "/intern" },
  { label: "List Projects", icon: FolderKanban, path: "/intern/projects" },
  { label: "Certificates", icon: Award, path: "/intern/certificates" },
];

const prefItems = [
  { label: "Settings", icon: Settings, path: "/intern/settings" },
  { label: "FAQ", icon: HelpCircle, path: "/intern/faq" },
  { label: "Logout", icon: LogOut, path: "/login-internify", danger: true },
];

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function SidebarIntern({ isOpen, closeSidebar }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    closeSidebar(); // Otomatis tutup sidebar setelah klik menu di HP
  };

  return (
    <aside 
      className={`
        /* Struktur Dasar Layout */
        bg-white border-r border-gray-300 flex flex-col py-5 px-3 gap-1 overflow-y-auto flex-shrink-0 transition-transform duration-300 ease-in-out
        
        /* Kondisi Layar Desktop (>= md) */
        md:sticky md:top-[73px] md:h-[calc(100vh-73px)] md:w-[250px] md:translate-x-0 md:z-8
        
        /* Kondisi Layar Mobile (< md) dan Logika Aktif-nya */
        fixed top-0 left-0 h-screen w-[270px] z-40 pt-5
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand & Tombol Close untuk Mobile */}
      <div className="flex items-center justify-between px-2 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-red-600 flex items-center justify-center flex-shrink-0"></div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Internify</p>
            <p className="text-[11px] text-gray-400">LMS Portal</p>
          </div>
        </div>

        {/* Tombol Close silang (X): Hanya muncul di HP saat sidebar terbuka */}
        <button 
          onClick={closeSidebar} 
          className="p-1 text-gray-500 hover:bg-gray-100 rounded-md md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-px bg-gray-300 my-1" />

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path; 
          return (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13.5px] font-medium text-left transition-colors
                ${isActive
                  ? "bg-red-50 text-red-600 font-semibold border-l-4 border-red-600"
                  : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span>{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-gray-200 my-1" />

      {/* Preferences */}
      <p className="text-[10px] font-semibold tracking-widest text-gray-400 px-3 py-1.5">
        PREFERENCES
      </p>
      <nav className="flex flex-col gap-0.5">
        {prefItems.map(({ label, icon: Icon, path, danger }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13.5px] font-medium text-left transition-colors
                ${isActive
                  ? "bg-red-50 text-red-600 font-semibold"
                  : danger
                    ? "text-gray-400 hover:bg-red-50 hover:text-red-600"
                    : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}