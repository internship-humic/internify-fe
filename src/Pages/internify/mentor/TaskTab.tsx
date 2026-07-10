import { useProjectTasks, useDeleteTask } from '../../../hooks/useTasks';
import type { InternTaskItem, ProjectDetail } from '../../../types/project.types';
import { ClipboardList, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateTaskModal from './components/CreateTaskDialog';
import EditTaskModal from './components/EditTaskDialog';
import { customToast } from '../../utils/showToast';

export default function TaskTab({ project }: { project: ProjectDetail }) {
  const { tasks, loading, error, refetch } = useProjectTasks(project.id);
  const { remove } = useDeleteTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<InternTaskItem | null>(null);
  const isProjectActive = project?.status === "active"

  const handleDeleteTask = async (taskId: number, taskTitle: string) => {
    const confirmed = window.confirm(`Yakin ingin menghapus task “${taskTitle}”?`);
    if (!confirmed) return;

    const del = await remove(taskId, String(project.id));
    if (del) {
      try {
        customToast.success("Berhasil", `Task ${taskTitle} berhasil dihapus`)
      } catch (error) {
        customToast.error("Gagal", `Task ${taskTitle} gagal dihapus`)
      } finally {
        refetch();
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-3 p-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );
  if (error) return <p className="text-red-500 text-sm p-6">{error}</p>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tasks</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!isProjectActive}
          className="border border-gray-500 text-font-shade rounded-lg px-2 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </div>
      <hr className="border-gray-200/80 mb-4" />

      <div className="flex flex-col">
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <div
              key={task.id}
              className={`flex items-center justify-between py-4 group ${
                idx < tasks.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <ClipboardList size={22} className="text-slate-600 shrink-0" />
                <span className="text-base text-slate-700 font-medium truncate">{task.title}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 shrink-0">
                <button
                  onClick={() => { setSelectedTask(task); setEditModalOpen(true); }}
                  disabled={!isProjectActive}
                  className="border border-gray-500 text-font-shade rounded-lg px-2 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id, task.title)}
                  disabled={!isProjectActive}
                  className="border border-gray-500 text-font-shade rounded-lg px-2 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm">
            Belum ada tugas yang dibuat untuk proyek ini.
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={String(project.id)}
          onSuccess={() => { setIsModalOpen(false); refetch(); }}
        />
      )}
      {editModalOpen && selectedTask && (
        <EditTaskModal
          isOpen={editModalOpen}
          onClose={() => { setEditModalOpen(false); setSelectedTask(null); }}
          task={selectedTask}
          onSuccess={() => { setEditModalOpen(false); setSelectedTask(null); refetch(); }}
        />
      )}
    </div>
  );
}