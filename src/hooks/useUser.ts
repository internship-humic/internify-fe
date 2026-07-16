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
  store = { ...store, ...patch };
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const getSnapshot = () => store;

export const setCurrentUser = (user: CurrentUser | null) => {
  setStore({ user, loading: false, error: null });
};

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
      clearCurrentUser();
      return data;
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Terjadi kesalahan. Coba beberapa saat lagi.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
};

// Ambil 2 huruf (nama depan + nama belakang user)
export const getInitials = (fullName?: string | null): string => {
  if (!fullName) return "U";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Untuk resolve gambar (duplikat dari utils/...)
export const resolveFileUrl = (path?: string | null): string | null => {
  if (!path) return null;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.VITE_API_BASE_URL as string;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

// PATCH /auth-api/update-profile
export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const save = async (payload: UpdateProfilePayload) => {
    setLoading(true);
    try {
      const updated = await updateProfile(payload);
      setCurrentUser(updated.data);
      return updated;
;    } catch (err: any) {
      const message = (err?.response?.data?.message, "Gagal menyimpan perubahan.");
      throw new Error(message)
    } finally {
      setLoading(false);
    }
  };

  return { save, loading };
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