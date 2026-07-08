export interface BackendNotification {
  id: number;
  id_user: number | null;
  id_admin: number | null;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  link: string | null;
}

export interface UINotification {
  id: number;
  type: string; // "new-task" | "achievement" | "system"
  title: string;
  time: string;
  isNew: boolean;
  group: "TODAY" | "YESTERDAY";
  description: string;
  link: string;
}
