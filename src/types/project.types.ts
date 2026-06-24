// Admin/Mentor Projects
export interface ProjectAdmin {
  id: number;
  full_name: string;
  email: string;
  profile_picture: string;
  professional_bio: string;
}

// Project General
export interface Project {
  id: number;
  project_icon: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "active" | "inactive" | "completed";
  admin: ProjectAdmin;
  total_members: number;
  total_tasks: number;
  created_at: string;
  updated_at: string;
}

// 
export interface TaskSubmissionDetails {
  id: number;
  file_path: string | null;
  url_link: string | null;
  submitted_at: string;
  updated_at: string;
}

// Task General: ALL TASK COMBINED
export interface InternTask {
  id: number;
  id_project: number;
  project_name: string;
  project_icon: string;
  title: string;
  description: string;
  deadline_at: string;
  submission_type: "url_link" | "file";
  submission_status: "submitted" | "pending" | "late";
  submission_details: TaskSubmissionDetails | null;
}

// Intern
export interface Intern {
  id: number;
  name: string;
  email: string;
  projectName: string;
  role: string;
  isAssignedByMentor: boolean;
  avatar: string | null;
}

//Project Task
export interface ProjectTask {
  id: number;
  id_project: number;
  title: string;
  description: string;
  deadline_at: string;
  submission_type: "file_upload" | "url_link";
  created_at: string;
  updated_at: string;
}