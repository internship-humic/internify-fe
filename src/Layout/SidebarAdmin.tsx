import { useNavigate } from 'react-router-dom';
import { Home, FolderKanban, Award, Settings, HelpCircle, LogOut, User, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: "Home", icon: Home, path: "/admin" },
  { label: "List Projects", icon: FolderKanban, path: "/admin/projects" },
  { label: "Interns", icon: User, path: "/admin/intern" },
  { label: "Certificates", icon: Award, path: "/admin/certificates" },
];

const prefItems = [
  { label: "Settings", icon: Settings, path: "/admin/settings" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
  { label: "Logout", icon: LogOut, path: "/admin/logout", danger: true },
];

function SidebarIntern() {
  const navigate = useNavigate();
  const [active, setActive] = useState("/admin");

  const handleNav = (path: string) => {
    setActive(path);
    navigate(path);
  };

  return (
    <aside className="w-[279px] bg-white border-r border-gray-100 flex flex-col py-5 px-3 gap-1 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 pb-4">
        <div className="w-9 h-9 rounded-[10px] bg-red-600 flex items-center justify-center flex-shrink-0">
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">Internify</p>
          <p className="text-[11px] text-gray-400">LMS Portal</p>
        </div>
      </div>

      <div className="h-px bg-gray-100 my-1" />

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = active === path;
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
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-gray-100 my-1" />

      {/* Preferences */}
      <p className="text-[10px] font-semibold tracking-widest text-gray-400 px-3 py-1.5">
        PREFERENCES
      </p>
      <nav className="flex flex-col gap-0.5">
        {prefItems.map(({ label, icon: Icon, path, danger }) => {
          const isActive = active === path;
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


export default SidebarIntern
