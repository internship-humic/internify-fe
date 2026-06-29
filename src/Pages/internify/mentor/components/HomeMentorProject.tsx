import { useNavigate } from 'react-router-dom'
import { mockProjects } from '../../../../lib/mockData'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateProjectModal from './CreateProjectDialog';
import { useProjects } from '../../../../hooks/useProjects';

const HomeMentorProject = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { projects, loading, error } = useProjects();
    const openDialog = () => {
        setIsModalOpen(true);
    };
    const closeDialog = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between mb-3 px-5 items-center'>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
                <button
                    className='bg-gray-300 p-1.5 rounded-lg font-bold hover:bg-gray-400'
                    onClick={openDialog} >
                    <span className='text-sm flex flex-row justify-between items-center gap-3.5'>
                        <Plus className='w-4 h-4' />
                        Add
                    </span>
                </button>
            </div>
            <div className="flex flex-col max-h-[210px] overflow-y-auto gap-3 pr-1">
                {loading && <p className="text-sm text-gray-400 px-5">Memuat...</p>}
                {error && <p className="text-sm text-red-500 px-5">{error}</p>}
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/mentor/projects/${project.slug}`)}
                        className="flex items-center gap-4 border border-box-border rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-300">
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
                />
            )}
        </div>
    )
}

export default HomeMentorProject