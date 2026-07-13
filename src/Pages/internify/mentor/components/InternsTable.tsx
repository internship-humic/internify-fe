import { useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight, SortAsc, SortDesc, ArrowUpDown } from "lucide-react";
import type { InternDetail } from "../../../../types/project.types";

const PAGE_SIZE = 5;

interface InternsTableProps {
  interns: InternDetail[];
  totalInterns: number;
  removing: boolean;
  sortOrder: "asc" | "desc" | null;
  onSort: () => void;
  onAssign: (userId: number) => void;
  onDelete: (intern: InternDetail) => void;
}

export default function InternsTable({
  interns,
  totalInterns,
  removing,
  sortOrder,
  onSort,
  onAssign,
  onDelete,
}: InternsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(interns.length / PAGE_SIZE));

  // Clamp page bila filter mengubah jumlah hasil
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedInterns = interns.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full mt-3 bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">

      {/* Red Table Header Block */}
      <div className="bg-[#B30000] text-white px-6 py-3.5 flex items-center text-xs font-bold uppercase tracking-wider">
        {/* Intern Details header with sort toggle */}
        <div className="w-1/2">
          <button
            onClick={onSort}
            title={sortOrder === "asc" ? "Sort Z–A" : sortOrder === "desc" ? "Clear sort" : "Sort A–Z"}
            className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity focus:outline-none"
          >
            Intern Details
            {sortOrder === "asc" ? (
              <SortAsc className="w-3.5 h-3.5 opacity-90" />
            ) : sortOrder === "desc" ? (
              <SortDesc className="w-3.5 h-3.5 opacity-90" />
            ) : (
              <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />
            )}
          </button>
        </div>
        <div className="w-1/3">Current Project</div>
        <div className="w-1/6 text-right pr-4">Actions</div>
      </div>

      {/* Table Body Iteration Rows */}
      <div className="divide-y divide-gray-100">
        {paginatedInterns.length > 0  ? (
          paginatedInterns.map((intern, index) => {
            const isUnassigned = !intern.projectName || intern.projectName === "Unassigned";

            return (
              <div
                key={`${intern.id}-${index}`}
                className="px-6 py-4 flex items-center hover:bg-gray-50/60 transition-colors"
              >
                {/* Column 1: Intern Details (Avatar + Name & Email) */}
                <div className="w-1/2 flex items-center gap-3">
                  {intern.avatar ? (
                    <img
                      src={intern.avatar}
                      alt={intern.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm hidden md:block"
                    />
                  ) : (
                    <div className=" w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 items-center justify-center border border-gray-100 shadow-sm text-white text-xs font-bold hidden md:flex">
                      {intern.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-tight">{intern.name}</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 font-medium mt-0.5">{intern.email}</p>
                  </div>
                </div>

                {/* Column 2: Current Project Title & Role Accent */}
                <div className="w-1/3">
                  <h5 className={`text-xs md:text-sm font-semibold leading-tight ${isUnassigned ? "text-gray-500 italic" : "text-gray-900"}`}>
                    {intern.projectName || "Unassigned"}
                  </h5>
                  <p className={`text-[10px] md:text-xs font-bold mt-0.5 ${isUnassigned ? "text-red-500" : "text-red-600"}`}>
                    {intern.role}
                  </p>
                </div>

                {/* Column 3: Action Buttons Block Right aligned */}
                <div className="w-1/6 flex flex-col md:flex-row items-center justify-end gap-3.5 pr-2">
                  {/* Tombol Add: membuka modal assign member untuk intern ini */}
                  <button
                    onClick={() => onAssign(intern.id)}
                    className="p-1.5 bg-[#B30000] hover:bg-[#990000] text-white rounded-lg transition-colors shadow-sm"
                    title="Assign ke project"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                  {/* Tombol Delete: remove intern dari project */}
                  <button
                    onClick={() => onDelete(intern)}
                    disabled={removing}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Hapus dari project"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>
            );
          })
        ) : totalInterns != 0 ? (
          <div className="text-center py-12 text-md text-font font-medium">
            Tidak ada intern yang sesuai dengan kriteria
          </div>
        ) : (
          <div className="text-center py-12 text-md text-font font-medium">
            Tidak ada intern yang terdaftar
          </div>
        )}
      </div>

      {/* Red Table Pagination Bar Footer */}
      <div className="bg-[#B30000] text-white px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-medium">
        <div>
          Showing{" "}
          <span className="font-bold">
            {interns.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, interns.length)}
          </span>{" "}
          of <span className="font-bold">{totalInterns}</span> interns
          {interns.length !== totalInterns && (
            <span className="ml-1 opacity-75">({interns.length} filtered)</span>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={safePage <= 1}
            className="flex items-center gap-1 px-3 py-1.5 bg-black/20 hover:bg-black/30 rounded-md font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3 h-3" />
            Previous
          </button>

          {/* Page indicator */}
          <span className="px-2 py-1.5 bg-white/10 rounded-md font-bold min-w-[56px] text-center">
            {safePage} / {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={safePage >= totalPages}
            className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-900 hover:bg-gray-100 rounded-md font-bold shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
