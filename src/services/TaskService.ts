import api from "../lib/api";
import type {
  ProjectTask,
  ProjectTaskDetail,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskSubmissionData,
} from "../types/task.types";
import type { InternTaskItem, Project } from "../types/project.types";
import type { MentorTaskItem, AdminTaskDetail } from "../types/task.types";

export const createTask = async (
  projectId: string | number,
  payload: CreateTaskPayload
): Promise<{ data: ProjectTask; message: string }> => {
  const res = await api.post(`/task-api/projects/${projectId}/tasks`, payload);
  return { data: res.data.data, message: res.data.message };
};

export const getProjectTasks = async (
  projectId: string | number
): Promise<InternTaskItem[]> => {
  const res = await api.get(`/task-api/projects/${projectId}/tasks`);
  return res.data.data;
};

export const getTaskById = async (
  taskId: string | number,
  projectId?: string | number
): Promise<ProjectTaskDetail> => {
  const res = await api.get(`/task-api/tasks/${taskId}`, {
    params: projectId ? { project: projectId } : undefined,
  });
  return res.data.data;
};

export const getTaskSubmissions = async (
  taskId: string | number,
  projectId?: string | number
): Promise<AdminTaskDetail> => {
  const res = await api.get(`/task-api/tasks/${taskId}`, {
    params: projectId ? { project: projectId } : undefined,
  });
  return res.data.data;
};

export const updateTask = async (
  taskId: string | number,
  payload: UpdateTaskPayload,
  projectId?: string | number
): Promise<{ data: ProjectTask; message: string }> => {
  const res = await api.patch(`/task-api/tasks/${taskId}`, payload, {
    params: projectId ? { project: projectId } : undefined,
  });
  return { data: res.data.data, message: res.data.message };
};

export const deleteTask = async (
  taskId: string | number,
  projectId?: string | number
) => {
  const res = await api.delete(`/task-api/tasks/${taskId}`, {
    params: projectId ? { project: projectId } : undefined,
  });
  return res.data;
};

export const getAllMentorTasks = async (): Promise<MentorTaskItem[]> => {
  const projectsRes = await api.get("/project-api/mentor-projects");
  const projects: Project[] = projectsRes.data.data;

  const tasksByProject = await Promise.all(
    projects.map(async (project) => {
      const tasksRes = await api.get(`/task-api/projects/${project.id}/tasks`);
      return tasksRes.data.data.map((task: any) => ({
        ...task,
        project_name: project.project_name,
        project_slug: project.slug,
      }));
    })
  );

  return tasksByProject.flat();
};



// Submission
export const submitTaskFile = async (
  taskId: string | number,
  files: File[],
  projectId?: string | number
): Promise<{ data: TaskSubmissionData; message: string }> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("submission_files", file));
  const res = await api.post(`/task-api/tasks/${taskId}/submissions`, formData, {
    params: projectId ? { project: projectId } : undefined,
  });
  return { data: res.data.data, message: res.data.message };
};

export const submitTaskLink = async (
  taskId: string | number,
  url_link: string,
  projectId?: string | number
): Promise<{ data: TaskSubmissionData; message: string }> => {
  const formData = new FormData();
  formData.append("url_link", url_link);
  const res = await api.post(`/task-api/tasks/${taskId}/submissions`, formData, {
    params: projectId ? { project: projectId } : undefined,
  });
  return { data: res.data.data, message: res.data.message };
};

export const updateSubmissionFile = async (
  submissionId: number,
  files: File[]
): Promise<{ data: TaskSubmissionData; message: string }> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("submission_files", file));
  const res = await api.patch(`/task-api/submissions/${submissionId}`, formData);
  return { data: res.data.data, message: res.data.message };
};

export const updateSubmissionLink = async (
  submissionId: number,
  url_link: string
): Promise<{ data: TaskSubmissionData; message: string }> => {
  const formData = new FormData();
  formData.append("url_link", url_link);
  const res = await api.patch(`/task-api/submissions/${submissionId}`, formData);
  return { data: res.data.data, message: res.data.message };
};

export const deleteSubmission = async (submissionId: number): Promise<{ message: string }> => {
  const res = await api.delete(`/task-api/submissions/${submissionId}`);
  return { message: res.data.message };
};