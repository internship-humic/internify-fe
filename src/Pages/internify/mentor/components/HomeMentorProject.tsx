import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateProjectModal from './CreateProjectDialog';
import { useProjects } from '../../../../hooks/useProjects';
import { getProjectIcon } from '../../../../lib/ProjectIcons';
import { RiFileList2Fill } from 'react-icons/ri';

function ProjectCardSkeleton() {
    return (
        <div className="flex items-center gap-4 border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 animate-pulse">
            <div className="w-10 h-10 rounded-lg bg-gray-300 flex-shrink-0" />
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32" />
                <div className="h-3 bg-gray-300 rounded w-40" />
            </div>
        </div>
    );
}

const HomeMentorProject = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projects, loading, error, refetch } = useProjects();
    const openDialog = () => { setIsModalOpen(true) };
    const closeDialog = () => { setIsModalOpen(false) };

    const handleRefetch = () => {
        closeDialog();
        refetch();
    }
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between mb-3 items-center'>
                <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
                <button
                    className='bg-card p-1.5 rounded-lg font-bold hover:bg-card-hover border border-card-outline'
                    onClick={openDialog} >
                    <span className='text-sm flex flex-row px-1 justify-between items-center gap-3.5'>
                        <Plus className='w-4 h-4' />
                        Add
                    </span>
                </button>
            </div>
            <div className="flex flex-col max-h-[160px] overflow-y-auto gap-3 pr-1">
                {loading && (
                    <>
                        {[...Array(2)].map((_, i) => (
                            <ProjectCardSkeleton key={i} />
                        ))}
                    </>
                )}

                {error && <p className="text-sm text-red-500 px-5">{error}</p>}

                {projects.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <RiFileList2Fill className="w-12 h-12 text-gray-400" />
                        <p className="text-sm text-gray-400 text-center">Belum ada project</p>
                    </div>
                )}

                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/mentor/projects/${project.slug}`)}
                        className="flex items-center gap-4 border border-box-border rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: project.background_color ?? '#dc2626' }}>
                            {(() => {
                                const Icon = getProjectIcon(project.project_icon);
                                return <Icon className="w-5 h-5 text-white" />;
                            })()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{project.project_name}</p>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={closeDialog}
                    onSuccess={handleRefetch}
                />
            )}
        </div>
    )
}

export default HomeMentorProject