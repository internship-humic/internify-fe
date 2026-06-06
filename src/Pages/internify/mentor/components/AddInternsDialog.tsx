import { useRef, useEffect, useState } from "react";
import { X, Search, Plus, Trash2 } from "lucide-react";

interface ManageInternsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageInternsModal({ isOpen, onClose }: ManageInternsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchQuery, setSearchQuery] = useState("Jonathankristin@gmail.com");
  
  // Data Intern Terundang (Simulasi list atas yang ada ikon sampah)
  const [invitedList, setInvitedList] = useState([
    { id: 1, email: "Jonathankristina@gmail.com", initials: "JK" }
  ]);

  // Data Rekomendasi/Hasil Pencarian (Simulasi list bawah yang ada ikon plus)
  const [searchResult, setSearchResult] = useState([
    { id: 2, email: "Jonathankristin@gmail.com", initials: "JK" }
  ]);

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

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto flex flex-col w-[calc(100%-2rem)] max-w-[540px] max-h-[calc(100vh-4rem)] rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Search Input Area */}
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by email..."
          className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium shadow-sm"
        />
        <Search className="absolute right-3.5 w-4 h-4 text-gray-400" />
      </div>

      {/* List Container (Scrollable jika data banyak) */}
      <div className="overflow-y-auto space-y-3 pr-1 flex-1">
        
        {/* List 1: Intern Yang Sudah Tergabung / Ditambahkan */}
        {invitedList.map((intern) => (
          <div key={intern.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                {intern.initials}
              </div>
              <span className="text-sm font-medium text-gray-600">{intern.email}</span>
            </div>
            <button 
              onClick={() => setInvitedList(invitedList.filter(i => i.id !== intern.id))}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* List 2: Hasil Pencarian / Belum Ditambahkan */}
        {searchResult.map((intern) => (
          <div key={intern.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">
                {intern.initials}
              </div>
              <span className="text-sm font-medium text-gray-600">{intern.email}</span>
            </div>
            <button 
              onClick={() => {
                setInvitedList([...invitedList, intern]);
                setSearchResult(searchResult.filter(i => i.id !== intern.id));
              }}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ))}
        
      </div>
    </dialog>
  );
}