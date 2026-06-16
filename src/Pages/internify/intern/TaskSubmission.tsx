import { useParams, useSearchParams } from "react-router-dom";
import { FileText, Info } from "lucide-react";
import TaskFormFile from "./components/TaskForm-file";
import TaskFormLink from "./components/TaskForm-link";
import { mockProjects } from "../../../lib/mockProjects";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function TaskSubmission() {
  const [searchParams] = useSearchParams();
  const { slug, taskSlug } = useParams<{ slug: string; taskSlug: string }>();

  const submissionType = (searchParams.get("type") ?? "file") as "file" | "link";

  const project = mockProjects.find((p) => toSlug(p.name) === slug);
  const task = project?.tasks.find((t) => toSlug(t.title) === taskSlug);
  const handleFileSubmit = (files: File[]) => {
    const fileNames = files.map(f => f.name).join(', ');
    console.log(`Submitting Files for Project ${slug}:`, fileNames);
    alert(`File ${fileNames} berhasil dikirim!`);
  };

  const handleLinkSubmit = (link: string) => {
    console.log(`Submitting Link for Project ${slug}:`, link);
    alert(`Link berhasil dikirim!`);
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {task?.title ?? "Submit Task"}
            </h1>
          </div>

          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${submissionType === "file"
            ? "bg-blue-50 text-blue-700 border border-blue-100"
            : "bg-purple-50 text-purple-700 border border-purple-100"
            }`}>
            {submissionType === "file" ? "📄 File Upload" : "🔗 Link Submission"}
          </span>
        </div>
      </div>

      {/* Task Description Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-3">
        <h2 className="text-base font-bold text-gray-800 tracking-tight">Task Description</h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          {task?.description ?? "Kerjakan dan kirimkan tugas sesuai dengan instruksi yang diberikan."}
        </p>
      </div>

      {/* Submit Area Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-5">
        <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
          <FileText className="w-4 h-4 text-[#B30000] stroke-[2.5]" />
          <h2 className="text-base font-bold text-gray-800 tracking-tight">Submit Task</h2>
        </div>

        {/* Render form sesuai tipe dari query param */}
        {submissionType === "file" ? (
          <TaskFormFile taskId={slug} onSubmitSuccess={handleFileSubmit} />
        ) : (
          <TaskFormLink taskId={slug} onSubmitSuccess={handleLinkSubmit} />
        )}

        {/* Info Box */}
        <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
            Once submitted, your work will be locked for mentor review. You can request a re-submission if needed.
          </p>
        </div>
      </div>
    </div>
  );
}