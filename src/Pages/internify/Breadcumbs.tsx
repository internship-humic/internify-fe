import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { ChevronRight } from "lucide-react";

const breadcrumbRoutes = [
  // --- AREA INTERN ---
  { path: '/intern', breadcrumb: 'Home' },
  { path: '/intern/projects', breadcrumb: 'Projects' },
  { path: '/intern/projects/:id', breadcrumb: 'Detail Project' }, // Otomatis handle ID dinamis
  { path: '/intern/certificates', breadcrumb: 'Certificates' },
  { path: '/intern/tasks', breadcrumb: 'Tasks' },
  { path: '/intern/tasks/:id', breadcrumb: 'Detail Task' },
  { path: '/intern/tasks/:id/submit', breadcrumb: 'Submit Task' },
  { path: '/intern/faq', breadcrumb: 'FAQ' },
  { path: '/intern/notifications', breadcrumb: 'Notifications' },
  { path: '/intern/settings', breadcrumb: 'Settings' },

  // --- AREA MENTOR / ADMIN ---
  { path: '/mentor', breadcrumb: 'Home' },
  { path: '/mentor/projects', breadcrumb: 'Managed Projects' },
  { path: '/mentor/projects/:id', breadcrumb: 'Project Overview' },
  { path: '/mentor/certificates', breadcrumb: 'Approve Certificates' },
  { path: '/mentor/intern', breadcrumb: 'List Intern' },
  { path: '/mentor/faq', breadcrumb: 'FAQ' },
  { path: '/mentor/notifications', breadcrumb: 'Notifications' },
  { path: '/mentor/settings', breadcrumb: 'Settings' },
];

export default function Breadcrumbs(){
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);
  const location = useLocation();

  const fixbreadcumbs = breadcrumbs.filter(({match}) => match.pathname !== '/');
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