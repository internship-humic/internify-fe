// services/NotificationService.ts
import api from "../lib/api";
import type { Notification } from "../types/certificate.types";

// GET /notification-api
export const getNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notification-api");
  return res.data.data;
};

// PATCH /notification-api/read-all
export const markAllNotificationsRead = async (): Promise<void> => {
  await api.patch("/notification-api/read-all");
};

// PATCH /notification-api/{id}/read
export const markNotificationRead = async (id: number): Promise<Notification> => {
  const res = await api.patch(`/notification-api/${id}/read`);
  return res.data.data;
};