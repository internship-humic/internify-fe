import ProjectCard from './components/ProjectsCard'
import { useMyProjects } from '../../../hooks/useProjects';
import TeamPana from '../../../assets/Team-pana.svg'

function ProjectCardSkeleton() {
  return (
    <div className="w-[180px] min-h-[270px] bg-gray-300 rounded-xl overflow-hidden shadow-sm animate-pulse" />
  )
}

export default function ProjectsPage() {
  const { projects, loading, error } = useMyProjects();

  const renderContent = () => {
    if (loading) {
      return [...Array(5)].map((_, i) => <ProjectCardSkeleton key={i} />);
    }

    if (error) {
      return <p className="text-danger text-md col-span-full">{error}</p>;
    }

    if (projects.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-2 gap-3 mt-19">
          <img className="w-[440px]" src={TeamPana} alt="" />
          <p className="text-[18px] text-font-shade">Kamu belum tergabung ke projek apapun</p>
        </div>
      );
    }

    return projects.map(project => (
      <ProjectCard key={project.id} {...project} />
    ));
  };

  return (
    <div>
      <div className="flex flex-col gap-1 mb-6">
        <span className="page-title">List Projects</span>
        <h1 className="page-title-desc">View assigned projects and track their progress.</h1>
      </div>

      <div className="flex flex-wrap gap-3 items-stretch">
        {renderContent()}
      </div>
    </div>
  )
}