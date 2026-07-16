import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { PROJECT_ICON_MAP, PROJECT_ICON_CODES } from "../../../../lib/ProjectIcons";
import { LuSendHorizontal, LuMail } from "react-icons/lu";
import { useCreateProject } from "../../../../hooks/useProjects";
import type { CreateProjectPayload } from "../../../../types/project.types";
import { useAssignableInterns } from "../../../../hooks/useProjects";
import { customToast } from "../../../utils/showToast";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateProjectModal({ isOpen, onClose, onSuccess }: CreateProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedIcon, setSelectedIcon] = useState(PROJECT_ICON_CODES[0]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const { create, loading, error } = useCreateProject();
  const { interns: assignableInterns, loading: loadingInterns } = useAssignableInterns();
  const [showDropdown, setShowDropdown] = useState(false);
  const emailSectionRef = useRef<HTMLDivElement>(null);

  const projectIcons = PROJECT_ICON_CODES.map((id) => ({
    id,
    icon: PROJECT_ICON_MAP[id],
  }));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleAddEmail = (emailToAdd?: string) => {
    const email = (emailToAdd ?? emailInput).trim();
    if (email && !invitedEmails.includes(email)) {
      setInvitedEmails([...invitedEmails, email]);
      setEmailInput("");
      setShowDropdown(false);
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedEmails(invitedEmails.filter(email => email !== emailToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDateError("");

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      setDateError("Tanggal selesai tidak boleh lebih awal dari tanggal mulai.");
      return;
    }

    const payload: CreateProjectPayload = {
      project_icon: selectedIcon,
      project_name: projectName,
      description: projectDescription,
      start_date: startDate,
      end_date: endDate,
    };

    if (invitedEmails.length > 0) {
      payload.member_emails = invitedEmails;
    }

    const result = await create(payload);
    if (result.success) {
      onSuccess?.();
      onClose();
      customToast.success("Project berhasil dibuat!", (result.message));
    } else {
      customToast.error("Gagal membuat project", (result.message));
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="custom-dialog"
    >
      {/* Header Modal */}
      <div className="dialog-header">
        <div className="px-3">
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
      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-3 md:space-y-4 overflow-y-auto flex-1">
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
                    ? "border-red bg-red-foreground text-red ring-2 ring-red/20 font-bold"
                    : "border-card-outline bg-card text-font hover:bg-gray-100"
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
            className="w-full px-4 py-2.5 bg-white border border-card-outline rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
          />
        </div>

        {/* Section: Project Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 tracking-wide">
            Project Description
          </label>
          <textarea
            rows={3}
            placeholder="Outline the project goals, deliverables, and technical requirements..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-card-outline rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium resize-none leading-relaxed"
          />
        </div>

        {/* Section: Invite via Gmail */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 tracking-wide">
            Invite via Gmail
          </label>
          {/* Input email + dropdown sugesti intern */}
          <div ref={emailSectionRef} className="relative">
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400">
                <LuMail className="w-4 h-4 stroke-[2.5]" />
              </span>
              <input
                type="email"
                placeholder="intern.name@gmail.com"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddEmail();
                  }
                  if (e.key === 'Escape') setShowDropdown(false);
                }}
                className="w-full pl-10 pr-20 py-2.5 bg-white border border-card-outline rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
              />
              <button
                type="button"
                onClick={() => handleAddEmail()}
                className="absolute right-2 px-3 py-1 bg-card hover:bg-card-hover border border-card-outline text-font-shade text-[11px] font-bold rounded-md transition-colors tracking-wider uppercase"
              >
                ADD
              </button>
            </div>

            {/* Dropdown daftar intern */}
            {showDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-card-outline rounded-xl shadow-lg max-h-44 overflow-y-auto">
                {loadingInterns ? (
                  <p className="text-xs text-gray-400 text-center py-3">Memuat data intern...</p>
                ) : (() => {
                  const filtered = assignableInterns.filter(
                    (i) =>
                      !invitedEmails.includes(i.email) &&
                      (i.email.toLowerCase().includes(emailInput.toLowerCase()) ||
                        i.full_name.toLowerCase().includes(emailInput.toLowerCase()))
                  );
                  return filtered.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-3">Tidak ada intern ditemukan.</p>
                  ) : (
                    filtered.map((intern) => (
                      <button
                        key={intern.id}
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); handleAddEmail(intern.email); }}
                        className="w-full flex items-center gap-3 px-6 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-semibold text-gray-800 truncate">{intern.full_name}</span>
                          <span className="text-[11px] text-gray-400 truncate">{intern.email}</span>
                        </div>
                      </button>
                    ))
                  );
                })()}
              </div>
            )}
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
              Tanggal Mulai
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setDateError(""); }}
                className="w-full px-3 py-2.5 bg-white border border-card-outline rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium appearance-none"
              />
              <span className="absolute right-3.5 top-3 text-gray-400 pointer-events-none">
              </span>
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wide">
              Tanggal Berakhir
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setDateError(""); }}
                className="w-full px-3 py-2.5 bg-white border border-card-outline rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium appearance-none"
              />
              <span className="absolute right-3.5 top-3 text-gray-400 pointer-events-none">
              </span>
            </div>
          </div>
        </div>
        {dateError && (
          <p className="text-xs text-red font-medium">{dateError}</p>
        )}

        {error && (
          <p className="text-xs text-red text-center font-medium">{error}</p>
        )}

        {/* Action Row Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-[150px] py-2.5 border border-card-outline rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-[240px] py-2.5 bg-[#B30000] hover:bg-[#990000] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 tracking-wide"
          >
            {loading ? "Launching..." : "Launch Project"}
            <LuSendHorizontal className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </form>
    </dialog>
  );
}