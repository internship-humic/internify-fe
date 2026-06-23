import { useState, useRef } from "react";

const mockProfileData = {
  fullName: "JonathanKristina",
  email: "JonathanKristina@gmail.com",
  bio: "UIUX holic"
};

export default function MentorSettingsPage() {
  const [formData, setFormData] = useState(mockProfileData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Changes saved successfully!");
    console.log("Saved Data:", formData);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const initialLetter = formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "U";

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
        <form onSubmit={handleSaveChanges} className="p-6 space-y-6">

          {/* Profile Photo Row */}
          <div className="flex items-center gap-5 py-2">
            {/* Avatar dengan badge edit */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-xl border-2 border-red-100 overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-gray-900">{initialLetter}</span>
                )}
              </div>
              {/* Badge edit icon */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#B30000] rounded-full flex items-center justify-center shadow border-2 border-white hover:bg-[#990000] transition-colors"
                title="Edit photo"
              >
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                </svg>
              </button>
            </div>

            {/* Info & Action Buttons */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">Profile Photo</h3>
              <p className="text-xs text-gray-400 mb-3">
                JPG, GIF or PNG. Recommended size 800x800px. Max size of 800K.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-1.5 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                >
                  Upload New
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-4 py-1.5 bg-white border border-box-border text-gray-600 hover:bg-gray-50 text-xs font-bold rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>

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
                className="w-full px-3 py-2 border border-box-border rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white font-medium"
              />
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
                className="w-full px-3 py-2 border border-box-border rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white font-medium"
              />
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
              className="px-6 py-2 bg-[#B30000] hover:bg-[#990000] text-white font-bold text-xs rounded-lg shadow-sm transition-colors uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}