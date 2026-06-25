// hooks/useTasks.ts
import { useState, useEffect, useCallback } from "react";
import type { ProjectTask, ProjectTaskDetail, CreateTaskPayload, UpdateTaskPayload, TaskSubmissionData } from "../types/task.types";
import {
  getProjectTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  submitTaskFile,
  submitTaskLink,
  updateSubmissionFile,
  updateSubmissionLink,
  deleteSubmission,
} from "../services/TaskService";

// GET /task-api/projects/{id_project}/tasks
export const useProjectTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    getProjectTasks(projectId)
      .then(setTasks)
      .catch(() => setError("Gagal memuat task."))
      .finally(() => setLoading(false));
  }, [projectId]);

  return { tasks, loading, error };
};

// GET /task-api/tasks/{id}
export const useTaskDetail = (taskId: string, projectId?: string) => {
  const [task, setTask] = useState<ProjectTaskDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    if (!taskId) return;
    setLoading(true);
    getTaskById(taskId, projectId)
      .then(setTask)
      .catch(() => setError("Gagal memuat detail task."))
      .finally(() => setLoading(false));
  }, [taskId, projectId]);

  useEffect(() => { refetch(); }, [refetch]);

  return { task, loading, error, refetch };
};

// POST /task-api/projects/{id_project}/tasks
export const useCreateTask = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateTaskPayload): Promise<ProjectTask | null> => {
    setLoading(true);
    setError(null);
    try {
      return await createTask(projectId, payload);
    } catch {
      setError("Gagal membuat task.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

// PATCH /task-api/tasks/{id}
export const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    taskId: string | number,
    payload: UpdateTaskPayload,
    projectId?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      return await updateTask(taskId, payload, projectId);
    } catch {
      setError("Gagal mengupdate task.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

// DELETE /task-api/tasks/{id}
export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (taskId: string | number, projectId?: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(taskId, projectId);
      return true;
    } catch {
      setError("Gagal menghapus task.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};

// POST + PATCH + DELETE submission — digabung dalam satu hook per task
export const useSubmission = (taskId: string, initialSubmission?: TaskSubmissionData | null, projectId?: string) => {
  const [submission, setSubmission] = useState<TaskSubmissionData | null>(initialSubmission ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFile = async (file: File) => {
    setLoading(true); setError(null);
    try {
      const res = await submitTaskFile(taskId, file, projectId);
      if (res) setSubmission(res);
      return res;
    } catch { setError("Gagal submit file."); return null; }
    finally { setLoading(false); }
  };

  const submitLink = async (url: string) => {
    setLoading(true); setError(null);
    try {
      const res = await submitTaskLink(taskId, url, projectId);
      if (res) setSubmission(res);
      return res;
    } catch { setError("Gagal submit link."); return null; }
    finally { setLoading(false); }
  };

  const updateFile = async (submissionId: number, file: File) => {
    setLoading(true); setError(null);
    try {
      const res = await updateSubmissionFile(submissionId, file);
      if (res) setSubmission(res);
      return res;
    } catch { setError("Gagal update submission."); return null; }
    finally { setLoading(false); }
  };

  const updateLink = async (submissionId: number, url: string) => {
    setLoading(true); setError(null);
    try {
      const res = await updateSubmissionLink(submissionId, url);
      if (res) setSubmission(res);
      return res;
    } catch { setError("Gagal update submission."); return null; }
    finally { setLoading(false); }
  };

  const remove = async (submissionId: number) => {
    setLoading(true); setError(null);
    try {
      await deleteSubmission(submissionId);
      setSubmission(null);
      return true;
    } catch { setError("Gagal hapus submission."); return false; }
    finally { setLoading(false); }
  };

  return { submission, submitFile, submitLink, updateFile, updateLink, remove, loading, error };
};