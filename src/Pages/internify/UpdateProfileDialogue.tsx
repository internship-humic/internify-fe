import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface UpdateProfileDialogProps {
  isOpen: boolean;
  isIntern: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function UpdateProfileDialog({
  isOpen,
  isIntern,
  loading = false,
  onConfirm,
  onClose,
}: UpdateProfileDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => e.preventDefault();

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="hidden open:flex fixed inset-0 m-auto h-fit max-h-[90vh] w-[90vw] max-w-md flex-col overflow-hidden rounded-xl border border-box-border p-0 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === dialogRef.current && !loading) onClose();
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5 border-b border-box-border">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Simpan Perubahan</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 overflow-y-auto">
        <p className="text-sm text-font-shade leading-relaxed">
          Perubahan pada profil kamu akan langsung diterapkan setelah dikonfirmasi.
        </p>

        {/* Peringatan khusus intern: identitas hanya bisa diubah 1x */}
        {isIntern && (
          <div className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-bold text-amber-900 mb-0.5">Perubahan bersifat permanen</p>
              <p className="text-amber-800">
                Sebagai intern, kamu hanya dapat mengubah data identitas{" "}
                <span className="font-bold">satu kali</span>. Data ini akan dipakai untuk
                pencetakan sertifikat, jadi pastikan penulisannya sudah sesuai.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 px-5 py-4 border-t border-box-border bg-gray-50/60">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 bg-white border border-box-border text-gray-600 hover:bg-gray-50 text-xs font-bold rounded-lg transition-colors disabled:opacity-60"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="px-5 py-2 bg-[#B30000] hover:bg-[#990000] text-white text-xs font-bold rounded-lg shadow-sm transition-colors uppercase tracking-wider disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Ya, Simpan"}
        </button>
      </div>
    </dialog>
  );
}