// hooks/useUser.ts
import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { loginUser, getProfile, updateProfile } from "../services/UserService";
import type { Mahasiswa } from "../types/project.types";
import { getMahasiswa } from "../services/MahasiswaService";
import type { CurrentUser, UpdateProfilePayload } from "../types/user.types";


type UserStore = {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
};

let store: UserStore = { user: null, loading: true, error: null };
const listeners = new Set<() => void>();

const setStore = (patch: Partial<UserStore>) => {
  store = { ...store, ...patch }; // objek baru -> getSnapshot berubah referensinya
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const getSnapshot = () => store;

//  useUpdateProfile setelah PATCH sukses -> broadcast ke semua konsumen
export const setCurrentUser = (user: CurrentUser | null) => {
  setStore({ user, loading: false, error: null });
};

// dipakai saat logout
export const clearCurrentUser = () => {
  fetched = false;
  inflight = null;
  setStore({ user: null, loading: false, error: null });
};

let fetched = false;
let inflight: Promise<void> | null = null;

const fetchUser = (): Promise<void> => {
  if (inflight) return inflight;

  setStore({ loading: true, error: null });

  inflight = getProfile()
    .then((u) => {
      fetched = true;
      setStore({ user: u, loading: false, error: null });
    })
    .catch(() => {
      setStore({ loading: false, error: "Gagal memuat data user." });
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
};

export const useCurrentUser = () => {
  const snap = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    if (!fetched && !inflight) fetchUser();
  }, []);

  const refetch = useCallback(() => {
    fetched = false;
    return fetchUser();
  }, []);

  return { user: snap.user, loading: snap.loading, error: snap.error, refetch };
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
      clearCurrentUser(); // buang user lama agar tidak bocor antar-sesi
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

export const getInitials = (fullName?: string | null): string => {
  if (!fullName) return "U";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};


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

      setCurrentUser(updated);

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
          message = apiMessage || "Anda tidak memiliki izin untuk mengubah data ini.";
          break;
        case 409:
          message = apiMessage || "Email sudah digunakan, atau nama sudah pernah diubah.";
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