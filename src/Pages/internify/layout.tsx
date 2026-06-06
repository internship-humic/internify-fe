import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from './mentor/components/Header';
import SidebarIntern from './intern/components/SidebarIntern';
import SidebarMentor from './mentor/components/SidebarMentor';
import FooterIntern from '../../Layout/Footer-Internify';

export const InternLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Header toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1 relative">
        <SidebarIntern isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden min-h-screen" 
            onClick={closeSidebar}
          />
        )}
        <main className="flex-1 flex flex-col">
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1">
        <SidebarMentor isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden min-h-screen" 
            onClick={closeSidebar}
          />
        )}
        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>
      <FooterIntern />
    </div>
  )
}

