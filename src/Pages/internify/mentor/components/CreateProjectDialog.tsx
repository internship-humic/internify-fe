import { useRef, useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";
import {
  LuCode,
  LuAlbum,
  LuCloud,
  LuSmartphone,
  LuSettings,
  LuUsers,
  LuClipboardList,
  LuPenTool,
  LuLightbulb,
  LuShield,
  LuMail,
  LuSendHorizontal
} from "react-icons/lu";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // State Form Management
  const [selectedIcon, setSelectedIcon] = useState("code");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([
    "alex.dev@gmail.com",
    "sarah.engineer@gmail.com"
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Daftar Icon Pilihan di baris atas
  const projectIcons = [
    { id: "code", icon: LuCode },
    { id: "chart", icon: LuAlbum },
    { id: "cloud", icon: LuCloud },
    { id: "mobile", icon: LuSmartphone },
    { id: "settings", icon: LuSettings },
    { id: "users", icon: LuUsers },
    { id: "task", icon: LuClipboardList },
    { id: "design", icon: LuPenTool },
    { id: "idea", icon: LuLightbulb },
    { id: "secure", icon: LuShield },
  ];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Fungsi menambah email undangan baru
  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && !invitedEmails.includes(emailInput.trim())) {
      setInvitedEmails([...invitedEmails, emailInput.trim()]);
      setEmailInput("");
    }
  };

  // Fungsi menghapus email undangan
  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedEmails(invitedEmails.filter(email => email !== emailToRemove));
  };

  // Handler Submit Utama
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      icon: selectedIcon,
      name: projectName,
      description: projectDescription,
      emails: invitedEmails,
      startDate,
      endDate
    };
    console.log("Launching Project:", payload);
    alert("Project Launched Successfully!");
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="custom-dialog"
    >
      {/* Header Modal */}
      <div className="dialog-header">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Create New Project</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Launch a new internship assignment or trackable milestone.
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors mt-1"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Body Form Modal */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 md:space-y-5 overflow-y-auto flex-1">

        {/* Section: Select Project Icon */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 tracking-wide">
            Select Project Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {projectIcons.map((item) => {
              const IconComponent = item.icon;
              const isSelected = selectedIcon === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIcon(item.id)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border text-lg transition-all ${isSelected
                      ? "border-[#B30000] bg-red-50/50 text-[#B30000] ring-2 ring-[#B30000]/20 font-bold"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  <IconComponent className={isSelected ? "stroke-[2.5]" : "stroke-[2]"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Project Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">
            Project Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Q3 Infrastructure Upgrade"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
          />
        </div>

        {/* Section: Project Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">
            Project Description
          </label>
          <textarea
            rows={4}
            placeholder="Outline the project goals, deliverables, and technical requirements..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium resize-none leading-relaxed"
          />
        </div>

        {/* Section: Invite via Gmail */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 tracking-wide">
            Invite via Gmail
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400">
              <LuMail className="w-4 h-4 stroke-[2.5]" />
            </span>
            <input
              type="email"
              placeholder="intern.name@gmail.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddEmail(e);
                }
              }}
              className="w-full pl-10 pr-20 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="absolute right-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-bold rounded-md transition-colors tracking-wider uppercase"
            >
              ADD
            </button>
          </div>

          {/* Badges List Email */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {invitedEmails.map((email) => (
              <div
                key={email}
                className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200/60"
              >
                <span>{email}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEmail(email)}
                  className="text-gray-400 hover:text-gray-600 rounded-full p-0.5"
                >
                  <X className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Dates Grid (Start Date & End Date) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium appearance-none"
              />
              <span className="absolute right-3.5 top-3 text-gray-400 pointer-events-none">
                <Calendar className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium appearance-none"
              />
              <span className="absolute right-3.5 top-3 text-gray-400 pointer-events-none">
                <Calendar className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Action Row Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-[150px] py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-[240px] py-2.5 bg-[#B30000] hover:bg-[#990000] text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 tracking-wide"
          >
            Launch Project
            <LuSendHorizontal className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </form>
    </dialog>
  );
}