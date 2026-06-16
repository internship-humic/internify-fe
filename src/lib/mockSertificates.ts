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
}

export const certificateData: CertificateData = {
  isReceived: true,
  projectProgress: 90,
  remainingTasks: 0,
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
};

export const history: CertificateHistory[] = [
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
  },
  {
    id: 3,
    month: "Juni 2023",
    title: "Web Development Advanced",
    grade: "A+",
  },
  {
    id: 4,
    month: "Maret 2023",
    title: "UI/UX Design Advanced",
    grade: "A",
  }
]

export const initialHistoryData = [
  { id: 1, name: "Jonathan Kristina", email: "JonathanKristina@gmail.com", project: "Internify Project", date: "24 Oct 2024", initials: "JK" },
  { id: 2, name: "Ahmad Faisal", email: "ahmad.faisal@gmail.com", project: "Web Dev Fundamentals", date: "15 Sep 2024", initials: "AF" },
  { id: 3, name: "Siti Rahma", email: "siti.rahma@gmail.com", project: "UI/UX Essentials", date: "10 Aug 2024", initials: "SR" },
  { id: 4, name: "David Beckham", email: "david.b@gmail.com", project: "Engineering Intern 101", date: "05 Aug 2024", initials: "DB" },
];