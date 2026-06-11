import ProjectCard from './components/ProjectsCard'
import { mockProjects } from '../../../lib/mockData'

export default function ProjectsPage() {
  return (
    <div className="">
      <div className="flex flex-col gap-1 mb-6">
        <span className="page-title">List Projects</span>
        <h1 className="page-title-desc">View assigned projects and track their progress.</h1>
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