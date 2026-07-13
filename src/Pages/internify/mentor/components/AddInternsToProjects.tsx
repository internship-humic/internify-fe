import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { LuUserPlus, LuUser, LuFolderOpen } from "react-icons/lu";
import { useAssignMember, useProjects } from "../../../../hooks/useProjects";
import { useAssignableInterns } from "../../../../hooks/useProjects";
import { customToast } from "../../../utils/showToast";

interface AddInternsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
}

export default function AddInternsModal({ isOpen, onClose, userId }: AddInternsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { assign, loading: assigning, error: assignError } = useAssignMember();
  const { projects, loading: loadingProjects } = useProjects("active");
  const { interns, loading: loadingInterns } = useAssignableInterns();

  console.log(projects)

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      // document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      // document.body.style.overflow = "unset";
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

  useEffect(() => {
    if (isOpen) {
      setSelectedUserId(userId !== null ? String(userId) : "");
      setSelectedProjectId("");
    }
  }, [isOpen, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;

    const res = await assign({
      id_project: Number(selectedProjectId),
      id_user: Number(selectedUserId),
    });
    if (res !== null) {
      customToast.success('Intern assigned', 'The intern has been successfully assigned to the project.');
      onClose();
    } else {
      customToast.error('Failed to assign', 'An error occurred while assigning the intern. Please try again.');
    }
  };

  return (
    <dialog ref={dialogRef} className="custom-dialog">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-primary rounded-t-2xl flex-shrink-0">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white tracking-tight leading-tight">
            Add Project Member
          </h2>
          <p className="text-xs font-medium mt-0.5 text-white/70">
            Assign a new intern to an active engineering squad.
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="bg-gray-100 px-6 py-6 space-y-4 overflow-y-auto flex-1">

        {/* Intern Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold tracking-wide text-foreground">
            Intern
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <LuUser className="w-4 h-4 stroke-[2]" />
            </span>
            <select
              required
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              disabled={loadingInterns}
              className="w-full pl-10 pr-9 py-2.5 bg-white text-sm font-medium appearance-none cursor-pointer border border-border rounded-radius focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground disabled:opacity-60"
            >
              <option value="" disabled>
                {loadingInterns ? "Memuat interns..." : "Pilih intern"}
              </option>
              {interns.map((intern) => (
                <option key={intern.id} value={intern.id}>
                  {intern.full_name}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Project Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold tracking-wide text-foreground">
            Project
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <LuFolderOpen className="w-4 h-4 stroke-[2]" />
            </span>
            <select
              required
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              disabled={loadingProjects}
              className="w-full pl-10 pr-9 py-2.5 bg-white text-sm font-medium appearance-none cursor-pointer border border-border rounded-radius focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground disabled:opacity-60"
            >
              <option value="" disabled>
                {loadingProjects ? "Memuat projects..." : "Pilih project"}
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {assignError && (
          <p className="text-xs text-red-600 font-medium">{assignError}</p>
        )}

        <div className="h-px bg-border/30" />

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold bg-white hover:bg-gray-50 border border-border rounded-radius text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={assigning}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-primary hover:bg-danger rounded-radius shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            <LuUserPlus className="w-4 h-4 stroke-[2.5]" />
            {assigning ? "Assigning..." : "Add Member"}
          </button>
        </div>

      </form>
    </dialog>
  );
}