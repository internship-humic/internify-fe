import { useParams, useSearchParams } from "react-router-dom";
import { FileText, Info } from "lucide-react";
import TaskFormFile from "./components/TaskForm-file";
import TaskFormLink from "./components/TaskForm-link";
import { useTaskDetail } from "../../../hooks/useTasks";

export default function TaskSubmission() {
  const [searchParams] = useSearchParams();
  const { slug, taskSlug } = useParams<{ slug: string; taskSlug: string }>();
  const submissionType = (searchParams.get("type") ?? "file") as "file_upload" | "url_link";
  const { task, loading, error } = useTaskDetail(taskSlug!, slug);

  const formatDeadline = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  if (loading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-box-secondary rounded-2xl animate-pulse" />
      ))}
    </div>
  );
  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (!task) return null;

  return (
    <div className="space-y-4 mt-7">
      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{task.title}</h1>
          <span className="text-sm font-bold text-gray-600">
            Due {formatDeadline(task.deadline_at)} at {formatTime(task.deadline_at)}
          </span>
        </div>
      </div>

      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-3">
        <h2 className="text-xl text-gray-800 tracking-tight">Task Description</h2>
        <p className="text-sm text-foreground font-light leading-relaxed">{task.description}</p>
      </div>

      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-5">
        <div className="flex items-center gap-2 pb-2">
          <FileText className="w-4 h-4 text-primary stroke-[2.5]" />
          <h2 className="text-font-shade font-bold text-secondary tracking-tight">Submit Task</h2>
        </div>

        {submissionType === "file_upload" ? (
          <TaskFormFile
            taskId={taskSlug!}
            deadline={new Date(task.deadline_at)}
            initialSubmission={task.my_submission}
          />
        ) : (
          <TaskFormLink
            taskId={taskSlug!}
            deadline={new Date(task.deadline_at)}
            initialSubmission={task.my_submission}
          />
        )}

        <div className="w-full border border-box-border rounded-lg p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-font mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-font font-medium leading-relaxed">
            Once submitted, your work will be locked for mentor review. You can request a re-submission if needed.
          </p>
        </div>
      </div>
    </div>
  );
}