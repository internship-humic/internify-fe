import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { ChevronRight } from "lucide-react";
import { useMyProjects, useProjects } from "../../hooks/useProjects";
import { useProjectTasks } from "../../hooks/useTasks";

type BreadcrumbMatch = {
  match: { params: { slug?: string; taskSlug?: string; nameIntern?: string } };
};

const unslugify = (slug = '') =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const ProjectBreadcrumb = ({ match }: BreadcrumbMatch) => {
  const { projects } = useProjects();
  const slug = match.params.slug;
  const project = projects?.find((p) => p.slug === slug);
  return <>{project?.project_name ?? unslugify(slug)}</>;
};

const TaskBreadcrumb = ({ match }: BreadcrumbMatch) => {
  const {slug, taskSlug} = match.params;
  
  const { projects } = useMyProjects();
  const project = projects?.find((p) => p.slug === slug);

  const { tasks } = useProjectTasks(project?.id ?? 0);
  const task = tasks?.find((t) => t.slug === taskSlug);
  return <>{task?.title ?? unslugify(taskSlug)}</>;
};

const CertBreadcrumb = ({ match }: BreadcrumbMatch) => {
  const { projects } = useProjects();
  const slug = match.params.slug;
  const project = projects?.find((p) => p.slug === slug);
  return <>{project?.project_name ?? unslugify(slug)}</>;
};

const NameInternBreadcrumb = ({ match }: BreadcrumbMatch) => {
  return <>{unslugify(match.params.nameIntern)}</>;
};

const breadcrumbRoutes = [
  // --- AREA INTERN ---
  { path: '/intern', breadcrumb: 'Home' },
  { path: '/intern/projects', breadcrumb: 'Projects' },
  { path: '/intern/projects/:slug', breadcrumb: ProjectBreadcrumb },
  { path: '/intern/projects/:slug/:taskSlug', breadcrumb: TaskBreadcrumb },
  { path: '/intern/certificates', breadcrumb: 'Certificates' },
  { path: '/intern/certificates/:slug', breadcrumb: CertBreadcrumb },
  { path: '/intern/faq', breadcrumb: 'FAQ' },
  { path: '/intern/notifications', breadcrumb: 'Notifications' },
  { path: '/intern/settings', breadcrumb: 'Settings' },

  // --- AREA MENTOR / ADMIN ---
  { path: '/mentor', breadcrumb: 'Home' },
  { path: '/mentor/projects', breadcrumb: 'List Projects' },
  { path: '/mentor/projects/:slug', breadcrumb: ProjectBreadcrumb },
  { path: '/mentor/projects/:slug/:taskSlug', breadcrumb: TaskBreadcrumb },
  { path: '/mentor/projects/:slug/:taskSlug/:nameIntern', breadcrumb: NameInternBreadcrumb },
  { path: '/mentor/certificates', breadcrumb: 'Certificates' },
  { path: '/mentor/certificates/:slug', breadcrumb: CertBreadcrumb },
  { path: '/mentor/certificates/:slug/result', breadcrumb: 'Result' },
  { path: '/mentor/intern', breadcrumb: 'List Intern' },
  { path: '/mentor/faq', breadcrumb: 'FAQ' },
  { path: '/mentor/notifications', breadcrumb: 'Notifications' },
  { path: '/mentor/settings', breadcrumb: 'Settings' },
];

export default function Breadcrumbs(){
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);
  const location = useLocation();

  const rootPaths = ['/intern', '/mentor'];
  const isOnRootPath = rootPaths.includes(location.pathname);
  const fixbreadcumbs = breadcrumbs.filter(({ match }) => {
    if (match.pathname === '/') return false;
    if (rootPaths.includes(match.pathname) && !isOnRootPath) return false;
    return true;
  });
  return (
    <nav className="text-[15px] mb-3">
      {fixbreadcumbs.map(({ match, breadcrumb }) => {
        const isLast = match.pathname === location.pathname;

        return (
          <span key={match.pathname} className="inline-flex items-center">
            {isLast ? (
              <span className="font-bold text-red-800">
                {breadcrumb}
                
              </span>
            ) : (
              <>
                <Link to={match.pathname} className="text-gray-800">
                  {breadcrumb}
                </Link>
                <ChevronRight className="w-4 h-4 mx-1.5"/>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
};
