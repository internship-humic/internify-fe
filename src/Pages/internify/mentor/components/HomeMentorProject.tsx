import { useNavigate } from 'react-router-dom'
import { mockProjects } from '../../../../lib/mockData'
import { Plus } from 'lucide-react';

const HomeMentorProject = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between mb-3 px-5 items-center'>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
                <button className='bg-gray-300 px-2 py-1 rounded-xl font-bold hover:bg-gray-400'>
                    <span className='text-sm flex flex-row items-center gap-3'>
                        <Plus className='w-3 h-3'/> 
                        Add 
                    </span>
                </button>
            </div>
            <div className="flex flex-col gap-3">
                {mockProjects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(`/intern/projects/${project.id}`)}
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
        </div>
    )
}

export default HomeMentorProject