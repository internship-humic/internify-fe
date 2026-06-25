import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderKanban, Award, Settings, HelpCircle, LogOut, ChevronRight, X } from 'lucide-react';

const navItems = [
  // belum kutambahin
  { label: "Home", icon: Home, path: "/mentor" },
  { label: "List Projects", icon: FolderKanban, path: "/mentor/projects" },
  { label: "Interns", icon: FolderKanban, path: "/mentor/intern" },
  { label: "Certificates", icon: Award, path: "/mentor/certificates" },
];

const prefItems = [
  { label: "Settings", icon: Settings, path: "/mentor/settings" },
  { label: "FAQ", icon: HelpCircle, path: "/mentor/faq" },
  { label: "Logout", icon: LogOut, path: "/login-internify", danger: true, isLogout: true },
];

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function SidebarMentor({ isOpen, closeSidebar }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=86400; SameSite=Strict";

    closeSidebar();
    navigate("/login-internify", { replace: true });
  };

  return (
    <aside
      className={`
        bg-white border-r border-gray-300 flex flex-col py-5 px-3 gap-1 overflow-y-auto flex-shrink-0 transition-transform duration-300 ease-in-out
        md:sticky md:top-[50px] md:h-[calc(100vh-73px)] md:w-[250px] md:translate-x-0 md:z-8
        fixed top-0 left-0 h-[calc(100vh-50px)] w-[270px] z-40 pt-5
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand & Tombol Close untuk Mobile */}
      <div className="flex items-center justify-between px-2 pb-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-red-600 flex items-center justify-center flex-shrink-0"></div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Internify</p>
            <p className="text-[11px] text-gray-400">LMS Portal</p>
          </div>
        </div>

        <button
          onClick={closeSidebar}
          className="p-1 text-gray-500 hover:bg-gray-100 rounded-md md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

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
                  ? "bg-base-foreground text-base font-semibold border-l-4 border-base"
                  : "text-font hover:bg-base-foreground hover:text-base"
                }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span>{label}</span>
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
        {prefItems.map(({ label, icon: Icon, path, danger, isLogout }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => isLogout ? handleLogout() : handleNav(path)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13.5px] font-medium text-left transition-colors
                ${isActive
                  ? "bg-red-50 text-red-600 font-semibold"
                  : danger
                    ? "text-font hover:bg-base-foreground hover:text-base"
                    : "text-font hover:bg-base-foreground hover:text-base"
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
