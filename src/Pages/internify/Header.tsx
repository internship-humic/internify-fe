import { Bell } from "lucide-react"
import humiclogo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className='sticky top-0 flex w-full justify-between items-center py-4 px-12 bg-white shadow-md z-10'>
      <div className=''>
        <img
          src={humiclogo}
          alt="Humic Logo"
          className="w-[130px] cursor-pointer"
        />
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Bell className="w-6 h-6 hover:text-red-800"/>
        <div className="bg-blue-500 rounded-full w-8 h-8">

        </div>
      </div>
    </header>
  )
}

export default Header
