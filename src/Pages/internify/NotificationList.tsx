import { Check, Download, Info } from "lucide-react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useNotifications } from "../../hooks/useNotification"; 

function getGroup(created_at: string): "TODAY" | "YESTERDAY" | "OLDER" {
  const date = new Date(created_at);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "TODAY";
  if (diffDays === 1) return "YESTERDAY";
  return "OLDER";
}

function getTimeLabel(created_at: string): string {
  const date = new Date(created_at);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

function getNotifType(title: string): "new-task" | "achievement" | "system" {
  const lower = title.toLowerCase();
  if (lower.includes("task") || lower.includes("tugas")) return "new-task";
  if (lower.includes("certificate") || lower.includes("sertifikat")) return "achievement";
  return "system";
}

export default function NotificationList() {
  const { notifications, loading, error, markAllRead, markOneRead } = useNotifications();

  const todayNotifs = notifications.filter(n => getGroup(n.created_at) === "TODAY");
  const yesterdayNotifs = notifications.filter(n => getGroup(n.created_at) === "YESTERDAY");
  const olderNotifs = notifications.filter(n => getGroup(n.created_at) === "OLDER");

  if (loading) return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  const renderNotifCard = (item: typeof notifications[0], isOld = false) => {
    const type = getNotifType(item.title);

    return (
      <div
        key={item.id}
        onClick={() => { if (!item.is_read) markOneRead(item.id); }}
        className={`relative flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-colors
          ${isOld ? "bg-gray-50 border-gray-100" : "bg-white border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)]"}
          ${type === "new-task" && !isOld ? "border-l-4 border-l-[#B30000]" : ""}
        `}
      >
        {/* Icon */}
        <div className={`p-2.5 rounded-xl ${
          type === "new-task" ? "bg-red-50 text-red-600"
          : type === "achievement" ? "bg-green-50 text-green-600"
          : "bg-gray-200 text-gray-500"
        }`}>
          {type === "new-task" && <LuFileSpreadsheet className="w-5 h-5" />}
          {type === "achievement" && <Check className="w-5 h-5 stroke-[2.5]" />}
          {type === "system" && <Info className="w-5 h-5" />}
        </div>

        {/* Content */}
        <div className="flex-grow space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            {!item.is_read && (
              <span className="bg-[#B30000] text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                NEW
              </span>
            )}
            <h3 className={`text-sm font-bold ${isOld ? "text-gray-700" : "text-gray-900"}`}>
              {item.title}
            </h3>
          </div>
          <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
            {item.message}
          </p>

          {/* Actions */}
          {type === "new-task" && !isOld && (
            <div className="flex items-center gap-2 pt-3">
              <button className="px-4 py-1.5 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
                View Task
              </button>
              <button className="px-4 py-1.5 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors">
                Later
              </button>
            </div>
          )}
          {type === "achievement" && !isOld && (
            <button className="flex items-center gap-1 text-xs font-bold text-[#B30000] hover:underline pt-2">
              <Download className="w-3.5 h-3.5" />
              Download Certificate
            </button>
          )}
        </div>

        {/* Time */}
        <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap self-start md:absolute md:top-5 md:right-5">
          {getTimeLabel(item.created_at)}
        </span>
      </div>
    );
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
          onClick={markAllRead}
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
        {/* TODAY */}
        {todayNotifs.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Today</h2>
            {todayNotifs.map(n => renderNotifCard(n))}
          </div>
        )}

        {/* YESTERDAY */}
        {yesterdayNotifs.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Yesterday</h2>
            {yesterdayNotifs.map(n => renderNotifCard(n, true))}
          </div>
        )}

        {/* OLDER */}
        {olderNotifs.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Older</h2>
            {olderNotifs.map(n => renderNotifCard(n, true))}
          </div>
        )}
      </div>
    </div>
  );
}