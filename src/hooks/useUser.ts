// hooks/useUser.ts
import { useState, useEffect, useCallback } from "react";
import { loginUser, getProfile, updateProfile } from "../services/UserService";
import type { Mahasiswa } from "../types/project.types";
import { getMahasiswa } from "../services/MahasiswaService";
import type { CurrentUser, UpdateProfilePayload } from "../types/user.types";
import { useRef } from "react";

// GET /auth-api/me — ambil data user yang sedang login
export const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    getProfile()
      .then(setUser)
      .catch(() => setError("Gagal memuat data user."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { user, loading, error, refetch };
};

// POST /auth-api/login
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      return data; // { token }
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 400) {
        setError("Email atau password salah.");
      } else {
        setError("Terjadi kesalahan. Coba beberapa saat lagi.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
};

export const DEFAULT_AVATAR = "https://placehold.co/150";

export const resolveFileUrl = (path?: string | null): string | null => {
  if (!path) return null;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.VITE_API_BASE_URL as string;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

// PATCH /auth-api/update-profile
export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const msgRef = useRef<{ success: string | null; error: string | null }>({
    success: null,
    error: null,
  });

  const save = async (payload: UpdateProfilePayload) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    msgRef.current = { success: null, error: null };

    try {
      const updated = await updateProfile(payload);

      const msg = "Profile updated successfully!";
      msgRef.current.success = msg;
      setSuccessMsg(msg);
      return updated;
    } catch (err: any) {
      const status = err?.response?.status;
      const apiMessage = err?.response?.data?.message;

      let message: string;
      switch (status) {
        case 400:
          message =
            apiMessage ||
            "Data yang dikirim tidak valid. Periksa kembali isian Anda.";
          break;
        case 401:
          message = "Sesi Anda telah berakhir. Silakan login kembali.";
          break;
        case 403:
          message = "Anda tidak memiliki izin untuk mengubah profil ini.";
          break;
        case 413:
          message = "Ukuran file terlalu besar. Maksimal 2MB.";
          break;
        case 417:
          message = apiMessage || "Validasi gagal. Periksa kembali isian Anda.";
          break;
        case 500:
          message = "Terjadi kesalahan di server. Coba beberapa saat lagi.";
          break;
        default:
          message = apiMessage || "Failed to save changes.";
      }

      msgRef.current.error = message;
      setError(message);

      // WAJIB throw — kalau `return null`, toast selalu masuk cabang success.
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { save, loading, error, successMsg, setSuccessMsg, setError, msgRef };
};

// Ambil Seluruh Mahasiswa
export const useMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getMahasiswa()
      .then(setMahasiswa)
      .catch(() => setError("Gagal memuat data mahasiswa."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { mahasiswa, loading, error, refetch };
};
