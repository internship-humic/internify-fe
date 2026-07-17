import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import { useMentorDetail, useUpdateMentor } from "../hooks/useMentors";
import type { UpdateMentorPayload } from "../types/user.types";
const EditMentorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mentorId = id ? parseInt(id, 10) : null;

  const { mentor, loading: fetching, error: fetchError } = useMentorDetail(mentorId);
  const { updateMentor, loading: updating, error: updateError } = useUpdateMentor();

  const [form, setForm] = useState({
    nama_depan: "",
    nama_belakang: "",
    email: "",
    password: "",
    signature: "",
    professional_bio: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Populate form once mentor data is loaded
  useEffect(() => {
    if (mentor) {
      setForm({
        nama_depan: mentor.nama_depan ?? "",
        nama_belakang: mentor.nama_belakang ?? "",
        email: mentor.email ?? "",
        password: "",
        signature: mentor.signature ?? "",
        professional_bio: mentor.professional_bio ?? "",
      });
      if (mentor.profile_picture) {
        setPreview(mentor.profile_picture);
      }
    }
  }, [mentor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfilePicture(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorId) return;

    const payload: UpdateMentorPayload = {
      nama_depan: form.nama_depan || undefined,
      nama_belakang: form.nama_belakang || undefined,
      email: form.email || undefined,
      signature: form.signature || undefined,
      professional_bio: form.professional_bio || undefined,
      ...(form.password ? { password: form.password } : {}),
      ...(profilePicture ? { profile_picture: profilePicture } : {}),
    };

    const result = await updateMentor(mentorId, payload);
    if (result) {
      alert("Data mentor berhasil diperbarui!");
      navigate("/mentor-admin");
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen w-full overflow-hidden">
        <NavbarAdmin />
        <div className="flex flex-row">
          <SidebarAdmin />
          <div className="p-10 w-full flex items-center justify-center">
            <p className="text-gray-500">Memuat data mentor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError || !mentor) {
    return (
      <div className="min-h-screen w-full overflow-hidden">
        <NavbarAdmin />
        <div className="flex flex-row">
          <SidebarAdmin />
          <div className="p-10 w-full flex items-center justify-center">
            <p className="text-red-500">{fetchError ?? "Mentor tidak ditemukan."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />

      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col w-full">
          {/* Header */}
          <div className="flex flex-row justify-between items-center mb-[40px]">
            <div>
              <button
                className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-2 cursor-pointer"
                onClick={() => navigate("/mentor-admin")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Kembali
              </button>
              <h2 className="text-[24px] font-semibold">Edit Mentor</h2>
              <p className="text-sm text-gray-500 mt-1">
                Mengedit data: <span className="font-medium text-gray-700">{mentor.full_name}</span>
              </p>
            </div>
          </div>

          {updateError && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {updateError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
            {/* Nama Depan */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nama Depan</label>
              <input
                type="text"
                name="nama_depan"
                value={form.nama_depan}
                onChange={handleChange}
                placeholder="Contoh: Budi"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Nama Belakang */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nama Belakang</label>
              <input
                type="text"
                name="nama_belakang"
                value={form.nama_belakang}
                onChange={handleChange}
                placeholder="Contoh: Santoso"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="mentor@example.com"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Password{" "}
                <span className="text-gray-400 font-normal text-xs">(kosongkan jika tidak ingin mengubah)</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password baru (opsional)"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Signature */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Signature</label>
              <input
                type="text"
                name="signature"
                value={form.signature}
                onChange={handleChange}
                placeholder="Tanda tangan / jabatan"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Professional Bio */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Bio Profesional</label>
              <textarea
                name="professional_bio"
                value={form.professional_bio}
                onChange={handleChange}
                rows={4}
                placeholder="Ceritakan pengalaman dan keahlian mentor..."
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent resize-none"
              />
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Foto Profil</label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover mb-2 border border-gray-200"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#1F4A92] file:text-white hover:file:bg-[#677c9f] cursor-pointer"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => navigate("/mentor-admin")}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-3 rounded-xl bg-[#1F4A92] hover:bg-[#677c9f] text-white text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updating ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMentorForm;
