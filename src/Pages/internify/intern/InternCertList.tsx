import { Loader2, AlertCircle } from "lucide-react";
import { useMyProjects } from "../../../hooks/useProjects";
import type { Project } from "../../../types/project.types";
import { useNavigate } from "react-router-dom";
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';


export default function SertificateList() {
    const { projects, loading, error } = useMyProjects();
    const navigate = useNavigate();

    const getDynamicIcon = (iconName: string) => {
        const formatted = iconName.charAt(0).toUpperCase() + iconName.slice(1);
        const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[formatted];
        return Icon ?? LucideIcons.FolderOpen;
    };
    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="page-title">Certificate History</h1>
                <p className="page-title-desc">All your earned internship certificates</p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-sm">Loading certificates...</span>
                </div>
            )}

            {/* Error */}
            {error && !loading && (
                <div className="flex items-center justify-center py-20 text-red-500 gap-2">
                    <AlertCircle className="w-6 h-6" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && projects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-sm">No ongoing projects yet.</p>
                </div>
            )}

            {/* Grid */}
            {!loading && !error && projects.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((item: Project) => (
                        <div
                            key={item.id}
                            className="bg-white border border-card-outline rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                            onClick={() => navigate(`/intern/certificates/${item.slug}`, { state: { project: item } })}
                        >
                            {/* Thumbnail */}
                            <div className="p-6 pb-0">
                                <div className="rounded-lg overflow-hidden">
                                    <div className="w-full h-32 bg-gray-300 flex items-center justify-center">
                                        {(() => {
                                            const Icon = getDynamicIcon(item.project_icon);
                                            return <Icon className="w-10 h-10 text-primary" />;
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-4 py-3">
                                <p className="text-xs text-gray-400 mb-0.5">
                                    {new Date(item.start_date).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                    })} until  {new Date(item.end_date).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </p>
                                <p className="text-sm font-semibold text-gray-800 leading-snug">
                                    {item.project_name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    No: <span className="font-bold text-red-600">{item.status}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}