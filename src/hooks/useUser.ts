// hooks/useUser.ts
import { useState, useEffect, useCallback } from "react";
import { loginUser, getProfile, updateProfile } from "../services/UserService";
import type { Mahasiswa } from '../types/project.types';
import { getMahasiswa } from '../services/MahasiswaService';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CurrentUser {
  id: number;
  full_name: string;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  role: "mentor" | "intern" | "admin";
  professional_bio?: string;
  profile_picture?: string | null;
}

export interface UpdateProfilePayload {
  full_name?: string;
  email?: string;
  professional_bio?: string;
  profile_picture?: File | null;
}

// ─── useCurrentUser ───────────────────────────────────────────────────────────
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

// ─── useLogin ────────────────────────────────────────────────────────────────
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

// ─── useUpdateProfile ────────────────────────────────────────────────────────
// PATCH /auth-api/update-profile
export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const save = async (payload: UpdateProfilePayload) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const updated = await updateProfile(payload);
      setSuccessMsg("Profile updated successfully!");
      return updated;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save changes.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { save, loading, error, successMsg, setSuccessMsg, setError };
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
      .catch(() => setError('Gagal memuat data mahasiswa.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { mahasiswa, loading, error, refetch };
};