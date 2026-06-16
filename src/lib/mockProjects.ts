import type { Deadline } from "./mockDeadline";

export interface Submission {
  internEmail: string;
  submittedAt?: string;
  status: 'Done' | 'Pending' | 'Overdue';
}

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: Deadline;
  type: 'file' | 'link';
  submissions: Submission[]; 
  isSubmitted: boolean;    // Kembalikan untuk komponen lain
  submittedCount: number;  // Kembalikan untuk komponen lain
  totalInterns: number;    // Kembalikan untuk komponen lain
}

export interface Intern {
  name: string;
  role: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  interns: Intern[];
  mentor: string;
  avatarUrl?: string;
  thumbnailUrl?: string;
  progress: number;
  tasksDone: number;
  tasksTotal: number;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Internify Project",
    description:
      "Internify merupakan website Human Capital (HUMC) yang dirancang sebagai platform pendaftaran dan pengelolaan program magang secara digital. Sistem ini dibuat untuk membantu proses rekrutmen peserta magang mulai dari pendaftaran, seleksi, hingga monitoring aktivitas peserta selama program berlangsung.\n\nFokus utama dari pengembangan Internify adalah pembuatan Learning Management System (LMS) yang digunakan untuk mendukung kegiatan pembelajaran dan pengelolaan peserta magang. LMS pada Internify menyediakan fitur seperti akses materi pembelajaran, pengumpulan tugas, monitoring progress peserta, absensi, sertifikat, hingga komunikasi antara mentor dan peserta magang.",
    tasks: [
      {
        id: 2,
        title: "Laporan tugas 1",
        description: "Berisi design uiux, dan user flow dari aplikasi internify.",
        type: 'file',
        deadline: { date: new Date(2026, 4, 14), label: "May 14, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 2,
        totalInterns: 6,
        submissions: [
          { internEmail: "jonathankristina@gmail.com", submittedAt: "May 12, 2026", status: "Done" },
          { internEmail: "anisarahmawati@gmail.com", submittedAt: "May 13, 2026", status: "Done" },
          { internEmail: "budisantoso@gmail.com", submittedAt: "-", status: "Pending" },
          { internEmail: "cindypermata@gmail.com", submittedAt: "-", status: "Pending" },
          { internEmail: "dewaaditya@gmail.com", submittedAt: "-", status: "Pending" },
          { internEmail: "ekapratiwi@gmail.com", submittedAt: "-", status: "Pending" },
        ]
      },
      {
        id: 3,
        title: "Laporan tugas 2",
        description: "Berisi design uiux, dan user flow dari aplikasi internify. Pastikan semua link Figma dapat diakses oleh mentor dan mencakup setidaknya 15 screen utama beserta prototype interaktifnya.",
        type: 'link',
        deadline: { date: new Date(2026, 4, 28), label: "May 28, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 3,
        totalInterns: 6,
        submissions: [
          { internEmail: "jonathankristina@gmail.com", submittedAt: "May 25, 2026", status: "Done" },
          { internEmail: "anisarahmawati@gmail.com", submittedAt: "May 26, 2026", status: "Pending" },
          { internEmail: "budisantoso@gmail.com", submittedAt: "May 26, 2026", status: "Done" },
          { internEmail: "cindypermata@gmail.com", submittedAt: "May 27, 2026", status: "Pending" },
          { internEmail: "dewaaditya@gmail.com", submittedAt: "-", status: "Overdue" },
          { internEmail: "ekapratiwi@gmail.com", submittedAt: "May 28, 2026", status: "Done" },
        ]
      },
    ],
    interns: [
      { name: "Alex Rivera", role: "Backend", email: "jonathankristina@gmail.com" },
      { name: "Sarah Jenkins", role: "Backend", email: "anisarahmawati@gmail.com" },
      { name: "Marcus Lee", role: "Frontend", email: "budisantoso@gmail.com" },
      { name: "Tanya Hudson", role: "Frontend", email: "cindypermata@gmail.com" },
      { name: "Ben King", role: "UI/UX", email: "dewaaditya@gmail.com" },
      { name: "Eka Pratiwi", role: "UI/UX", email: "ekapratiwi@gmail.com" },
    ],
    mentor: "jonathankristina@gmail.com",
    progress: 12,
    tasksDone: 1,
    tasksTotal: 8,
  },
  {
    id: 2,
    name: "Rekrutmen Digital Platform",
    description: "Platform digital yang memudahkan proses rekrutmen karyawan baru secara end-to-end.",
    tasks: [
      {
        id: 1,
        title: "Analisis Kebutuhan Sistem",
        description: "Dokumentasi kebutuhan platform rekrutmen",
        type: 'file',
        deadline: { date: new Date(2026, 4, 5), label: "May 5, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 6,
        totalInterns: 6,
        submissions: [
          { internEmail: "fajarnugroho@gmail.com", submittedAt: "May 4, 2026", status: "Done" },
        ]
      }
    ],
    interns: [
      { name: "Fajar Nugroho", role: "Backend", email: "fajarnugroho@gmail.com" },
    ],
    mentor: "seniormHR@company.com",
    progress: 37,
    tasksDone: 3,
    tasksTotal: 8,
  },
  {
    id: 3,
    name: "E-Commerce Analytics Dashboard",
    description: "Dashboard analitik komprehensif untuk platform e-commerce.",
    tasks: [
      {
        id: 1,
        title: "Setup Pipeline Data",
        description: "Konfigurasi ETL pipeline dari database transaksi ke data warehouse",
        type: 'link',
        deadline: { date: new Date(2026, 4, 3), label: "May 3, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 6,
        totalInterns: 6,
        submissions: [
          { internEmail: "mayaanggraeni@gmail.com", submittedAt: "May 2, 2026", status: "Done" },
        ]
      }
    ],
    interns: [
      { name: "Maya Anggraeni", role: "Backend", email: "mayaanggraeni@gmail.com" },
    ],
    mentor: "leadanalyst@company.com",
    progress: 50,
    tasksDone: 4,
    tasksTotal: 8,
  },
];