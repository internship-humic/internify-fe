import api from "../lib/api";
import type { CurrentUser, UpdateProfilePayload } from "../types/user.types";
import type { Mahasiswa, MahasiswaResponse } from "../types/project.types";

// POST /auth-api/login
export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<{ token: string, message: string }> => {
  const res = await api.post("/auth-api/login", payload);
  return { token: res.data.data.token, message: res.data.message };
};

// GET /auth-api/me
export const getProfile = async (): Promise<CurrentUser> => {
  const res = await api.get("/auth-api/me");
  return normalizeUser(res.data.data);
};

export const normalizeUser = (raw: any): CurrentUser => ({
  ...raw,
  full_name:
    raw.full_name ??
    `${raw.nama_depan ?? ""} ${raw.nama_belakang ?? ""}`.trim(),
});

// Mengembalikan inisial nama dari pengguna (Huruf pertama Nama depan dan huruf kedua Nama belakang)
export function getInitials(fullName: string | undefined | null): string {
  if (!fullName) return "U";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// PATCH /auth-api/update-profile
export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<{ data: CurrentUser, message: string }> => {
  const formData = new FormData();

  if (payload.full_name !== undefined) {
    formData.append("full_name", payload.full_name.trim());
  }
  if (payload.email !== undefined) formData.append("email", payload.email.trim());

  if (payload.professional_bio !== undefined) {
    formData.append("professional_bio", payload.professional_bio);
  }
  if (payload.profile_picture instanceof File) {
    formData.append("profile_picture", payload.profile_picture);
  }
  const res = await api.patch("/auth-api/update-profile", formData);
  if (!res.data?.status) {
    throw { response: { data: { message: res.data?.message } } };
  }
  return { data: normalizeUser(res.data.data), message: res.data.message };
};

export const getMahasiswa = async (): Promise<Mahasiswa[]> => {
  const response = await api.get<MahasiswaResponse>("/mahasiswa-api/get");
  return response.data.data;
};
