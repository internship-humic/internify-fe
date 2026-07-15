import { useEffect, useRef } from "react";
import { Archive, X } from "lucide-react";

interface ArchiveProjectDialogProps {
  isOpen: boolean;
  projectName: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ArchiveProjectDialog({
  isOpen,
  projectName,
  loading = false,
  onConfirm,
  onClose,
}: ArchiveProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} className="custom-dialog max-w-sm w-full">
      {/* Header */}
      <div className="dialog-header">
        <div className="flex items-center gap-2.5 px-3">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <Archive className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Arsipkan Project
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Tindakan ini akan menonaktifkan project
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          disabled={loading}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors mt-1 disabled:opacity-50"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          Apakah kamu yakin ingin mengarsipkan project{" "}
          <span className="font-semibold text-gray-900">"{projectName}"</span>?
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-xs text-red-700 leading-relaxed">
            <span className="font-bold">Perhatian:</span> Project yang diarsipkan
            tidak akan bisa diakses oleh intern dan tidak muncul di daftar aktif.
            Kamu masih bisa melihatnya di tab Archived.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Archive className="w-4 h-4" />
            {loading ? "Mengarsipkan..." : "Ya, Arsipkan"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
