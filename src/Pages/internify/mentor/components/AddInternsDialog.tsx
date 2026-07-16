// ManageInternsModal.tsx
import { useRef, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { useAssignableInterns } from "../../../../hooks/useProjects";
import { useAssignMember } from '../../../../hooks/useProjects';
import type { ProjectMember } from '../../../../types/project.types';
import type { AssignableIntern } from '../../../../types/project.types';
import { customToast } from "../../../utils/showToast";

interface ManageInternsModalProps {
  isOpen: boolean;
  onClose: (finalMembers: ProjectMember[]) => void;
  projectId: number;
  initialMembers: ProjectMember[];
}

export default function ManageInternsModal({ isOpen, onClose, projectId, initialMembers }: ManageInternsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [invitedList] = useState<ProjectMember[]>(initialMembers);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const { interns, loading: loadingAssignableInterns } = useAssignableInterns();
  const { assign, loading: assigning } = useAssignMember();

  // Reset addedIds saat modal dibuka ulang
  useEffect(() => {
    if (isOpen) setAddedIds(new Set());
  }, [isOpen]);

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
      onClose(finalMembers);
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, addedIds]);

  // Semua ID yang sudah jadi member atau baru ditambahkan — tidak tampil di search
  const excludedIds = new Set([...invitedList.map(m => m.id), ...addedIds]);
  const searchResult = interns.filter(m =>
    !excludedIds.has(m.id) &&
    (m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${m.full_name}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Gabungan member lama + yang baru ditambah — dikirim ke parent saat close
  const newlyAddedMembers = interns
    .filter(i => addedIds.has(i.id))
    .map(i => ({
      id: i.id,
      id_user: i.id,
      full_name: i.full_name,
      email: i.email,
      avatar: "",
      kelompok_peminatan: i.kelompok_peminatan,
      professional_bio: "",
      position: i.position,
    } as ProjectMember));
  const finalMembers = [...invitedList, ...newlyAddedMembers];

  const handleAssign = async (intern: AssignableIntern) => {
    const result = await assign({ id_project: projectId, id_user: intern.id });
    if (result.success) {
      setAddedIds(prev => new Set([...prev, intern.id]));
      customToast.success('Intern added', result.message);
    } else {
      customToast.error('Failed to add', result.message);
    }
  };

  const getInitials = (m: AssignableIntern) =>
    m.full_name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  return (
    <dialog
      ref={dialogRef}
      className="custom-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose(finalMembers);
      }}
    >
      <div className="px-3 py-5">
        <div className="relative flex items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium shadow-sm"
          />
          <Search className="absolute right-3.5 w-4 h-4 text-gray-400" />
        </div>


        <div className="overflow-y-auto space-y-3 pr-1 flex-1 h-[170px]">
          {/* Member yang sudah ada — read-only, hapus dari tab Members */}
          {invitedList.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                  {getInitials(member as unknown as AssignableIntern)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{member.full_name}</span>
                  <span className="text-xs text-gray-400">{member.email}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wide">
                Member
              </span>
            </div>
          ))}

          {/* Hasil pencarian — belum jadi member */}
          {loadingAssignableInterns ? (
            <p className="text-sm text-gray-400 text-center py-2">Memuat...</p>
          ) : (
            searchResult.map((intern: AssignableIntern) => (
              <div key={intern.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                    {getInitials(intern)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{intern.full_name}</span>
                    <span className="text-xs text-gray-400">{intern.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAssign(intern)}
                  disabled={assigning}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ))
          )}

          {!loadingAssignableInterns && searchQuery && searchResult.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">Tidak ada mahasiswa ditemukan.</p>
          )}
        </div>
      </div>
    </dialog>
  );
}