// hooks/useProject.ts
import { useState, useEffect, useCallback } from "react";
import type {
  Project,
  ProjectDetail,
  InternTaskItem,
  InternDetail,
  CreateProjectPayload,
  UpdateProjectPayload,
  AssignMemberPayload,
  ProjectMember
} from "../types/project.types";
import {
  getProjects,
  getProjectById,
  getMyProjects,
  getMyTasks,
  getMentorProjects,
  getAllInterns,
  createProject,
  updateProject,
  archiveProject,
  assignMember,
  getProjectMembers
} from "../services/ProjectService";

// GET /project-api/get
export const useProjects = (status?: "active" | "completed" | "archived") => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getProjects(status)
      .then(setProjects)
      .catch(() => setError("Gagal memuat projects."))
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => { refetch(); }, [refetch]);

  return { projects, loading, error, refetch };
};

// GET /project-api/get/{id}
export const useProjectDetail = (id: string) => {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    if (!id) return;
    setLoading(true);
    getProjectById(id)
      .then(setProject)
      .catch(() => setError("Gagal memuat detail project."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { refetch(); }, [refetch]);

  return { project, loading, error, refetch };
};

//Khusus Ambil Intern dari Project/{id}
export const useProjectInterns = (projectId: string) => {
  const [interns, setInterns] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    getProjectMembers(projectId)
      .then(setInterns)
      .catch(() => setError("Gagal memuat participants."))
      .finally(() => setLoading(false));
  }, [projectId]);

  return { interns, loading, error };
};

// GET /project-api/my-projects
export const useMyProjects = () => {
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyProjects()
      .then(setProjects)
      .catch(() => setError("Gagal memuat my projects."))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};

// GET /project-api/my-tasks
export const useMyTasks = () => {
  const [tasks, setTasks] = useState<InternTaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyTasks()
      .then(setTasks)
      .catch(() => setError("Gagal memuat tasks."))
      .finally(() => setLoading(false));
  }, []);

  return { tasks, loading, error };
};

// GET /project-api/mentor-projects
export const useMentorProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMentorProjects()
      .then(setProjects)
      .catch(() => setError("Gagal memuat mentor projects."))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};

// GET /project-api/interns
export const useAllInterns = () => {
  const [interns, setInterns] = useState<InternDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllInterns()
      .then(setInterns)
      .catch(() => setError("Gagal memuat data interns."))
      .finally(() => setLoading(false));
  }, []);

  return { interns, loading, error };
};

// POST /project-api/add
export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateProjectPayload) => {
    setLoading(true);
    setError(null);
    try {
      return await createProject(payload);
    } catch {
      setError("Gagal membuat project.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

// PATCH /project-api/update/{id}
export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string | number, payload: UpdateProjectPayload) => {
    setLoading(true);
    setError(null);
    try {
      return await updateProject(id, payload);
    } catch {
      setError("Gagal mengupdate project.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

// DELETE /project-api/delete/{id}
export const useArchiveProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const archive = async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      return await archiveProject(id);
    } catch {
      setError("Gagal mengarsipkan project.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { archive, loading, error };
};

// POST /project-api/assign-member
export const useAssignMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assign = async (payload: AssignMemberPayload) => {
    setLoading(true);
    setError(null);
    try {
      return await assignMember(payload);
    } catch {
      setError("Gagal assign member.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { assign, loading, error };
};