import { useState, useEffect } from "react";
import api from "../lib/api";

export interface CurrentUser {
  id: number;
  full_name: string;
  email: string;
  role: "mentor" | "intern" | "admin";
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/auth-api/me")
      .then((res) => setUser(res.data.data))
      .catch(() => setError("Gagal memuat user."))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
};