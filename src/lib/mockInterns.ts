export interface InternData {
  id: number;
  name: string;
  email: string;
  projectName: string;
  role: string;
  avatar: string;
}

export const mockInternsData: InternData[] = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@internify.edu",
    projectName: "Internify Project",
    role: "UI/UX",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "s.jenkins@internify.edu",
    projectName: "Internify Project",
    role: "Frontend",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@internify.edu",
    projectName: "MBG Project",
    role: "Backend",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "e.rod@internify.edu",
    projectName: "Unassigned",
    role: "-",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    name: "Alex Rivera",
    email: "alex.rivera@internify.edu",
    projectName: "Internify Project",
    role: "UI/UX",
    avatar: "",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    email: "s.jenkins@internify.edu",
    projectName: "Internify Project",
    role: "Backend",
    avatar: "",
  },
];