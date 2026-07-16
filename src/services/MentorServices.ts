import api from "../lib/api";
import type { CreateMentorPayload, UpdateMentorPayload, MentorData } from "../types/user.types";

const toFormData = (payload: CreateMentorPayload | UpdateMentorPayload): FormData => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value instanceof File ? value : String(value));
    }
  });
  return form;
};

export const createMentorService = async (payload: CreateMentorPayload): Promise<{data: MentorData, message: string}> => {
  const { data } = await api.post<{data: MentorData, message: string}>("/admin-api/mentors", toFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getMentorsService = async (): Promise<MentorData[]> => {
  const { data } = await api.get("/admin-api/mentors");
  return data.data;
};

export const getMentorDetailService = async (id: number): Promise<MentorData> => {
  const { data } = await api.get(`/admin-api/mentors/${id}`);
  return data.data;
};

export const updateMentorService = async (
  id: number,
  payload: UpdateMentorPayload
): Promise<{ data: MentorData; message: string }> => {
  const { data } = await api.patch<{ data: MentorData; message: string }>(`/admin-api/mentors/${id}`, toFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteMentorService = async (id: number): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`/admin-api/mentors/${id}`);
  return data;
};