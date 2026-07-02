// hooks/useNotifications.ts
import { useState, useEffect, useCallback } from "react";
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "../services/NotificationService";
import type { BackendNotification } from "../types/notification.types";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<BackendNotification[]>([]);
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
      await markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch { setError("Gagal menandai semua notifikasi."); }
  };

  const markOneRead = async (id: number) => {
    try {
      await markAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch { setError("Gagal menandai notifikasi."); }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return { notifications, unreadCount, loading, error, refetch, markAllRead, markOneRead };
};