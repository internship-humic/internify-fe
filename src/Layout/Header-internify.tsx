import { Bell, Menu } from "lucide-react"
import humiclogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const nav = useNavigate();
  return (
    <header className='sticky top-0 flex w-full justify-between items-center py-4 px-12 bg-white border-b border-gray-300 z-10'>
      <div className='flex items-center gap-3'>
        <button 
          onClick={toggleSidebar} 
          className="p-1 text-gray-600 hover:bg-gray-100 rounded-md lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <button>
          <img src={humiclogo} alt="Humic Logo" className="w-[100px] cursor-pointer" />
        </button>
      </div>

      <div className="flex flex-row gap-6 items-center">
        <button onClick={()=>nav("notifications")}>
          <Bell className="w-5 h-5 hover:text-red-800"/>
        </button>
        <div className="bg-red rounded-full w-9 h-9">

        </div>
      </div>
    </header>
  )
}