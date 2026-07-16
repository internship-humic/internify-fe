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
  AssignableIntern,
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
  getProjectMembers,
  removeMember,
  getAssignableInterns,
  completeProject
} from "../services/ProjectService";
import { useMemo } from "react";

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

  const refetch = useCallback(() => {
    setLoading(true);
    getMyProjects()
      .then(setProjects)
      .catch(() => setError("Gagal memuat my projects."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { projects, loading, error, refetch };
};
// GET /project-api/my-tasks
export const useMyTasks = () => {
  const [tasks, setTasks] = useState<InternTaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getMyTasks()
      .then(setTasks)
      .catch(() => setError("Gagal memuat tasks."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { tasks, loading, error, refetch };
};

// GET /project-api/mentor-projects
export const useMentorProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getMentorProjects()
      .then(setProjects)
      .catch(() => setError("Gagal memuat mentor projects."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { projects, loading, error, refetch };
};

// GET /project-api/interns
export const useAllInterns = () => {
  const [interns, setInterns] = useState<InternDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getAllInterns()
      .then(setInterns)
      .catch(() => setError("Gagal memuat data interns."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { interns, loading, error, refetch };
};

export const useAssignableInterns = () => {
  const [AssignableInterns, setAssignableInterns] = useState<AssignableIntern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getAssignableInterns()
      .then(setAssignableInterns)
      .catch(() => setError("Gagal memuat data assignable interns."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { interns: AssignableInterns, loading, error, refetch };
}

// POST /project-api/add
export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateProjectPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await createProject(payload);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal membuat project.";
      setError(msg);
      return { success: false as const, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export const useProjectMyTasks = (projectId: number) => {
  const { tasks, loading, error } = useMyTasks();

  const projectTasks = useMemo<InternTaskItem[]>(() => {
    if (!projectId || !tasks.length) return [];
    return tasks.filter(task => task.id_project === projectId);
  }, [tasks, projectId]);

  return { tasks: projectTasks, loading, error };
};

// PATCH /project-api/update/{id}
export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string | number, payload: UpdateProjectPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await updateProject(id, payload);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal mengupdate project.";
      setError(msg);
      return { success: false as const, message: msg };
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
      const { data, message } = await archiveProject(id);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal mengarsipkan project.";
      setError(msg);
      return { success: false as const, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { archive, loading, error };
};

export const useCompleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await completeProject(id);
      return { success: true as const, data, message}
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal menyelesaikan project.";
      setError(msg);
      return { success: false as const, message: msg};
    } finally {
      setLoading(false);
    }
  };

  return { complete, loading, error };
};

// POST /project-api/assign-member
export const useAssignMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assign = async (payload: AssignMemberPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await assignMember(payload);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal assign member.";
      setError(msg);
      return { success: false as const, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { assign, loading, error };
};

// Hapus/Keluarkan Member dari Projek
export const useRemoveMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (payload: { id_project: string | number, id_user: number }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await removeMember(payload);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal remove member.";
      setError(msg);
      return { success: false as const, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};