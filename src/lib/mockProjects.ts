export interface Submission {
  internEmail: string;
  submittedAt: string;
  status: "Done" | "Pending" | "Overdue";
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: "file" | "link";
  deadline: { date: Date; label: string; time: string };
  isSubmitted: boolean;
  submittedCount: number;
  totalInterns: number;
  submissions: Submission[];
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
  progress: number;
  tasksDone: number;
  tasksTotal: number;
}

// ─── Project 1 ────────────────────────────────────────────────────────────────

const project1Interns: Intern[] = [
  { name: "Jonathan Kristina", role: "Backend",  email: "jonathankristina@gmail.com" },
  { name: "Anisa Rahmawati",   role: "Backend",  email: "anisarahmawati@gmail.com"   },
  { name: "Budi Santoso",      role: "Frontend", email: "budisantoso@gmail.com"       },
  { name: "Cindy Permata",     role: "Frontend", email: "cindypermata@gmail.com"      },
  { name: "Dewa Aditya",       role: "UI/UX",    email: "dewaaditya@gmail.com"        },
  { name: "Eka Pratiwi",       role: "UI/UX",    email: "ekapratiwi@gmail.com"        },
];

// ─── Project 2 ────────────────────────────────────────────────────────────────

const project2Interns: Intern[] = [
  { name: "Fajar Nugroho",   role: "Backend",  email: "fajarnugroho@gmail.com"   },
  { name: "Gita Lestari",    role: "Backend",  email: "gitalestari@gmail.com"    },
  { name: "Hendra Wijaya",   role: "Frontend", email: "hendrawijaya@gmail.com"   },
  { name: "Indah Permata",   role: "Frontend", email: "indahpermata@gmail.com"   },
  { name: "Joko Susilo",     role: "UI/UX",    email: "jokosusilo@gmail.com"     },
  { name: "Kartika Dewi",    role: "UI/UX",    email: "kartikadewi@gmail.com"    },
];

// ─── Project 3 ────────────────────────────────────────────────────────────────

const project3Interns: Intern[] = [
  { name: "Maya Anggraeni",  role: "Backend",  email: "mayaanggraeni@gmail.com"  },
  { name: "Nanda Pratama",   role: "Backend",  email: "nandapratama@gmail.com"   },
  { name: "Oscar Firmansyah",role: "Frontend", email: "oscarfirmansyah@gmail.com"},
  { name: "Putri Handayani", role: "Frontend", email: "putrihandayani@gmail.com" },
  { name: "Rizky Maulana",   role: "UI/UX",    email: "rizkymaulana@gmail.com"   },
  { name: "Sari Utami",      role: "UI/UX",    email: "sariutami@gmail.com"      },
];

// ─── mock data ────────────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Internify Project",
    description:
      "Internify merupakan website Human Capital (HUMC) yang dirancang sebagai platform pendaftaran dan pengelolaan program magang secara digital. Sistem ini dibuat untuk membantu proses rekrutmen peserta magang mulai dari pendaftaran, seleksi, hingga monitoring aktivitas peserta selama program berlangsung.\n\nFokus utama dari pengembangan Internify adalah pembuatan Learning Management System (LMS) yang digunakan untuk mendukung kegiatan pembelajaran dan pengelolaan peserta magang. LMS pada Internify menyediakan fitur seperti akses materi pembelajaran, pengumpulan tugas, monitoring progress peserta, absensi, sertifikat, hingga komunikasi antara mentor dan peserta magang.",
    interns: project1Interns,
    mentor: "Mas A",
    progress: 12,
    tasksDone: 1,
    tasksTotal: 8,
    tasks: [
      {
        id: 2,
        title: "Laporan tugas 1",
        description:
          "Pada tugas pertama ini, Anda diminta untuk melakukan analisis mendalam terhadap kebutuhan pengguna untuk sistem Smart Campus Utility. Analisis ini akan menjadi fondasi bagi perancangan antarmuka pada fase berikutnya.",
        type: "file",
        deadline: { date: new Date(2026, 4, 14), label: "May 14, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 2,
        totalInterns: 6,
        submissions: [
          { internEmail: "jonathankristina@gmail.com", submittedAt: "May 12, 2026", status: "Done"    },
          { internEmail: "anisarahmawati@gmail.com",   submittedAt: "May 13, 2026", status: "Done"    },
          { internEmail: "budisantoso@gmail.com",      submittedAt: "-",            status: "Pending" },
          { internEmail: "cindypermata@gmail.com",     submittedAt: "-",            status: "Pending" },
          { internEmail: "dewaaditya@gmail.com",       submittedAt: "-",            status: "Pending" },
          { internEmail: "ekapratiwi@gmail.com",       submittedAt: "-",            status: "Overdue" },
        ],
      },
      {
        id: 3,
        title: "Laporan tugas 2",
        description:
          "Berisi design UI/UX dan user flow dari aplikasi Internify. Pastikan semua link Figma dapat diakses oleh mentor dan mencakup setidaknya 15 screen utama beserta prototype interaktifnya.",
        type: "link",
        deadline: { date: new Date(2026, 4, 28), label: "May 28, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 3,
        totalInterns: 6,
        submissions: [
          { internEmail: "jonathankristina@gmail.com", submittedAt: "May 25, 2026", status: "Done"    },
          { internEmail: "anisarahmawati@gmail.com",   submittedAt: "-",            status: "Pending" },
          { internEmail: "budisantoso@gmail.com",      submittedAt: "May 26, 2026", status: "Done"    },
          { internEmail: "cindypermata@gmail.com",     submittedAt: "-",            status: "Pending" },
          { internEmail: "dewaaditya@gmail.com",       submittedAt: "-",            status: "Overdue" },
          { internEmail: "ekapratiwi@gmail.com",       submittedAt: "May 28, 2026", status: "Done"    },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Rekrutmen Digital Platform",
    description:
      "Platform digital yang memudahkan proses rekrutmen karyawan baru secara end-to-end, mulai dari posting lowongan, seleksi berkas, hingga penjadwalan wawancara.",
    interns: project2Interns,
    mentor: "mas B",
    progress: 37,
    tasksDone: 3,
    tasksTotal: 8,
    tasks: [
      {
        id: 1,
        title: "Analisis Kebutuhan Sistem",
        description:
          "Dokumentasikan kebutuhan fungsional dan non-fungsional platform rekrutmen. Sertakan diagram use case dan daftar fitur prioritas.",
        type: "file",
        deadline: { date: new Date(2026, 4, 5), label: "May 5, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 4,
        totalInterns: 6,
        submissions: [
          { internEmail: "fajarnugroho@gmail.com",   submittedAt: "May 4, 2026", status: "Done"    },
          { internEmail: "gitalestari@gmail.com",    submittedAt: "May 4, 2026", status: "Done"    },
          { internEmail: "hendrawijaya@gmail.com",   submittedAt: "May 5, 2026", status: "Done"    },
          { internEmail: "indahpermata@gmail.com",   submittedAt: "May 5, 2026", status: "Done"    },
          { internEmail: "jokosusilo@gmail.com",     submittedAt: "-",           status: "Overdue" },
          { internEmail: "kartikadewi@gmail.com",    submittedAt: "-",           status: "Overdue" },
        ],
      },
      {
        id: 2,
        title: "Desain Wireframe Aplikasi",
        description:
          "Buat wireframe low-fidelity untuk seluruh alur utama rekrutmen menggunakan Figma. Sertakan link yang dapat diakses oleh mentor.",
        type: "link",
        deadline: { date: new Date(2026, 4, 15), label: "May 15, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 3,
        totalInterns: 6,
        submissions: [
          { internEmail: "fajarnugroho@gmail.com",   submittedAt: "May 13, 2026", status: "Done"    },
          { internEmail: "gitalestari@gmail.com",    submittedAt: "-",            status: "Pending" },
          { internEmail: "hendrawijaya@gmail.com",   submittedAt: "May 14, 2026", status: "Done"    },
          { internEmail: "indahpermata@gmail.com",   submittedAt: "-",            status: "Pending" },
          { internEmail: "jokosusilo@gmail.com",     submittedAt: "May 15, 2026", status: "Done"    },
          { internEmail: "kartikadewi@gmail.com",    submittedAt: "-",            status: "Overdue" },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "E-Commerce Analytics Dashboard",
    description:
      "Dashboard analitik komprehensif untuk platform e-commerce, mencakup visualisasi data penjualan, perilaku pengguna, dan performa produk secara real-time.",
    interns: project3Interns,
    mentor: "Mas C",
    progress: 50,
    tasksDone: 4,
    tasksTotal: 8,
    tasks: [
      {
        id: 1,
        title: "Setup Pipeline Data",
        description:
          "Konfigurasi ETL pipeline dari database transaksi ke data warehouse. Dokumentasikan arsitektur pipeline dan sertakan screenshot hasil pengujian.",
        type: "link",
        deadline: { date: new Date(2026, 4, 3), label: "May 3, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 5,
        totalInterns: 6,
        submissions: [
          { internEmail: "mayaanggraeni@gmail.com",   submittedAt: "May 2, 2026", status: "Done"    },
          { internEmail: "nandapratama@gmail.com",    submittedAt: "May 2, 2026", status: "Done"    },
          { internEmail: "oscarfirmansyah@gmail.com", submittedAt: "May 3, 2026", status: "Done"    },
          { internEmail: "putrihandayani@gmail.com",  submittedAt: "May 3, 2026", status: "Done"    },
          { internEmail: "rizkymaulana@gmail.com",    submittedAt: "May 3, 2026", status: "Done"    },
          { internEmail: "sariutami@gmail.com",       submittedAt: "-",           status: "Overdue" },
        ],
      },
      {
        id: 2,
        title: "Implementasi Dashboard UI",
        description:
          "Implementasikan tampilan dashboard menggunakan React dan library chart pilihan. Pastikan responsive di desktop dan tablet.",
        type: "file",
        deadline: { date: new Date(2026, 4, 20), label: "May 20, 2026", time: "23:59 PM" },
        isSubmitted: false,
        submittedCount: 2,
        totalInterns: 6,
        submissions: [
          { internEmail: "mayaanggraeni@gmail.com",   submittedAt: "May 18, 2026", status: "Done"    },
          { internEmail: "nandapratama@gmail.com",    submittedAt: "-",            status: "Pending" },
          { internEmail: "oscarfirmansyah@gmail.com", submittedAt: "May 19, 2026", status: "Done"    },
          { internEmail: "putrihandayani@gmail.com",  submittedAt: "-",            status: "Pending" },
          { internEmail: "rizkymaulana@gmail.com",    submittedAt: "-",            status: "Pending" },
          { internEmail: "sariutami@gmail.com",       submittedAt: "-",            status: "Overdue" },
        ],
      },
    ],
  },
];