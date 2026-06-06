import { useState } from "react";

// Mock Data Profile awal
const mockProfileData = {
  fullName: "JonathanKristina",
  email: "JonathanKristina@gmail.com",
  bio: "UIUX holic"
};

export default function SettingsContent() {
  const [formData, setFormData] = useState(mockProfileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi penyimpanan data sukses
    alert("Changes saved successfully!");
    console.log("Saved Data:", formData);
  };

  // Mendapatkan inisial huruf pertama untuk avatar profile gambar
  const initialLetter = formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "U";

  return (
    <div className="container">

      {/* Header Title */}
      <div className="mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="page-title-desc">
          Manage and edit your profile and account information.
        </p>
      </div>

      {/* White Card Container */}
      <div className="w-full bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Profile Information</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Update your photo and personal details.
          </p>
        </div>

        {/* Card Body & Form */}
        <form onSubmit={handleSaveChanges} className="p-6 space-y-6">
          
          {/* Profile Photo Display Row */}
          <div className="flex items-center gap-4 py-2">
            <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                {initialLetter}
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900">Profile Photo</h3>
              <p className="text-sm text-gray-600 mt-0.5">{formData.fullName}</p>
            </div>
          </div>

          <hr className="border-t border-dashed border-gray-200" />

          {/* Grid Inputs (Full Name & Email Address) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Field: Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-gray-700 uppercase block">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white font-medium"
              />
            </div>

            {/* Field: Email Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-wider text-gray-700 uppercase block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white font-medium"
              />
            </div>
          </div>

          {/* Field: Professional Bio */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-gray-700 uppercase block">
              Professional Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors bg-white font-medium resize-none"
            />
            <p className="text-[11px] text-gray-700 font-normal pt-0.5">
              Brief description for your profile. URLs and @mentions are allowed.
            </p>
          </div>

          {/* Form Action Footer Row */}
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