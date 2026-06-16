export interface Deadline {
  date: Date;
  label: string;
  time: string;
}

export const DEADLINES: Deadline[] = [
  {
    date: new Date(2025, 4, 4),
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