// services/UserService.ts
import api from "../lib/api";
import type { CurrentUser, UpdateProfilePayload } from "../types/user.types";
import type { Mahasiswa, MahasiswaResponse } from "../types/project.types";

// POST /auth-api/login
export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const res = await api.post("/auth-api/login", payload);
  return res.data.data;
};

// GET /auth-api/me
export const getProfile = async (): Promise<CurrentUser> => {
  const res = await api.get("/auth-api/me");
  return res.data.data;
};

// PATCH /auth-api/update-profile
export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<CurrentUser> => {
  const parts = (payload.full_name ?? "").trim().split(/\s+/).filter(Boolean);
  const namaDepan = parts[0] ?? "";
  const namaBelakang = parts.slice(1).join(" ");

  if (payload.profile_picture instanceof File) {
    const formData = new FormData();

    if (payload.full_name !== undefined) {
      formData.append("nama_depan", namaDepan);
      formData.append("nama_belakang", namaBelakang);
    }
    if (payload.email !== undefined) formData.append("email", payload.email);
    if (payload.professional_bio !== undefined)
      formData.append("professional_bio", payload.professional_bio);

    formData.append("profile_picture", payload.profile_picture);

    const res = await api.patch("/auth-api/update-profile", formData);
    return res.data.data;
  }
  const body: Record<string, unknown> = {};
  if (payload.full_name !== undefined) {
    body.nama_depan = namaDepan;
    body.nama_belakang = namaBelakang;
  }
  if (payload.email !== undefined) body.email = payload.email;
  if (payload.professional_bio !== undefined) {
    body.professional_bio = payload.professional_bio;
  }

  if (typeof payload.profile_picture === "string") {
    body.profile_picture = payload.profile_picture;
  }

  const res = await api.patch("/auth-api/update-profile", body);
  return res.data.data;
};

export const getMahasiswa = async (): Promise<Mahasiswa[]> => {
  const response = await api.get<MahasiswaResponse>("/mahasiswa-api/get");
  return response.data.data;
};
