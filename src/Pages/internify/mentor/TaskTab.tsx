import type { Project, Task } from '../../../lib/mockData';
import { ClipboardList, Pencil, Trash2 } from 'lucide-react';

export default function TaskTab({ project }: { project: Project }) {
  
  const handleAddTask = () => {
    console.log('Trigger modal / halaman tambah tugas');
  };

  const handleEditTask = (taskTitle: string) => {
    console.log('Edit task:', taskTitle);
  };

  const handleDeleteTask = (taskTitle: string) => {
    console.log('Delete task:', taskTitle);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Tasks</h2>
        
        <button 
          onClick={handleAddTask}
          className="bg-[#C0392B] hover:bg-[#A93226] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm"
        >
          Add Task
        </button>
      </div>

      <hr className="border-gray-200/80 mb-4" />

      {/* Task List Section */}
      <div className="flex flex-col">
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task: Task, idx: number) => (
            <div
              key={idx}
              className={`flex items-center justify-between py-4 group ${
                idx < project.tasks.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Task Title & Icon */}
              <div className="flex items-center gap-3 min-w-0">
                <ClipboardList size={22} className="text-slate-600 shrink-0" />
                <span className="text-base text-slate-700 font-medium truncate">
                  {task.title}
                </span>
              </div>

              {/* Action Buttons (Edit & Delete) */}
              <div className="flex items-center gap-4 text-slate-600 shrink-0">
                <button 
                  onClick={() => handleEditTask(task.title)}
                  className="hover:text-blue-600 transition-colors p-1"
                  title="Edit Task"
                >
                  <Pencil size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.title)}
                  className="hover:text-red-600 transition-colors p-1"
                  title="Delete Task"
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
    </div>
  );
}