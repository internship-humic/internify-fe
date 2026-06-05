import { mockProjects } from '../../../lib/mockData'
import MentorProjectCard from './components/MentorProjectCard'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const MentorProjectsPage = () => {
  const navigate = useNavigate()

  const handleJoinProject = () => {
    // Navigasi ke halaman tujuan, silakan ganti '/path-tujuan' sesuai rute kamu
    navigate('/path-tujuan') 
  }

  return (
    <div className="px-14 py-15 bg-gray-50 min-h-screen">
      {/* Breadcrumb simulasi sesuai gambar */}
      <div className="text-xs text-gray-500 mb-2">
        <span className="text-red-600 font-medium">Home</span> &gt; <span>List Projects</span>
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-4xl font-bold text-gray-900">List Projects</h1>
        <p className="text-lg text-gray-500">Create, manage, and monitor ongoing projects and assignments.</p>
      </div>

      <div className="flex flex-wrap gap-4 items-stretch">
        {/* Render List Project */}
        {mockProjects.map(project => (
          <MentorProjectCard key={project.id} {...project} />
        ))}

        {/* Tombol "Join New Project" dengan Border Putus-putus */}
        <button
          onClick={handleJoinProject}
          className="w-[180px] min-h-[230px] border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center gap-3 p-4 bg-white hover:bg-gray-100 hover:border-red-600 transition-colors group"
        >
          {/* Lingkaran Plus */}
          <div className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center text-red-600 group-hover:bg-red-50 transition-colors">
            <Plus size={24} />
          </div>
          {/* Teks Deskripsi */}
          <span className="text-sm font-semibold text-red-600 text-center leading-tight">
            Join New Project
          </span>
        </button>
      </div>
    </div>
  )
}

export default MentorProjectsPage