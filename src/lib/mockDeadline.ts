interface Task {
  tanggal: string
  title: string
  description: string
}

export interface TaskTimelineProps {
  tasks?: Task[]
}

export const defaultTasks: Task[] = [
  {
    tanggal: '2026-05-14T23:59:00',
    title: 'Laporan tugas 1',
    description: 'Berisi design uiux, dan user flow dari aplikasi internify',
  },
  {
    tanggal: '2026-05-15T23:59:00',
    title: 'Laporan tugas 1',
    description: 'Berisi design uiux, dan user flow dari aplikasi internify',
  },
  {
    tanggal: '2026-06-20T21:00:00',
    title: 'Laporan tugas 1',
    description: 'Berisi design uiux, dan user flow dari aplikasi internify',
  },
]