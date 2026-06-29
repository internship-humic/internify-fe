import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Calendar, Edit } from "lucide-react";
import EditSubmissionModal from "./components/EditSubmissionTask";
import { useTaskSubmissions } from "../../../hooks/useTasks";
import type { ProjectTask } from "../../../types/task.types";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function MentorProjectsDetailPage() {
  const navigate = useNavigate();
  const { slug, taskSlug } = useParams<{ slug: string; taskSlug: string }>();
  const { task, loading, error, refetch } = useTaskSubmissions(taskSlug!, slug);
  const [openModal, setOpenModal] = useState(false);

  // Di MentorProjectsDetailPage
  const handleEditSuccess = (updatedTask: ProjectTask) => {
    if (updatedTask.slug !== taskSlug) {
      // Slug berubah, navigate ke URL baru
      navigate(`/mentor/projects/${slug}/${updatedTask.slug}`, { replace: true });
    } else {
      // Slug sama, cukup refetch
      refetch();
    }
  };

  if (loading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-box-secondary rounded-2xl animate-pulse" />
      ))}
    </div>
  );
  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (!task) return null;

  const formatDeadline = (isoString: string) => {
    const date = new Date(isoString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yy} pada jam ${hh}:${min}`;
  };

  return (
    <div>
      {/* Header Utama */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1a1a1a]">{task.title}</h1>
        <button
          className="flex items-center gap-2 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
          onClick={() => setOpenModal(true)}
        >
          <Edit size={16} />
          Edit Task
        </button>
      </div>

      {/* Kotak Informasi Detail & Deadline */}
      <div className="border border-gray-300 rounded-xl p-6 bg-white flex flex-col lg:flex-row gap-6 mb-8 shadow-sm">
        <div className="flex-1 md:border-r border-gray-200 md:pr-6">
          <h2 className="text-xs font-sans text-gray-400 tracking-wider uppercase mb-2">Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {task.description}
          </p>
        </div>
        <div className="w-full md:w-120 flex flex-col justify-start">
          <h2 className="text-xs font-sans text-gray-400 tracking-wider uppercase mb-2">Deadline</h2>
          <div className="flex items-start gap-3">
            <div className="text-red-600 mt-0.5">
              <Calendar size={20} />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900">{formatDeadline(task.deadline_at)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Tabel Intern Submissions */}
      <div className="border border-gray-300 rounded-xl bg-white overflow-hidden shadow-sm">
        {/* Header Tabel Kontrol */}
        <div className="p-5 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Intern Submissions</h2>
            <span className="bg-gray-100 text-gray-500 font-semibold text-xs px-2.5 py-0.5 rounded-md border border-gray-200">
              {task.submissions?.length || 0} total
            </span>
          </div>
        </div>

        {/* Isi Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-400 tracking-wider uppercase">
                <th className="px-6 py-4">Intern Name</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {task.submissions.map((sub, idx) => {
                return (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {sub.profile_picture
                        ? <img src={sub.profile_picture} className="w-9 h-9 rounded-full object-cover" />
                        : <div className="w-9 h-9 rounded-full bg-red-800 flex-shrink-0" />
                      }
                      <span className="font-semibold text-sm text-gray-800">{sub.full_name}</span>
                    </td>

                    {/* Kolom Tanggal Kumpul */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {sub.submitted_at
                        ? new Date(sub.submitted_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>

                    {/* Kolom Badge Status */}
                    <td className="px-6 py-4">
                      {sub.display_status === "done" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Done
                        </span>
                      )}
                      {sub.display_status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Pending
                        </span>
                      )}
                      {sub.display_status === "overdue" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-700 text-white border">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Overdue
                        </span>
                      )}
                    </td>

                    {/* Kolom Tombol Aksi */}
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-sm font-bold text-red-800 hover:text-red-900 transition-colors inline-flex items-center gap-1"
                        onClick={() =>
                          navigate(
                            `/mentor/projects/${slug}/${taskSlug}/${toSlug(sub.full_name)}`,
                            { state: { status: sub.display_status === "done" ? "submitted" : sub.display_status === "overdue" ? "overdue" : "pending" } }
                          )
                        }
                      >
                        View Submission <span className="text-xs">&rarr;</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <EditSubmissionModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          task={task}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}