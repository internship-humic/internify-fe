import { Outlet } from "react-router-dom";
import Header from './Header';
import SidebarIntern from './intern/components/SidebarIntern';
import SidebarAdmin from '../../Layout/SidebarAdmin';
import FooterIntern from './intern/components/FooterIntern';

export const InternLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <SidebarIntern />
        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>
      <FooterIntern />
    </div>
  );
};

export const MentorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>
      <FooterIntern />
    </div>
  )
}

