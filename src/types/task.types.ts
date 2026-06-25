// types/task.types.ts

export type SubmissionType = "file_upload" | "url_link";
export type DisplayStatus = "pending" | "submitted" | "done" | "overdue";

export interface ProjectTask {
  id: number;
  id_project: number;
  slug: string;
  title: string;
  description: string;
  deadline_at: string;
  submission_type: SubmissionType;
  created_at: string;
  updated_at: string;
}

export interface TaskSubmissionData {
  id: number;
  id_task: number;
  id_user: number;
  file_path: string | null;
  url_link: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface ProjectTaskDetail extends ProjectTask {
  project: {
    id: number;
    project_name: string;
    project_icon: string;
  };
  display_status: DisplayStatus;
  my_submission: TaskSubmissionData | null;
}

export interface AdminTaskDetail extends ProjectTask {
  project: {
    id: number;
    project_name: string;
    project_icon: string;
  };
  submission_summary: {
    total_members: number;
    total_submitted: number;
    total_done: number;
    total_pending: number;
    total_overdue: number;
  };
  submissions: Array<{
    id_user: number;
    full_name: string;
    file_path: string | null;
    url_link: string | null;
    submitted_at: string | null;
    updated_at: string | null;
  }>;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  deadline_date: string; // "YYYY-MM-DD"
  specific_time: string; // "HH:mm"
  submission_type: SubmissionType;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {}