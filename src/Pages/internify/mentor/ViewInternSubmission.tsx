import { useParams, useLocation } from "react-router-dom";
import { FileText, Download, Clock, CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import { mockProjects } from "../../../lib/mockProjects";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

type SubmissionStatus = "submitted" | "pending" | "overdue";

// ─── status badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SubmissionStatus }) {
    if (status === "submitted")
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Submitted for grading
            </span>
        );
    if (status === "overdue")
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" />
                Overdue
            </span>
        );
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
            <MinusCircle className="w-3.5 h-3.5" />
            Not submitted
        </span>
    );
}

// ─── status table ────────────────────────────────────────────────────────────

function StatusTable({ status }: { status: SubmissionStatus }) {
    const rows: { label: string; value: React.ReactNode }[] = [
        {
            label: "Submission status",
            value: <StatusBadge status={status} />,
        },
        {
            label: "Grading status",
            value: <span className="text-sm text-gray-400">-</span>,
        },
        {
            label: "Time Remaining",
            value:
                status === "overdue" ? (
                    <span className="text-sm text-red-600 font-medium">Overdue</span>
                ) : (
                    <span className="text-sm text-gray-400">-</span>
                ),
        },
        {
            label: "File submission",
            value:
                status === "submitted" ? (
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                        <FileText className="w-4 h-4 text-red-700 stroke-[2.5]" />
                        <span className="text-gray-400 italic">-</span>
                    </div>
                ) : (
                    <span className="text-sm text-gray-400">-</span>
                ),
        },
    ];

    return (
        <div className="bg-box-secondary border border-box-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-box-border">
                {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[180px_1fr]">
                        <div className="px-4 py-3 text-sm text-gray-500 border-r border-box-border bg-gray-50/50">
                            {row.label}
                        </div>
                        <div className="px-4 py-3">{row.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function ViewInternSubmission() {
    const { slug, taskSlug, internName } = useParams<{ slug: string; taskSlug: string; internName: string }>();
    const location = useLocation();
    const status: SubmissionStatus = location.state?.status ?? "pending";

    const project = mockProjects.find((p) => toSlug(p.name) === slug);
    const task = project?.tasks.find((t) => toSlug(t.title) === taskSlug);

    if (!task) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
                <AlertCircle className="w-10 h-10" />
                <p className="text-sm font-medium">Task not found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {task.title}
                        </h1>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Due {task.deadline.label} at {task.deadline.time}
                        </p>
                    </div>
                </div>
            </div>

            {/* Task description */}
            <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-3">
                <h2 className="text-base font-bold text-gray-800">Task Description</h2>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                    {task.description}
                </p>
            </div>

            {/* Status table */}
            <div className="w-full bg-box-secondary rounded-2xl border border-box-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-800">Submission Detail</h2>
                    {status === "submitted" && (
                        <button className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-800 transition-colors">
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    )}
                </div>
                <StatusTable status={status} />
            </div>
        </div>
    );
}