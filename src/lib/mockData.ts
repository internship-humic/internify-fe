export interface Deadline {
  date: Date;
  label: string;
  time: string;
}

export const DEADLINES: Deadline[] = [
  {
    date: new Date(2025, 4, 4), // May 4, 2025
    label: "Laporan Progress 1 Internify – 4 Juni",
    time: "23:59 PM",
  },
  {
    date: new Date(2026, 5, 5),
    label: "Laporan Progress 2 Internify - 5 May",
    time: "23:59 PM",
  },
];

export const deadlineDates: Date[] = DEADLINES.map((d) => d.date);

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: Deadline;
  isSubmitted: boolean;
  submittedCount: number;
  totalInterns: number;
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
        id: 1,
        title: "Laporan tugas",
        description: "Berisi design ulux, dan user flow dari aplikasi internify",
        deadline: { date: new Date(2026, 4, 1), label: "Laporan tugas – 1 Mei", time: "23:59 PM" },
        submittedCount: 6,
        totalInterns: 6,
        isSubmitted: true,
      },
      {
        id: 2,
        title: "Laporan tugas 1",
        description: "Berisi design ulux, dan user flow dari aplikasi internify",
        deadline: { date: new Date(2026, 4, 14), label: "Laporan tugas 1 – 14 Mei", time: "23:59 PM" },
        submittedCount: 2,
        totalInterns: 6,
        isSubmitted: false,
      },
      {
        id: 3,
        title: "Laporan tugas 2",
        description: "Berisi design ulux, dan user flow dari aplikasi internify",
        deadline: { date: new Date(2026, 4, 28), label: "Laporan tugas 2 – 28 Mei", time: "23:59 PM" },
        submittedCount: 3,
        totalInterns: 6,
        isSubmitted: false,
      },
      {
        id: 4,
        title: "Laporan tugas 3",
        description: "Berisi wireframe halaman dashboard aplikasi internify",
        deadline: { date: new Date(2026, 5, 5), label: "Laporan tugas 3 – 5 Jun", time: "23:59 PM" },
        submittedCount: 0,
        totalInterns: 6,
        isSubmitted: false,
      },
    ],
    interns: [
      { name: "Jonathan Kristina", role: "Backend", email: "jonathankristina@gmail.com" },
      { name: "Anisa Rahmawati", role: "Backend", email: "jonathankristina@gmail.com" },
      { name: "Budi Santoso", role: "Frontend", email: "jonathankristina@gmail.com" },
      { name: "Cindy Permata", role: "Frontend", email: "jonathankristina@gmail.com" },
      { name: "Dewa Aditya", role: "UI/UX", email: "jonathankristina@gmail.com" },
      { name: "Eka Pratiwi", role: "UI/UX", email: "jonathankristina@gmail.com" },
    ],
    mentor: "jonathankristina@gmail.com",
    progress: 12,
    tasksDone: 1,
    tasksTotal: 8,
  },
  {
    id: 2,
    name: "Rekrutmen Digital Platform",
    description:
      "Platform digital yang memudahkan proses rekrutmen karyawan baru secara end-to-end. Mulai dari posting lowongan, screening CV otomatis, penjadwalan wawancara, hingga onboarding karyawan baru.\n\nSistem ini mengintegrasikan berbagai modul HR seperti manajemen data kandidat, penilaian kompetensi berbasis AI, dan dashboard analytics untuk tim HR dalam mengambil keputusan rekrutmen yang lebih efektif dan efisien.",
    tasks: [
      {
        id: 1,
        title: "Analisis Kebutuhan Sistem",
        description: "Dokumentasi kebutuhan fungsional dan non-fungsional platform rekrutmen",
        deadline: { date: new Date(2026, 4, 5), label: "Analisis Kebutuhan – 5 Mei", time: "23:59 PM" },
        submittedCount: 6,
        totalInterns: 6,
        isSubmitted: true,
      },
      {
        id: 2,
        title: "Desain Database Schema",
        description: "Rancangan struktur database untuk kandidat, lowongan, dan proses seleksi",
        deadline: { date: new Date(2026, 4, 10), label: "Desain Database – 10 Mei", time: "23:59 PM" },
        submittedCount: 6,
        totalInterns: 6,
        isSubmitted: true,
      },
      {
        id: 3,
        title: "Implementasi Auth Module",
        description: "Pengembangan sistem autentikasi dan otorisasi multi-role",
        deadline: { date: new Date(2026, 4, 18), label: "Auth Module – 18 Mei", time: "23:59 PM" },
        submittedCount: 3,
        totalInterns: 6,
        isSubmitted: true,
      },
      {
        id: 4,
        title: "Modul Posting Lowongan",
        description: "Fitur buat, edit, dan publish lowongan pekerjaan",
        deadline: { date: new Date(2026, 4, 25), label: "Posting Lowongan – 25 Mei", time: "23:59 PM" },
        submittedCount: 0,
        totalInterns: 6,
        isSubmitted: false,
      },
    ],
    interns: [
      { name: "Fajar Nugroho", role: "Backend", email: "fajarnugroho@gmail.com" },
      { name: "Gita Melinda", role: "Backend", email: "gitamelinda@gmail.com" },
      { name: "Hendra Wijaya", role: "Frontend", email: "hendrawijaya@gmail.com" },
      { name: "Indira Sari", role: "Frontend", email: "indirasari@gmail.com" },
      { name: "Joko Purnomo", role: "UI/UX", email: "jokopurnomo@gmail.com" },
      { name: "Kartika Dewi", role: "QA", email: "kartikadewi@gmail.com" },
      { name: "Lukman Hakim", role: "QA", email: "lukmanhakim@gmail.com" },
    ],
    mentor: "seniormHR@company.com",
    progress: 37,
    tasksDone: 3,
    tasksTotal: 8,
  },
  {
    id: 3,
    name: "E-Commerce Analytics Dashboard",
    description:
      "Dashboard analitik komprehensif untuk platform e-commerce yang menyajikan insight real-time tentang performa penjualan, perilaku pelanggan, dan efektivitas kampanye marketing.\n\nProyek ini mencakup pengembangan pipeline data dari berbagai sumber transaksi, visualisasi interaktif menggunakan chart library modern, serta fitur export laporan dalam berbagai format untuk kebutuhan manajemen bisnis.",
    tasks: [
      {
        id: 1,
        title: "Setup Pipeline Data",
        description: "Konfigurasi ETL pipeline dari database transaksi ke data warehouse",
        deadline: { date: new Date(2026, 4, 3), label: "Setup Pipeline – 3 Mei", time: "23:59 PM" },
        submittedCount: 6,
        totalInterns: 6,
        isSubmitted: true,
      },
      {
        id: 2,
        title: "Desain Komponen Chart",
        description: "Pembuatan reusable chart component untuk berbagai tipe visualisasi data",
        deadline: { date: new Date(2026, 4, 12), label: "Komponen Chart – 12 Mei", time: "23:59 PM" },
        submittedCount: 6,
        totalInterns: 6,
        isSubmitted: true,
      },
      {
        id: 3,
        title: "Dashboard Overview Page",
        description: "Halaman utama dengan ringkasan KPI dan metric utama bisnis",
        deadline: { date: new Date(2026, 4, 20), label: "Overview Page – 20 Mei", time: "23:59 PM" },
        submittedCount: 0,
        totalInterns: 6,
        isSubmitted: false,
      },
      {
        id: 4,
        title: "Laporan Penjualan",
        description: "Modul analitik penjualan dengan filter periode dan kategori produk",
        deadline: { date: new Date(2026, 4, 28), label: "Laporan Penjualan – 28 Mei", time: "23:59 PM" },
        submittedCount: 0,
        totalInterns: 6,
        isSubmitted: false,
      },
    ],
    interns: [
      { name: "Maya Anggraeni", role: "Backend", email: "mayaanggraeni@gmail.com" },
      { name: "Nando Pratama", role: "Backend", email: "nandopratama@gmail.com" },
      { name: "Olivia Susanto", role: "Frontend", email: "oliviasusanto@gmail.com" },
      { name: "Pandu Kusuma", role: "Frontend", email: "pandukukusuma@gmail.com" },
      { name: "Qori Ramadhan", role: "Data Analyst", email: "qoriramadhan@gmail.com" },
      { name: "Rini Handayani", role: "UI/UX", email: "rinihandayani@gmail.com" },
    ],
    mentor: "leadanalyst@company.com",
    progress: 50,
    tasksDone: 4,
    tasksTotal: 8,
  },
];

export interface Certificate {
  id: string;
  issuedDate: string;
  recipientName: string;
  programName: string;
  duration: string;
  finalScore: number;
  grade: string;
  status: string;
}

export interface CertificateHistory {
  id: number;
  month: string;
  title: string;
  grade: string;
}

export interface CertificateData {
  isReceived: boolean;
  projectProgress: number;
  remainingTasks: number;
  certificate: Certificate;
  history: CertificateHistory[];
}

export const certificateData: CertificateData = {
  isReceived: false, // ubah ke false untuk tampilan "belum tersedia"
  projectProgress: 65,
  remainingTasks: 3,
  certificate: {
    id: "INF-2024-88392",
    issuedDate: "24 Oct 2024",
    recipientName: "JonathanKristina",
    programName: "Internify Project",
    duration: "8 Minggu",
    finalScore: 94,
    grade: "A",
    status: "VERIFIED",
  },
  history: [
    {
      id: 1,
      month: "Juni 2023",
      title: "Web Development Fundamentals",
      grade: "A+",
    },
    {
      id: 2,
      month: "Maret 2023",
      title: "UI/UX Design Essentials",
      grade: "A",
    }
  ],
};

// Mock Data Interns
export const mockInternsData = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@internify.edu",
    projectName: "Internify Project",
    role: "UI/UX",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" // Contoh avatar placeholder
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "s.jenkins@internify.edu",
    projectName: "Internify Project",
    role: "Frontend",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@internify.edu",
    projectName: "MBG Project",
    role: "Backend",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "e.rod@internify.edu",
    projectName: "Unassigned",
    role: "-",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 5,
    name: "Alex Rivera",
    email: "alex.rivera@internify.edu",
    projectName: "Internify Project",
    role: "UI/UX",
    avatar: "" // Simulasi tanpa gambar avatar (menggunakan placeholder inisial/gradient)
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    email: "s.jenkins@internify.edu",
    projectName: "Internify Project",
    role: "Backend",
    avatar: ""
  }
];