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