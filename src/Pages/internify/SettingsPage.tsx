import { useState, useRef, useEffect } from "react";
import { useCurrentUser, useUpdateProfile, resolveFileUrl, getInitials } from "../../hooks/useUser";
import { customToast } from "../utils/showToast";
import { Pen } from "lucide-react";
import UpdateProfileDialog from "./UpdateProfileDialogue";

export default function SettingsPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const { save, loading: saving, msgRef } = useUpdateProfile();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isIntern = user?.role === "intern";
  const hasPendingChanges = isIntern && (user?.changes ?? 0) > 0;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;

    setFormData({
      fullName: user.full_name || "",
      email: user.email || "",
      bio: user.professional_bio || "",
    });

    setPhotoFile(null);
    setPhotoPreview(resolveFileUrl(user.profile_picture));
    setImageError(false);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setImageError(false);

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCancelPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(resolveFileUrl(user?.profile_picture));
    setImageError(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    const errors = { fullName: "", email: "" };

    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.email.trim()) errors.email = "Email address is required.";

    setFormErrors(errors);
    return !errors.fullName && !errors.email;
  };

  const handleSaveChanges = async () => {
    setConfirmOpen(false);
    if (!validateForm()) return;

    const emailChanged =
      formData.email.trim().toLowerCase() !== (user?.email ?? "").trim().toLowerCase();

    try {
      await customToast.promise(
        save({
          full_name: formData.fullName,
          email: formData.email,
          professional_bio: formData.bio,
          profile_picture: !isIntern && photoFile ? photoFile : undefined,
        }),
        {
          loading: "Menyimpan perubahan...",
          success: () => ({
            title: "Perubahan berhasil disimpan!",
            description: emailChanged
              ? "Email berubah, silakan login ulang..."
              : msgRef.current.success ?? "",
          }),
          error: () => ({
            title: "Gagal menyimpan perubahan!",
            description: msgRef.current.error ?? "",
          }),
        }
      );

      // email berubah -> sesi lama tidak valid lagi, paksa login ulang
      if (emailChanged) {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setTimeout(() => {
          window.location.href = "/login-internify";
        }, 1200);
        return;
      }

      setPhotoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch { }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  if (userLoading) {
    return (
      <div className="space-y-4 mt-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-box-secondary rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Header Title */}
      <div className="mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="page-title-desc">
          Manage and edit your profile and account information.
        </p>
      </div>

      {/* White Card Container */}
      <div className="w-full bg-white rounded-xl border border-box-border shadow-lg overflow-hidden">

        {/* Card Header */}
        <div className="p-6 border-b border-box-border">
          <h2 className="text-[20px] font-bold text-foreground">Profile Information</h2>
          <p className="text-xs text-foreground mt-0.5">
            Update your photo and personal details.
          </p>
        </div>

        {/* Card Body & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-center gap-5 py-2">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-xl border border-card-outline overflow-hidden bg-red flex items-center justify-center shadow-sm">
                {photoPreview && !imageError ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <p className="text-lg font-bold text-white">{getInitials(user?.full_name) || "U"}</p>
                )}
              </div>
              {!isIntern && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-red rounded-full flex items-center justify-center shadow border-2 border-white hover:bg-red-800 transition-colors"
                  title="Edit photo"
                >
                  <Pen className="text-white w-2.5 h-2.5" />
                </button>
              )}
            </div>

            {!isIntern ? (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Profile Photo</h3>
                <p className="text-xs text-gray-400 mb-3">
                  JPG, GIF or PNG. Recommended size 800x800px. Max size of 800K.
                </p>
                {photoFile && (
                  <p className="text-xs text-blue-500 mb-2 font-medium">{photoFile.name}</p>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-1.5 bg-red hover:bg-red-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Upload New
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPhoto}
                    disabled={!photoFile}
                    className="px-4 py-1.5 bg-white border border-box-border text-gray-600 hover:bg-gray-50 text-xs font-bold rounded-lg transition-colors disabled:opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Nama</h3>
                <p className="text-base text-font-shade font-medium">
                  {user?.full_name || formData.fullName || "User"}
                </p>
                <p className="text-[13px] text-font font-medium">
                  {user.kelompok_peminatan}
                </p>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <hr className="border-t border-dashed border-box-border" />

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-gray-700 uppercase block">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={hasPendingChanges}
                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-800 focus:outline-none transition-colors bg-white font-medium disabled:bg-gray-100 disabled:text-gray-500 ${formErrors.fullName ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600" : "border-box-border focus:border-red-600 focus:ring-1 focus:ring-red-600"}`}
              />
              {formErrors.fullName && (
                <p className="text-[11px] text-red-600">{formErrors.fullName}</p>
              )}
              {hasPendingChanges && (
                <p className="text-[11px] text-gray-500">
                  Nama hanya bisa diubah satu kali dan sudah pernah diubah.
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-gray-700 uppercase block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-800 focus:outline-none transition-colors bg-white font-medium ${formErrors.email ? "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600" : "border-box-border focus:border-red-600 focus:ring-1 focus:ring-red-600"}`}
              />
              {formErrors.email && (
                <p className="text-[11px] text-red-600">{formErrors.email}</p>
              )}
              <p className="text-[11px] text-gray-500 font-normal pt-0.5">
                Mengubah email akan mengakhiri sesi — kamu harus login ulang.
              </p>
            </div>
          </div>

          {/* Professional Bio */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-gray-700 uppercase block">
              Professional Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-box-border rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white font-medium resize-none"
            />
            <p className="text-[11px] text-gray-500 font-normal pt-0.5">
              Brief description for your profile. URLs and @mentions are allowed.
            </p>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-red hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors uppercase tracking-wider disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>

      <UpdateProfileDialog
        isOpen={confirmOpen}
        isIntern={isIntern}
        loading={saving}
        onConfirm={handleSaveChanges}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}