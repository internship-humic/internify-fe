import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { LuUserPlus, LuMail, LuBriefcase, LuFolderOpen } from "react-icons/lu";

interface AddInternsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddInternsModal({ isOpen, onClose }: AddInternsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Form States
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [projectName, setProjectName] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, position, projectName };
    console.log("Adding Intern:", payload);
    alert("Intern Added Successfully!");
    onClose();
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
        
        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold tracking-wide text-foreground">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <LuMail className="w-4 h-4 stroke-[2]" />
            </span>
            <input
              type="email"
              required
              placeholder="intern.name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-sm font-medium border border-border rounded-radius text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Position */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold tracking-wide text-foreground">
            Position
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <LuBriefcase className="w-4 h-4 stroke-[2]" />
            </span>
            <select
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={`w-full pl-10 pr-9 py-2.5 bg-white text-sm font-medium appearance-none cursor-pointer border border-border rounded-radius focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground`}
            >
              <option value="" disabled>Select position</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Fullstack Developer</option>
              <option value="designer">UI/UX Designer</option>
              <option value="mobile">Mobile Developer</option>
              <option value="devops">DevOps Engineer</option>
              <option value="qa">QA Engineer</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Project Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold tracking-wide text-foreground">
            Project Name
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <LuFolderOpen className="w-4 h-4 stroke-[2]" />
            </span>
            <select
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`w-full pl-10 pr-9 py-2.5 bg-white text-sm font-medium appearance-none cursor-pointer border border-border rounded-radius focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground`}
            >
              <option value="" disabled>Select project assignment</option>
              <option value="internify">Internify Project</option>
              <option value="rekrutmen">Rekrutmen Digital Platform</option>
              <option value="ecommerce">E-Commerce Analytics Dashboard</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-border">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

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
            className="flex-1 py-2.5 text-sm font-bold text-white bg-primary hover:bg-danger rounded-radius shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <LuUserPlus className="w-4 h-4 stroke-[2.5]" />
            Add Member
          </button>
        </div>

      </form>
    </dialog>
  );
}