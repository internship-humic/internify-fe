import api from "../lib/api";
import type { Project, InternTask, Intern, ProjectTask } from "../types/project.types";

export const getMyProjects = async (): Promise<Project[]> => {
  const res = await api.get("/project-api/my-projects");
  return res.data.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const res = await api.get(`/project-api/get/${id}`);
  return res.data.data;
};

export const getMyTasks = async (): Promise<InternTask[]> => {
  const res = await api.get("/project-api/my-tasks");
  return res.data.data;
};

export const getProjectInterns = async (projectId: string): Promise<Intern[]> => {
  const res = await api.get(`/project-api/interns`, {
    params: { projectId }
  });
  return res.data.data;
};

export const getProjectTasks = async (projectId: string): Promise<ProjectTask[]> => {
  const res = await api.get(`/task-api/projects/${projectId}/tasks`);
  return res.data.data;
};