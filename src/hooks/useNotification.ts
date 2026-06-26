// hooks/useNotifications.ts
import { useState, useEffect, useCallback } from "react";
import type { Notification } from "../types/certificate.types";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../services/NotificationService";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getNotifications()
      .then(setNotifications)
      .catch(() => setError("Gagal memuat notifikasi."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const markAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch { setError("Gagal menandai semua notifikasi."); }
  };

  const markOneRead = async (id: number) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch { setError("Gagal menandai notifikasi."); }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return { notifications, unreadCount, loading, error, refetch, markAllRead, markOneRead };
};