import { useNavigate } from 'react-router-dom'
import { mockProjects } from '../../../../lib/mockData'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateProjectModal from './CreateProjectDialog';

const HomeMentorProject = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            <div className="flex flex-col gap-3">
                {mockProjects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(`/intern/projects/${project.name}`)}
                            className="flex items-center gap-4 border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-300`}>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{project.name}</p>
                            </div>
                        </div>
                    )
                })}
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