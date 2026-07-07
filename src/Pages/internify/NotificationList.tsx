import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Download, Info } from "lucide-react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { io } from "socket.io-client";
import * as NotificationService from "../../services/NotificationService";
import type { UINotification, BackendNotification } from "../../types/notification.types";

const getCookieToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
};

export default function NotificationList() {
  const [notifications, setNotifications] = useState<UINotification[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await NotificationService.getNotifications();
        const mapped = data.map(NotificationService.mapNotificationToUI);
        setNotifications(mapped);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    loadNotifications();

    const token = getCookieToken();
    if (!token) return;

    const socketUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
    const socket = io(socketUrl, {
      auth: { token },
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log("WebSocket connected for notifications");
    });

    socket.on("notification", (notif: BackendNotification) => {
      console.log("New realtime notification received:", notif);
      const mapped = NotificationService.mapNotificationToUI(notif);
      setNotifications(prev => {
        if (prev.some(p => p.id === mapped.id)) {
          return prev;
        }
        return [mapped, ...prev];
      });
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected for notifications");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMarkAllRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
      alert("All notifications marked as read!");
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-title-desc">
            Keep track of your interns' progress and system updates.
          </p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1.5 self-start sm:self-center px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Check className="w-4 h-4 text-green-600 stroke-[3]" />
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 && (
        <p className="text-sm text-gray-400">Belum ada notifikasi.</p>
      )}

      <div className="space-y-6">

        {/* Render Group TODAY */}
        <div className="space-y-3">
          {notifications.filter(n => n.group === "TODAY").map((item) => (
            <div
              key={item.id}
              className={`relative flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] ${item.type === 'new-task' ? 'border-l-4 border-l-[#B30000]' : ''
                }`}
            >
              {/* Icon Container */}
              <div className={`p-2.5 rounded-xl ${item.type === 'new-task' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                {item.type === 'new-task' && <LuFileSpreadsheet className="w-5 h-5" />}
                {item.type === 'achievement' && <Check className="w-5 h-5 stroke-[2.5]" />}
              </div>

              {/* Content text */}
              <div className="flex-grow space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  {item.isNew && (
                    <span className="bg-[#B30000] text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                      NEW
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                </div>

                {/* Custom description coloring logic */}
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {/* Conditional Actions */}
                {item.type === 'new-task' && (
                  <div className="flex items-center gap-2 pt-3">
                    <button
                      className="px-4 py-1.5 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                      onClick={() => navigate(`/projects/${item.link}`)}>
                      View Task
                    </button>
                    <button className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors">
                      Later
                    </button>
                  </div>
                )}

                {item.type === 'achievement' && (
                  <button
                    className="flex items-center gap-1 text-xs font-bold text-[#B30000] hover:underline pt-2"
                    onClick={() => navigate(`/certificate`)}>
                    <Download className="w-3.5 h-3.5" />
                    Download Certificate
                  </button>
                )}
              </div>

              {/* Time */}
              <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap self-start md:absolute md:top-5 md:right-5">
                {item.time}
              </span>
            </div>
          ))}
        </div>

        {/* Header Section YESTERDAY */}
        <div className="space-y-3 pt-2">
          <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            YESTERDAY
          </h2>

          {notifications.filter(n => n.group === "YESTERDAY").map((item) => (
            <div
              key={item.id}
              className="relative flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-xl"
            >
              <div className="p-2.5 bg-gray-200 text-gray-500 rounded-xl">
                <Info className="w-5 h-5" />
              </div>
              <div className="flex-grow space-y-1">
                <h3 className="text-sm font-bold text-gray-700">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
              <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap md:absolute md:top-5 md:right-5">
                {item.time}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}