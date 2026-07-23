import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiCheckDoubleLine } from "react-icons/ri";
import { Check } from "lucide-react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { io } from "socket.io-client";
import * as NotificationService from "../../services/NotificationService";
import type { UINotification, BackendNotification } from "../../types/notification.types";
import mailRafiki from '../../assets/Mail-rafiki.svg'
import { customToast } from "../utils/showToast";

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
        // const unread = data.filter((n) => !n.is_read);
        // const mapped = unread.map(NotificationService.mapNotificationToUI);
        const mapped = data.map(NotificationService.mapNotificationToUI);
        setNotifications(mapped);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    loadNotifications();

    const token = getCookieToken();
    if (!token) return;

    const socketUrl = import.meta.env.VITE_API_BASE_URL;
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

  const handleMarkAllRead = async () => {
    try {
      const res = await NotificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
      customToast.success("Berhasil", res.message);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal menandai semua notifikasi.";
      customToast.error("Gagal", msg);
    }
  };

  const handleReadMessage = async (id: number) => {
    try {
      const res = await NotificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isNew: false } : n))
      );
      customToast.success("Ditandai dibaca", res.message);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal menandai notifikasi.";
      customToast.error("Gagal", msg);
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
          className="flex items-center gap-1.5 self-start sm:self-center px-4 py-2 border border-gray-100 rounded-lg text-xs font-semibold text-red bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RiCheckDoubleLine className="w-4 h-4 text-red stroke-[3]" />
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-14 gap-3">
          <img src={mailRafiki} alt="empty notification" className="w-[280px]" />
          <p className="text-lg text-font">Belum ada pesan notifikasi yang diterima</p>
        </div>
      )}

      <div className="space-y-6">
        {/* SECTION TODAY */}
        {notifications.filter((n) => n.group === "TODAY").length > 0 && (
          <div className="space-y-3">
            {notifications
              .filter((n) => n.group === "TODAY")
              .map((item) => (
                <div
                  key={item.id}
                  className={`relative flex items-start gap-4 p-5 bg-white border border-gray-200/80 rounded-xl shadow-sm ${item.isNew ? "border-l-4 border-l-[#B30000]" : ""
                    }`}
                >
                  {/* Icon Container */}
                  <div
                    className={`p-2.5 rounded-xl ${item.isNew
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {item.type === "new-task" ? (
                      <LuFileSpreadsheet className="w-5 h-5" />
                    ) : item.type === "achievement" ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <MdOutlineEmail className="w-5 h-5" />
                    )}
                  </div>

                  {/* Content Text */}
                  <div className="flex-grow space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.isNew && (
                        <span className="bg-[#B30000] text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                          NEW
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                      {item.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3">
                      {item.link && (
                        <button
                          className="px-4 py-1.5 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                          onClick={() => navigate(`${item.link}`)}
                        >
                          View Task
                        </button>
                      )}
                      {item.isNew && (
                        <button
                          className="px-4 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                          onClick={() => handleReadMessage(item.id)}
                        >
                          Later
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap self-start md:absolute md:top-5 md:right-5">
                    {item.time}
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* SECTION YESTERDAY / SEBELUMNYA */}
        {notifications.filter((n) => n.group !== "TODAY").length > 0 && (
          <div className="space-y-3 pt-4">
            {/* Subheader Title */}
            <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase">
              YESTERDAY
            </h2>

            {notifications
              .filter((n) => n.group !== "TODAY")
              .map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-start gap-4 p-5 bg-gray-100/70 border border-gray-200/50 rounded-xl"
                >
                  {/* Icon Container Gray */}
                  <div className="p-2.5 rounded-xl bg-gray-200/60 text-gray-500">
                    {item.type === "new-task" ? (
                      <LuFileSpreadsheet className="w-5 h-5" />
                    ) : item.type === "achievement" ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <MdOutlineEmail className="w-5 h-5" />
                    )}
                  </div>

                  {/* Content Text */}
                  <div className="flex-grow space-y-1">
                    <h3 className="text-sm font-bold text-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                      {item.description}
                    </p>

                    {/* Action Button untuk Yesterday jika ada */}
                    {item.link && (
                      <div className="pt-2">
                        <button
                          className="text-xs font-bold text-[#B30000] hover:underline flex items-center gap-1"
                          onClick={() => navigate(`${item.link}`)}
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap self-start md:absolute md:top-5 md:right-5">
                    {item.time}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}