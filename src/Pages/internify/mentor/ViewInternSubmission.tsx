import { useParams, useLocation } from "react-router-dom";
import { Download, Clock, AlertCircle } from "lucide-react";
import { useTaskSubmissions } from "../../../hooks/useTasks";
import type { DisplayStatus } from "../../../types/task.types";
import { StatusTable } from "./components/StatusSubmissionTable";

export default function ViewInternSubmission() {
  const { slug, taskSlug, nameIntern } = useParams<{
    slug: string;
    taskSlug: string;
    nameIntern: string;
  }>();
  const location = useLocation();
  const status: DisplayStatus = location.state?.status ?? "pending";

  const { task, loading, error } = useTaskSubmissions(taskSlug!, slug);

  if (loading)
    return (
      <div className="space-y-4 mt-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-box-secondary rounded-2xl animate-pulse" />
        ))}
      </div>
    );

  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (!task) return null;

  const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  const internSubmission = task.submissions.find(
    (s) => toSlug(s.full_name) === nameIntern
  );

  if (!internSubmission)
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertCircle className="w-10 h-10" />
        <p className="text-sm font-medium">Submission not found.</p>
      </div>
    );

  return (
    <div className="pt-8 space-y-4">
      {/* Header */}
      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {task.title}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {internSubmission.full_name} — {internSubmission.email}
          </p>
        </div>
      </div>

      {/* Task Description */}
      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-3">
        <h2 className="text-base font-bold text-gray-800">Task Description</h2>
        <p className="text-sm text-foreground font-medium leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Submission Detail */}
      <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Submission Detail</h2>
          {internSubmission.submission?.file_path && (
            <a
              href={internSubmission.submission.file_path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          )}
        </div>
        <StatusTable
          status={status}
          submission={internSubmission.submission}
        />
      </div>
    </div>
  );
}