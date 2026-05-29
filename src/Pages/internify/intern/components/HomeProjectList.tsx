import { Code2, ChessKing, Beef } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockProjects } from '../../../../lib/mockData'

interface Project {
  name: string
  role: string
  logo: React.ElementType
  iconBg: string
  iconColor: string
}

const HomeProjectList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
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
                {/* <p className="text-xs text-gray-400">{project.role}</p> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeProjectList