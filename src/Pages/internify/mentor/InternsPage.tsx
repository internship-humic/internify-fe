import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Plus, Trash2 } from "lucide-react";
import { mockInternsData } from "../../../lib/mockData"; 


export default function InternsManagement() {  
  // State Filter & Search
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  // Handler Aksi Kursor/Tombol
  const handleAddAssignment = (id: number) => {
    alert(`Assign/Add action clicked for intern ID: ${id}`);
  };

  const handleDeleteIntern = (id: number) => {
      alert(`Deleted intern ID: ${id}`);
  };

  // Logic Filtering Data menggunakan useMemo
  const filteredInterns = useMemo(() => {
    return mockInternsData.filter((intern) => {
      const matchesEmail = intern.email.toLowerCase().includes(searchEmail.toLowerCase());
      const matchesProject =
        selectedProject === "All Projects" ||
        intern.projectName.toLowerCase() === selectedProject.toLowerCase();
      return matchesEmail && matchesProject;
    });
  }, [searchEmail, selectedProject]);

  return (
    <div className="">
      {/* Header Title */}
      <div className="mb-6">
        <h1 className="page-title">Interns Management</h1>
        <p className="page-title-desc">
          Manage role-based access and project assignments for active interns.
        </p>
      </div>

      {/* Filter Row & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center mb-6">
        {/* Left Control Inputs */}
        <div className="lg:col-span-2 flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box Input */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Filter by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:bg-white focus:border-gray-200 font-medium"
            />
          </div>

          {/* Select Project Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-gray-100 border border-transparent rounded-lg text-sm text-gray-700 font-medium appearance-none focus:outline-none focus:bg-white focus:border-gray-200"
            >
              <option value="All Projects">All Projects</option>
              <option value="Internify Project">Internify Project</option>
              <option value="MBG Project">MBG Project</option>
              <option value="Unassigned">Unassigned</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Icon Sliders / Filter Button */}
          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors hidden sm:block">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Right Info Box Stats */}
        <div className="bg-white border border-gray-100 rounded-xl px-6 py-2.5 flex items-center justify-around text-center shadow-[0_2px_10px_rgba(0,0,0,0.01)] w-full lg:max-w-sm ml-auto">
          <div>
            <span className="block text-xl font-bold text-red-600 leading-none">124</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1 block">
              TOTAL INTERNS
            </span>
          </div>
          <div className="h-8 w-px bg-gray-100 mx-2"></div>
          <div>
            <span className="block text-xl font-bold text-green-600 leading-none">92</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1 block">
              ACTIVE ASSIGNMENTS
            </span>
          </div>
        </div>
      </div>

      {/* Main Table Container Block */}
      <div className="w-full bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
        
        {/* Red Table Header Block */}
        <div className="bg-[#B30000] text-white px-6 py-3.5 flex items-center text-xs font-bold uppercase tracking-wider">
          <div className="w-1/2">Intern Details</div>
          <div className="w-1/3">Current Project</div>
          <div className="w-1/6 text-right pr-4">Actions</div>
        </div>

        {/* Table Body Iteration Rows */}
        <div className="divide-y divide-gray-100">
          {filteredInterns.length > 0 ? (
            filteredInterns.map((intern, index) => {
              const isUnassigned = intern.projectName === "Unassigned";
              
              return (
                <div key={`${intern.id}-${index}`} className="px-6 py-4 flex items-center hover:bg-gray-50/60 transition-colors">
                  
                  {/* Column 1: Intern Details (Avatar + Name & Email) */}
                  <div className="w-1/2 flex items-center gap-3">
                    {intern.avatar ? (
                      <img 
                        src={intern.avatar} 
                        alt={intern.name} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center border border-gray-100 shadow-sm text-white text-xs font-bold">
                        {intern.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">{intern.name}</h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{intern.email}</p>
                    </div>
                  </div>

                  {/* Column 2: Current Project Title & Role Accent */}
                  <div className="w-1/3">
                    <h5 className={`text-sm font-semibold leading-tight ${isUnassigned ? 'text-gray-500 italic' : 'text-gray-900'}`}>
                      {intern.projectName}
                    </h5>
                    <p className={`text-xs font-bold mt-0.5 ${isUnassigned ? 'text-red-500' : 'text-red-600'}`}>
                      {intern.role}
                    </p>
                  </div>

                  {/* Column 3: Action Buttons Block Right aligned */}
                  <div className="w-1/6 flex items-center justify-end gap-3.5 pr-2">
                    <button 
                      onClick={() => handleAddAssignment(intern.id)}
                      className="p-1.5 bg-[#B30000] hover:bg-[#990000] text-white rounded-lg transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                    <button 
                      onClick={() => handleDeleteIntern(intern.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-sm text-gray-400 font-medium">
              No interns found matching the filter criteria.
            </div>
          )}
        </div>

        {/* Red Table Pagination Bar Footer */}
        <div className="bg-[#B30000] text-white px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-medium">
          <div>
            Showing <span className="font-bold">{filteredInterns.length}</span> of 124 interns
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button className="px-3 py-1.5 bg-black/20 hover:bg-black/30 rounded-md font-semibold opacity-50 cursor-not-allowed transition-colors">
              Previous
            </button>
            <button className="px-4 py-1.5 bg-white text-gray-900 hover:bg-gray-100 rounded-md font-bold shadow-sm transition-colors">
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}