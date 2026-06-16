export interface Deadline {
  date: Date;
  label: string;
  time: string;
}

export const DEADLINES: Deadline[] = [
  {
    date: new Date(2026, 5, 29),
    label: "Laporan Progress 1 Internify",
    time: "23:59 PM",
  },
  {
    date: new Date(2026, 5, 30),
    label: "Laporan Progress 2 Internify",
    time: "23:59 PM",
  },
];