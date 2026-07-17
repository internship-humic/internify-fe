import { Bell, Menu } from "lucide-react"
import { useEffect, useState } from "react";
import humiclogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCurrentUser, getInitials } from "../hooks/useUser";
import { resolveFileUrl } from "../Pages/utils/resolveFileFromUrl";
import { useNotifications } from "../hooks/useNotification";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const nav = useNavigate();
  const { user } = useCurrentUser();
  const [imageError, setImageError] = useState(false);
  const { unreadCount } = useNotifications();
  const photoUrl = resolveFileUrl(user?.profile_picture);

  useEffect(() => {
    setImageError(false);
  }, [photoUrl]);

  const displayName = user?.full_name?.trim() || [user?.nama_depan, user?.nama_belakang].filter(Boolean).join(" ") || "";

  const initials = getInitials(displayName);
  const hasPhoto = !!photoUrl && !imageError;

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
          <img src={humiclogo} alt="Humic Logo" className="w-[120px] cursor-pointer" />
        </button>
      </div>

      <div className="flex flex-row gap-6 items-center">
        <button onClick={() => nav("notifications")} className="relative">
          <Bell className="w-5 h-5 hover:text-red-800"/>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-0.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white" />
          )}
        </button>

        {/* Gambar Profil */}
        <button
          className="rounded-full w-9 h-9 overflow-hidden border-2 border-gray-200"
          title="Profile Settings"
        >
          {hasPhoto ? (
            <img
              src={photoUrl!}
              alt={displayName || "Profile"}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
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