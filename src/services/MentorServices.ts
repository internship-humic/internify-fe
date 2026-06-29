import api from "../lib/api";

export interface MentorData {
  id: number;
  nama_depan: string;
  nama_belakang: string;
  full_name: string;
  email: string;
  role: string;
  signature: string;
  profile_picture: string | null;
  professional_bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMentorPayload {
  nama_depan: string;
  nama_belakang: string;
  full_name: string;
  email: string;
  password: string;
  signature?: string;
  professional_bio?: string;
  profile_picture?: File;
}

export interface UpdateMentorPayload {
  nama_depan?: string;
  nama_belakang?: string;
  email?: string;
  password?: string;
  signature?: string;
  professional_bio?: string;
  profile_picture?: File;
}

const toFormData = (payload: CreateMentorPayload | UpdateMentorPayload): FormData => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value instanceof File ? value : String(value));
    }
  });
  return form;
};

export const createMentorService = async (payload: CreateMentorPayload): Promise<MentorData> => {
  const { data } = await api.post("/admin-api/mentors", toFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
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
): Promise<MentorData> => {
  const { data } = await api.patch(`/admin-api/mentors/${id}`, toFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteMentorService = async (id: number): Promise<void> => {
  await api.delete(`/admin-api/mentors/${id}`);
};