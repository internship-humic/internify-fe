// ManageInternsModal.tsx
import { useRef, useEffect, useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { useMahasiswa } from "../../../../hooks/useUser";
import { useAssignMember } from '../../../../hooks/useProjects';
import type { ProjectMember } from '../../../../types/project.types';
import type { Mahasiswa } from '../../../../types/project.types';

interface ManageInternsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  initialMembers: ProjectMember[];
}

export default function ManageInternsModal({ isOpen, onClose, projectId, initialMembers }: ManageInternsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [invitedList, setInvitedList] = useState<ProjectMember[]>(initialMembers);

  const { mahasiswa, loading: loadingMahasiswa } = useMahasiswa();
  const { assign, loading: assigning } = useAssignMember();

  // Sync saat modal dibuka
  useEffect(() => {
    if (isOpen) setInvitedList(initialMembers);
  }, [isOpen, initialMembers]);

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
    const handleCancel = (e: Event) => { e.preventDefault(); onClose(); };
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Filter mahasiswa yang belum jadi member & sesuai search
  const invitedIds = new Set(invitedList.map(m => m.id));
  const searchResult = mahasiswa.filter(m =>
    !invitedIds.has(m.id) &&
    (m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${m.nama_depan} ${m.nama_belakang}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAssign = async (intern: Mahasiswa) => {
    const result = await assign({ id_project: projectId, id_user: intern.id });
    if (result) {
      setInvitedList(prev => [...prev, {
        id: intern.id,
        id_user: intern.id,
        full_name: `${intern.nama_depan} ${intern.nama_belakang}`,
        email: intern.email,
        avatar: "",
        kelompok_peminatan: intern.jurusan,
        professional_bio: "",
        position: intern.role,
      } as ProjectMember]);
    }
  };

  const getInitials = (m: Mahasiswa) =>
    `${m.nama_depan[0]}${m.nama_belakang[0]}`.toUpperCase();

  return (
    <dialog ref={dialogRef} className="custom-dialog">
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

        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {/* Sudah jadi member */}
          {invitedList.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.full_name} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                    {member.full_name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{member.full_name}</span>
                  <span className="text-xs text-gray-400">{member.email}</span>
                </div>
              </div>
              <button
                onClick={() => setInvitedList(prev => prev.filter(i => i.id !== member.id))}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Hasil pencarian — belum jadi member */}
          {loadingMahasiswa ? (
            <p className="text-sm text-gray-400 text-center py-2">Memuat...</p>
          ) : (
            searchResult.map((intern) => (
              <div key={intern.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                    {getInitials(intern)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{intern.nama_depan} {intern.nama_belakang}</span>
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

          {!loadingMahasiswa && searchQuery && searchResult.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">Tidak ada mahasiswa ditemukan.</p>
          )}
        </div>
      </div>
    </dialog>
  );
}