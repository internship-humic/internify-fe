import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";
import { useMentors, useDeleteMentor } from "../hooks/useMentors";

const MentorPage = () => {
  const navigate = useNavigate();
  const { mentors, loading, error, refetch } = useMentors();
  const { deleteMentor, loading: deleting } = useDeleteMentor();

  const handleDelete = async (id: number, name: string) => {
    const confirmed = confirm(`Apakah Anda yakin ingin menghapus mentor "${name}"?`);
    if (!confirmed) return;

    const success = await deleteMentor(id);
    if (success) {
      alert("Mentor berhasil dihapus!");
      refetch();
    } else {
      alert("Gagal menghapus mentor");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />

      <div className="flex flex-row">
        <SidebarAdmin />
        <div className="p-10 bg-white flex-col flex-wrap w-full">
          {/* Header */}
          <div className="flex flex-row justify-between items-center mb-[50px]">
            <h2 className="text-[24px] font-semibold">Daftar Mentor</h2>
            <button
              className="px-[20px] py-[10px] rounded-xl bg-[#1F4A92] hover:bg-[#677c9f] cursor-pointer text-white font-semibold"
              onClick={() => navigate("/create-mentor")}
            >
              Tambah Mentor
            </button>
          </div>

          {/* Loading / Error */}
          {loading && (
            <p className="text-gray-500 text-center mt-4">Memuat data mentor...</p>
          )}
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">No</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">Nama Lengkap</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">Role</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map((mentor, index) => (
                    <tr key={mentor.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{mentor.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{mentor.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">{mentor.role}</td>
                      <td className="px-6 py-4 flex gap-2">
                        {/* Tombol Edit */}
                        <button
                          className="bg-[#2CAEFF] text-white cursor-pointer p-2 rounded-xl hover:bg-[#1a8fd4] transition-colors"
                          onClick={() => navigate(`/edit-mentor/${mentor.id}`)}
                          title="Edit Mentor"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 7.125 18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          className="bg-[#E41E1E] text-white cursor-pointer p-2 rounded-xl hover:bg-[#b81414] transition-colors disabled:opacity-50"
                          onClick={() => handleDelete(mentor.id, mentor.full_name)}
                          disabled={deleting}
                          title="Hapus Mentor"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {mentors.length === 0 && (
                <p className="text-gray-500 mt-4 text-center">Belum ada data mentor.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorPage;