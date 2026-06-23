import { useParams, useSearchParams } from "react-router-dom";
import { FileText, Info } from "lucide-react";
import TaskFormFile from "./components/TaskForm-file";
import TaskFormLink from "./components/TaskForm-link";
import { mockProjects } from "../../../lib/mockProjects";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function TaskSubmission() {
  const [searchParams] = useSearchParams();
  const { slug, TaskSlug } = useParams<{ slug: string; TaskSlug: string }>();

  const submissionType = (searchParams.get("type") ?? "file") as "file" | "link";

  const project = mockProjects.find((p) => toSlug(p.name) === slug);
  const task = project?.tasks.find((t) => toSlug(t.title) === TaskSlug);
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
      <div className="w-full bg-box-secondary  rounded-2xl border border-box-border p-6 ">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {task?.title}
            </h1>
            <span className="text-sm font-bold text-gray-600">
              Due {task?.deadline.label} at {task?.deadline.time}
            </span>
          </div>
        </div>
      </div>

      {/* Task Description Card */}
      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-3">
        <h2 className="text-xl  text-gray-800 tracking-tight">Task Description</h2>
        <p className="text-sm text-foreground font-light leading-relaxed">
          {task?.description}
        </p>
      </div>

      {/* Submit Area Card */}
      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-5">
        <div className="flex items-center gap-2  pb-2">
          <FileText className="w-4 h-4 text-[#B30000] stroke-[2.5]" />
          <h2 className="text-base font-bold text-secondary tracking-tight">Save Changes</h2>
        </div>

        {/* Render form sesuai tipe dari query param */}
        {submissionType === "file" ? (
          <TaskFormFile onSubmitSuccess={handleFileSubmit} deadline={task?.deadline.date}/>
        ) : (
          <TaskFormLink onSubmitSuccess={handleLinkSubmit} deadline={task?.deadline.date}/>
        )}

        {/* Info Box */}
        <div className="w-full border border-box-border rounded-lg p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
            Once submitted, your work will be locked for mentor review. You can request a re-submission if needed.
          </p>
        </div>
      </div>
    </div>
  );
}