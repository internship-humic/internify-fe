import ProjectCard from './components/ProjectsCard'
import { mockProjects } from '../../../lib/mockData'

export default function ProjectsPage() {
  return (
    <div className="px-14 py-15 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-1 mb-6">
        <span className="text-4xl font-bold">List Projects</span>
        <h1 className="text-lg text-gray-500">View assigned projects and track their progress.</h1>
      </div>

      {/* Grid card */}
      <div className="flex flex-wrap gap-4">
        {mockProjects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}