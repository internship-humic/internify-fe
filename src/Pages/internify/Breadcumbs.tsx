import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { ChevronRight } from "lucide-react";
import { mockProjects } from "../../lib/mockData";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

// Dynamic breadcrumb: ubah slug jadi nama project asli
const ProjectNameBreadcrumb = ({ match }: { match: { params: { slug?: string } } }) => {
  const slug = match.params.slug;
  const project = mockProjects.find((p) => toSlug(p.name) === slug);
  return <>{project ? project.name : slug}</>;
};

const TaskNameBreadcrumb = ({ match }: { match: { params: { slug?: string; taskSlug?: string } } }) => {
  const { slug, taskSlug } = match.params;
  const project = mockProjects.find((p) => toSlug(p.name) === slug);
  const task = project?.tasks.find((t) => toSlug(t.title) === taskSlug);
  return <>{task ? task.title : taskSlug}</>;
};

const breadcrumbRoutes = [
  // --- AREA INTERN ---
  { path: '/intern', breadcrumb: 'Home' },
  { path: '/intern/projects', breadcrumb: 'Projects' },
  { path: '/intern/projects/:slug', breadcrumb: ProjectNameBreadcrumb },
  { path: '/intern/certificates', breadcrumb: 'Certificates' },
  { path: '/intern/projects/:slug/:taskSlug', breadcrumb: TaskNameBreadcrumb  },
  { path: '/intern/faq', breadcrumb: 'FAQ' },
  { path: '/intern/notifications', breadcrumb: 'Notifications' },
  { path: '/intern/settings', breadcrumb: 'Settings' },

  // --- AREA MENTOR / ADMIN ---
  { path: '/mentor', breadcrumb: 'Home' },
  { path: '/mentor/projects', breadcrumb: 'List Projects' },
  { path: '/mentor/projects/:slug', breadcrumb: ProjectNameBreadcrumb },
  { path: '/mentor/projects/:slug/:taskSlug', breadcrumb: TaskNameBreadcrumb },
  { path: '/mentor/certificates', breadcrumb: 'Approve Certificates' },
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
    <nav className="text-[12px] mb-3">
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
                {/* Karakter pemisah antar breadcrumb */}
                <ChevronRight className="w-4 h-4 mx-1.5"/>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
};