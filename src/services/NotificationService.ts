import api from "../lib/api";
import type { BackendNotification, UINotification } from "../types/notification.types";

export const getNotifications = async (): Promise<BackendNotification[]> => {
  const res = await api.get("/notification-api");
  return res.data.data;
};

export const markAllAsRead = async (): Promise<{ message: string }> => {
  const res = await api.patch("/notification-api/read-all");
  return { message: res.data.message };
};

export const markAsRead = async (
  id: number
): Promise<{ data: BackendNotification; message: string }> => {
  const res = await api.patch(`/notification-api/${id}/read`);
  return { data: res.data.data, message: res.data.message };
};

export const mapType = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("task") || t.includes("tugas")) return "new-task";
  if (t.includes("certificate") || t.includes("sertifikat") || t.includes("achievement")) return "achievement";
  return "system";
};

export const formatRelativeTime = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffMs < 0 || diffSec < 5) {
      return "Just now";
    }
    if (diffSec < 60) {
      return `${diffSec} seconds ago`;
    }
    if (diffMin < 60) {
      return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (diffHr < 24) {
      return `${diffHr} ${diffHr === 1 ? 'hour' : 'hours'} ago`;
    }
    if (diffDays === 1) {
      return "Yesterday";
    }
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    
    // Fallback to absolute date
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    return "Some time ago";
  }
};

export const mapGroup = (dateStr: string): "TODAY" | "YESTERDAY" => {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    
    // Grouping: TODAY or YESTERDAY
    // TODAY means today's calendar day
    const isToday = 
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
      
    if (isToday) {
      return "TODAY";
    }
    return "YESTERDAY";
  } catch (e) {
    return "YESTERDAY";
  }
};

export const mapNotificationToUI = (notif: BackendNotification): UINotification => {
  return {
    id: notif.id,
    type: mapType(notif.title),
    title: notif.title,
    time: formatRelativeTime(notif.created_at),
    isNew: !notif.is_read,
    link: notif.link ?? "",
    group: mapGroup(notif.created_at),
    description: notif.message,
  };
};
