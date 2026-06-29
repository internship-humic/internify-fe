// services/UserService.ts
import api from "../lib/api";
import type { CurrentUser, UpdateProfilePayload } from "../hooks/useUser";
import type { Mahasiswa, MahasiswaResponse } from "../types/project.types"

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
  payload: UpdateProfilePayload
): Promise<CurrentUser> => {
  if (payload.profile_picture instanceof File) {
    const formData = new FormData();
    if (payload.full_name !== undefined) formData.append("full_name", payload.full_name);
    if (payload.email !== undefined) formData.append("email", payload.email);
    if (payload.professional_bio !== undefined) formData.append("professional_bio", payload.professional_bio);
    formData.append("profile_picture", payload.profile_picture);
    const res = await api.patch("/auth-api/update-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  }
  const res = await api.patch("/auth-api/update-profile", payload);
  return res.data.data;
};

export const getMahasiswa = async (): Promise<Mahasiswa[]> => {
  const response = await api.get<MahasiswaResponse>('/mahasiswa-api/get');
  return response.data.data;
};
