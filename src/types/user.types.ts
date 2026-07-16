export interface CurrentUser {
  id: number;
  full_name: string;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  role: "mentor" | "intern" | "admin";
  professional_bio?: string;
  profile_picture?:  string | null;
  changes?: number;
  kelompok_peminatan: string;
  signature?: string;

}

export interface UpdateProfilePayload {
  full_name?: string;
  email?: string;
  professional_bio?: string;
  profile_picture?: File | string | null;
}

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