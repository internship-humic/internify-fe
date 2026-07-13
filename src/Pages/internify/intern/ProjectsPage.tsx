import ProjectCard from './components/ProjectsCard'
import { useMyProjects } from '../../../hooks/useProjects';
import TeamPana from '../../../assets/Team-pana.svg'

export default function ProjectsPage() {
  const { projects, loading, error } = useMyProjects();

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

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2 gap-3 mt-19">
          <img className='w-[440px]' src={TeamPana} alt="" />
          <p className="text-[18px] text-font-shade">Kamu belum tergabung ke projek apapun</p>
        </div>
      ) : (
        // Grid card
        <div className="grid grid-cols-1 gap-4 md:gap-3 md:grid-cols-3 lg:grid-cols-5">
          {projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  )
}