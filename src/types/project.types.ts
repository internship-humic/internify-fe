// types/project.types.ts

export type ProjectStatus = "active" | "completed" | "archived";
export type MemberStatus = "active" | "inactive";

export interface ProjectAdmin {
  id: number;
  full_name: string;
  email: string;
  profile_picture: string | null;
  professional_bio: string | null;
}

export interface ProjectMember {
  id: number;
  id_user: number;
  status?: MemberStatus;
  created_at?: string;
  updated_at?: string;
}

// Response GET /project-api/get dan GET /project-api/get/{id}
export interface Project {
  id: number;
  slug: string;
  project_icon: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: ProjectStatus;
  admin: ProjectAdmin;
  total_members: number;
  total_tasks: number;
  created_at: string;
  updated_at: string;
}

// Detail project (includes members array)
export interface ProjectDetail extends Project {
  members: ProjectMember[];
}

// Response GET /project-api/my-tasks
export interface InternTaskItem {
  id: number;
  slug: string;
  id_project: number;
  project_slug: string;
  project_name: string;
  project_icon: string;
  title: string;
  description: string;
  deadline_at: string;
  submission_type: "file_upload" | "url_link";
  submission_status: "pending" | "submitted" | "done" | "overdue";
  submission_details: {
    id: number;
    file_path: string | null;
    url_link: string | null;
    submitted_at: string;
    updated_at: string;
  } | null;
}

// Response GET /project-api/interns
export interface InternDetail {
  id: number;
  name: string;
  email: string;
  projectName: string;
  role: string;
  isAssignedByMentor: boolean;
  avatar: string | null;
}

// Payload POST /project-api/add
export interface CreateProjectPayload {
  project_icon: string;
  project_name: string;
  description: string;
  start_date: string; // "YYYY-MM-DD"
  end_date: string;   // "YYYY-MM-DD"
  member_emails?: string[];
}

// Payload PATCH /project-api/update/{id}
export interface UpdateProjectPayload {
  project_icon?: string;
  project_name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: ProjectStatus;
}

// Payload POST /project-api/assign-member
export interface AssignMemberPayload {
  id_project: number;
  id_user: number;
}

// Response assign-member
export interface MemberAssignment {
  id: number;
  id_project: number;
  id_user: number;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: number;
  full_name: string;
  email: string;
  professional_bio: string | null;
  position: string;
  kelompok_peminatan: string;
}