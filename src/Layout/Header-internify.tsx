import { Bell, Menu } from "lucide-react"
import humiclogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useUser";

/** Singkatan nama: ambil huruf pertama setiap kata, maksimal 2 huruf.
 *  "Andi Mahesa"        → "AM"
 *  "Andi Bayu Cendika"  → "AC"  (huruf pertama + huruf pertama kata terakhir)
 */
function getInitials(fullName: string | undefined | null): string {
  if (!fullName) return "U";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const nav = useNavigate();
  const { user } = useCurrentUser();

  // Tentukan base path settings sesuai role
  const settingsPath =
    user?.role === "intern" ? "/intern/settings" : "/mentor/settings";

  const initials = user?.full_name ? getInitials(user.full_name) : "U";
  const hasPhoto = !!user?.profile_picture;

  return (
    <header className='sticky top-0 flex w-full justify-between items-center py-4 px-12 bg-white border-b border-gray-300 z-10'>
      <div className='flex items-center gap-3'>
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-600 hover:bg-gray-100 rounded-md lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <button>
          <img src={humiclogo} alt="Humic Logo" className="w-[100px] cursor-pointer" />
        </button>
      </div>

      <div className="flex flex-row gap-6 items-center">
        <button onClick={() => nav("notifications")}>
          <Bell className="w-5 h-5 hover:text-red-800"/>
        </button>

        {/* Gambar Profil */}
        <button
          onClick={() => nav(settingsPath)}
          className="rounded-full w-9 h-9 overflow-hidden border-2 border-gray-200 hover:border-red-400 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-400"
          title="Profile Settings"
        >
          {hasPhoto ? (
            <img
              src={user!.profile_picture!}
              alt={user!.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#B30000] flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-wide">
                {initials}
              </span>
            </div>
          )}
        </button>
      </div>
    </header>
  )
}