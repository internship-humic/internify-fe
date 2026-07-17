import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import { useCreateMentor } from "../hooks/useMentors";
import type { CreateMentorPayload } from "../types/user.types";

const CreateMentorForm = () => {
  const navigate = useNavigate();
  const { createMentor, loading, error } = useCreateMentor();

  const [form, setForm] = useState<Omit<CreateMentorPayload, "profile_picture">>({
    nama_depan: "",
    nama_belakang: "",
    full_name: "",
    email: "",
    password: "",
    signature: "",
    professional_bio: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateMentorPayload = {
      ...form,
      full_name: `${form.nama_depan} ${form.nama_belakang}`.trim(),
      ...(profilePicture ? { profile_picture: profilePicture } : {}),
    };

    const result = await createMentor(payload);
    if (result) {
      alert("Mentor berhasil dibuat!");
      navigate("/mentor-admin");
    }
  };

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
              <h2 className="text-[24px] font-semibold">Tambah Mentor</h2>
            </div>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
            {/* Nama Depan */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Nama Depan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_depan"
                value={form.nama_depan}
                onChange={handleChange}
                required
                placeholder="Contoh: Budi"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Nama Belakang */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Nama Belakang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_belakang"
                value={form.nama_belakang}
                onChange={handleChange}
                required
                placeholder="Contoh: Santoso"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="mentor@example.com"
                className="px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4A92] focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Masukkan password"
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
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-[#1F4A92] hover:bg-[#677c9f] text-white text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Menyimpan..." : "Simpan Mentor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMentorForm;
