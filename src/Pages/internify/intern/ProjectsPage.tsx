import ProjectCard from './components/ProjectsCard'
import { useProjects } from '../../../hooks/useProjects';

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();

  if (loading) return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>
  );

   if (error) return <p className="text-danger text-md">{error}</p>;

  return (
    <div>
      <div className="flex flex-col gap-1 mb-6">
        <span className="page-title">List Projects</span>
        <h1 className="page-title-desc">View assigned projects and track their progress.</h1>
      </div>

      {/* Grid card */}
      <div className="grid grid-cols-1 gap-6 md:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {projects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}