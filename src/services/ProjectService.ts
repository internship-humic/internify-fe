// services/ProjectService.ts
import api from "../lib/api";
import type {
  Project,
  ProjectDetail,
  InternTaskItem,
  InternDetail,
  CreateProjectPayload,
  UpdateProjectPayload,
  AssignMemberPayload,
  MemberAssignment,
  ProjectMember
} from "../types/project.types";

// POST /project-api/add
export const createProject = async (
  payload: CreateProjectPayload
): Promise<ProjectDetail> => {
  const res = await api.post("/project-api/add", payload);
  return res.data.data;
};

// GET /project-api/get
export const getProjects = async (
  status?: "active" | "completed" | "archived"
): Promise<Project[]> => {
  const res = await api.get("/project-api/get", {
    params: status ? { status } : undefined,
  });
  return res.data.data;
};

// GET /project-api/get/{id} → ambil members saja
export const getProjectMembers = async (
  id: string | number
): Promise<ProjectMember[]> => {
  const res = await api.get(`/project-api/get/${id}`);
  return res.data.data.members;
};

// GET /project-api/get/{id}
export const getProjectById = async (
  id: string | number
): Promise<ProjectDetail> => {
  const res = await api.get(`/project-api/get/${id}`);
  return res.data.data;
};

// PATCH /project-api/update/{id}
export const updateProject = async (
  id: string | number,
  payload: UpdateProjectPayload
): Promise<ProjectDetail> => {
  const res = await api.patch(`/project-api/update/${id}`, payload);
  return res.data.data;
};

// DELETE /project-api/delete/{id} — soft delete (archive)
export const archiveProject = async (
  id: string | number
): Promise<ProjectDetail> => {
  const res = await api.delete(`/project-api/delete/${id}`);
  return res.data.data;
};

// GET /project-api/my-projects (intern only)
export const getMyProjects = async (): Promise<ProjectDetail[]> => {
  const res = await api.get("/project-api/my-projects");
  return res.data.data;
};

// GET /project-api/my-tasks (intern only)
export const getMyTasks = async (): Promise<InternTaskItem[]> => {
  const res = await api.get("/project-api/my-tasks");
  return res.data.data;
};

// GET /project-api/mentor-projects (admin/mentor only)
export const getMentorProjects = async (): Promise<Project[]> => {
  const res = await api.get("/project-api/mentor-projects");
  return res.data.data;
};

// GET /project-api/interns (admin/mentor only)
export const getAllInterns = async (): Promise<InternDetail[]> => {
  const res = await api.get("/project-api/interns");
  return res.data.data;
};

// POST /project-api/assign-member (admin/mentor only)
export const assignMember = async (
  payload: AssignMemberPayload
): Promise<MemberAssignment> => {
  const res = await api.post("/project-api/assign-member", payload);
  return res.data.data;
};