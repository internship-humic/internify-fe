import React, { useState } from 'react';
import { 
  PlusCircle, 
  UploadCloud, 
  Eye, 
  Download, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  DownloadCloud
} from 'lucide-react';
import { LuHistory, LuSendHorizontal } from 'react-icons/lu';

// Mock Data untuk Tabel Riwayat Sertifikat
const initialHistoryData = [
  { id: 1, name: "Jonathan Kristina", email: "JonathanKristina@gmail.com", project: "Internify Project", date: "24 Oct 2024", initials: "JK" },
  { id: 2, name: "Ahmad Faisal", email: "ahmad.faisal@gmail.com", project: "Web Dev Fundamentals", date: "15 Sep 2024", initials: "AF" },
  { id: 3, name: "Siti Rahma", email: "siti.rahma@gmail.com", project: "UI/UX Essentials", date: "10 Aug 2024", initials: "SR" },
  { id: 4, name: "David Beckham", email: "david.b@gmail.com", project: "Engineering Intern 101", date: "05 Aug 2024", initials: "DB" },
];

const MentorCertificatePage = () => {
  // State Form Management
  const [selectedIntern, setSelectedIntern] = useState("JonathanKristina@gmail.com");
  const [selectedProject, setSelectedProject] = useState("Internify Project (Web Development)");
  const [issueDate, setIssueDate] = useState("2024-10-24");
  const [expiryDate, setExpiryDate] = useState("");
  
  // State Data Tabel
  const [historyData, setHistoryData] = useState(initialHistoryData);

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      intern: selectedIntern,
      project: selectedProject,
      issueDate,
      expiryDate
    };
    console.log("Issuing Certificate:", payload);
    alert("Certificate Issued Successfully!");
  };

  const handleDeleteHistory = (id: number) => {
    if(confirm("Are you sure you want to delete this certificate log?")) {
      setHistoryData(historyData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="px-6 md:px-14 py-8 md:py-12 bg-gray-50 min-h-screen">
      {/* Breadcrumb & Header Title */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#B30000] mb-1 flex items-center gap-1 cursor-pointer">
          Certificates <span className="text-gray-400 font-normal">&gt;</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Certificates</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Administrate, issue, and track professional certifications for all interns.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Kiri: Form Issue New Certificate (4 Kolom) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <PlusCircle className="w-6 h-6 text-[#B30000]" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Issue New Certificate</h2>
          </div>

          <form onSubmit={handleIssueCertificate} className="space-y-5">
            {/* Select Intern */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 tracking-wide">Select Intern</label>
              <select 
                value={selectedIntern}
                onChange={(e) => setSelectedIntern(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
              >
                <option value="JonathanKristina@gmail.com">JonathanKristina@gmail.com</option>
                <option value="ahmad.faisal@gmail.com">ahmad.faisal@gmail.com</option>
                <option value="siti.rahma@gmail.com">siti.rahma@gmail.com</option>
              </select>
            </div>

            {/* Select Project / Course */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 tracking-wide">Select Project / Course</label>
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium"
              >
                <option value="Internify Project (Web Development)">Internify Project (Web Development)</option>
                <option value="Web Dev Fundamentals">Web Dev Fundamentals</option>
                <option value="UI/UX Essentials">UI/UX Essentials</option>
              </select>
            </div>

            {/* Certificate Image Upload Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 tracking-wide">Certificate Image</label>
              <div className="border-2 border-dashed border-red-200/60 bg-red-50/10 rounded-xl p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-red-50/20 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-5 h-5 text-[#B30000]" />
                </div>
                <p className="text-xs font-bold text-gray-800">Upload Certificate Image</p>
                <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 tracking-wide">Issue Date</label>
                <input 
                  type="date"
                  required
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 tracking-wide">Expiry (Optional)</label>
                <input 
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#B30000] hover:bg-[#990000] text-white text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <LuSendHorizontal className="w-4 h-4" />
              Issue Certificate
            </button>
          </form>
        </div>

        {/* Kanan: Issued Certificates History (8 Kolom) */}
        <div className="lg:col-span-7 lg:col-span-8 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header Table */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <LuHistory className="w-5 h-5 text-red-600 stroke-[2.5]" />
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Issued Certificates History</h2>
              </div>
              <button className="text-xs font-bold text-[#B30000] hover:text-[#990000] flex items-center gap-1.5 bg-red-50/50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors">
                <span>Export CSV</span>
                <DownloadCloud className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100">
                    <th className="px-6 py-3.5 text-[10.5px] font-bold tracking-wider text-gray-400 uppercase">Intern Name</th>
                    <th className="px-6 py-3.5 text-[10.5px] font-bold tracking-wider text-gray-400 uppercase">Project</th>
                    <th className="px-6 py-3.5 text-[10.5px] font-bold tracking-wider text-gray-400 uppercase">Issue Date</th>
                    <th className="px-6 py-3.5 text-[10.5px] font-bold tracking-wider text-gray-400 uppercase text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {historyData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/40 transition-colors">
                      {/* Kolom Nama Intern + Avatar Ringkas */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200/60 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                            {row.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{row.name}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Kolom Nama Proyek */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 font-medium">{row.project}</p>
                      </td>
                      {/* Kolom Tanggal Terbit */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 font-medium">{row.date}</p>
                      </td>
                      {/* Kolom Deretan Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="View Certificate">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteHistory(row.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                            title="Delete Log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian Footer Tabel & Paginasi */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-medium text-gray-500">
            <p>Showing 1 to {historyData.length} of 1,284 entries</p>
            
            <div className="flex items-center gap-1">
              <button className="p-1 border border-gray-200 rounded-md bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-md bg-[#B30000] text-white font-bold shadow-sm">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
              <button className="p-1 border border-gray-200 rounded-md bg-white text-gray-400 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MentorCertificatePage;