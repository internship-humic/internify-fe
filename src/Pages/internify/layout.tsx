import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from '../../Layout/Header-internify';
import SidebarIntern from './intern/components/SidebarIntern';
import SidebarMentor from './mentor/components/SidebarMentor';
import FooterIntern from '../../Layout/Footer-Internify';
import Breadcrumbs from "./Breadcumbs";

export const InternLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1 relative">
        <SidebarIntern isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden min-h-screen" 
            onClick={closeSidebar}
          />
        )}
        <main className="container">
          <Breadcrumbs/>
          <Outlet />
        </main>
      </div>
      <FooterIntern />
    </div>
  );
};

export const MentorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <div className="min-h-screenflex flex-col">
      <Header toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1">
        <SidebarMentor isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden min-h-screen" 
            onClick={closeSidebar}
          />
        )}
        <main className="container">
          {/* <Breadcrumbs/> */}
          <Outlet />
        </main>
      </div>
      <FooterIntern />
    </div>
  )
}

