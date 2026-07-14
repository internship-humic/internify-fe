import { useState, useMemo } from "react";
import { Search, Plus, ChevronDown, SortAsc, SortDesc } from "lucide-react";
import { useAllInterns, useRemoveMember, useProjects } from "../../../hooks/useProjects";
import AddInternsModal from "./components/AddInternsToProjects";
import InternsTable from "./components/InternsTable";
import type { InternDetail } from "../../../types/project.types";
import type { Project } from "../../../types/project.types";
import { customToast } from "../../utils/showToast";

export default function InternsManagement() {
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const { interns, loading, error, refetch } = useAllInterns();
  const { remove, loading: removing } = useRemoveMember();
  const { projects: activeProjects } = useProjects("active");

  const filteredInterns = useMemo(() => {
    const filtered = interns.filter((intern) => {
      const matchesEmail = intern.email.toLowerCase().includes(searchEmail.toLowerCase());
      const matchesProject =
        selectedProject === "All Projects" ||
        (intern.projectName || "Unassigned").toLowerCase() === selectedProject.toLowerCase();
      return matchesEmail && matchesProject;
    });

    if (sortOrder === "asc") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }
    return filtered;
  }, [interns, searchEmail, selectedProject, sortOrder]);

  const totalInterns = interns.length;
  const activeAssignments = activeProjects.length;

  const openAssignFor = (userId: number | null) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  const handleDeleteIntern = async (intern: InternDetail) => {
    const matchedProject = activeProjects.find((project: Project) => project.project_name === intern.projectName);
    if (!matchedProject) {
      customToast.error('Project not found', `Could not find a matching project for intern ${intern.name}.`);
      return;
    }
    const res = await remove({ id_project: matchedProject.id, id_user: intern.id });
    if (res !== null) {
      customToast.success('Intern removed', `${intern.name} has been successfully removed from the project.`);
      refetch();
    } else {
      customToast.error('Failed to remove', 'An error occurred while removing the intern. Please try again.');
    }
  };

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div>
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
        <div className="lg:col-span-2 flex flex-col sm:flex-row items-center gap-3 border border-card-outline p-4 rounded-xl">
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
              className="w-full pl-9 pr-4 py-2 shadow-sm border border-card-outline rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:bg-card focus:border-gray-200 font-medium"
            />
          </div>

          {/* Select Project Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full pl-3 pr-8 py-2 shadow-sm border border-card-outline rounded-lg text-sm text-gray-700 font-medium appearance-none focus:outline-none focus:bg-card focus:border-gray-200"
            >
              <option value="All Projects">All Projects</option>
              <option value="Unassigned">Unassigned</option>
              {activeProjects.map((project) => (
                <option key={project.id} value={project.project_name}>
                  {project.project_name}
                </option>
              ))}
            </select>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Sort A-Z / Z-A Toggle Button */}
          <button
            onClick={handleToggleSort}
            title={sortOrder === "asc" ? "Sort Z–A" : sortOrder === "desc" ? "Clear sort" : "Sort A–Z"}
            className={`p-2 shadow-sm rounded-lg transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold ${sortOrder
              ? "bg-[#B30000] text-white hover:bg-[#990000]"
              : "bg-card text-gray-600 hover:bg-gray-200"
              }`}
          >
            {sortOrder === "desc" ? (
              <SortDesc className="w-4 h-4" />
            ) : (
              <SortAsc className="w-4 h-4" />
            )}
            {sortOrder === "asc" ? "A–Z" : sortOrder === "desc" ? "Z–A" : "Sort"}
          </button>
        </div>

        {/* Right Info Box Stats — data real dari API */}
        <div className="bg-white border border-card-outline rounded-xl px-6 py-2.5 flex items-center justify-around text-center shadow-md w-full lg:max-w-sm ml-auto">
          <div>
            <span className="block text-xl font-bold text-red-600 leading-none">
              {totalInterns}
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1 block">
              TOTAL INTERNS
            </span>
          </div>
          <div className="h-8 w-px bg-card-outline mx-2"></div>
          <div>
            <span className="block text-xl font-bold text-green-600 leading-none">
              {activeAssignments}
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1 block">
              ACTIVE ASSIGNMENTS
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="inline-flex items-center gap-2 px-3 py-1 bg-red-700 text-white rounded-xl shadow-sm hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => openAssignFor(null)}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {loading ? (
        <div className={`w-full bg-gray-400/20 h-[300px] rounded-xl flex items-center justify-center animate-pulse`}>
          <span className="text-sm text-font-shade">Memuat Data...</span>
        </div>
      ) : (
        <InternsTable
          key={`${searchEmail}-${selectedProject}`}
          interns={filteredInterns}
          totalInterns={totalInterns}
          removing={removing}
          sortOrder={sortOrder}
          onSort={handleToggleSort}
          onAssign={(userId) => openAssignFor(userId)}
          onDelete={handleDeleteIntern}
        />
      )
      }

      {
        isModalOpen &&
        <AddInternsModal
          isOpen={isModalOpen}
          userId={selectedUserId}
          onClose={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      }
    </div >
  );
}