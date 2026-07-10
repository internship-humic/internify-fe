// hooks/useTasks.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  ProjectTask,
  ProjectTaskDetail,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskSubmissionData,
  AdminTaskDetail,
} from "../types/task.types";
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
  getAllMentorTasks,
  getTaskSubmissions,
} from "../services/TaskService";
import type { MentorTaskItem } from "../types/task.types";
import { useCurrentUser } from "./useUser";
import { useMyTasks } from "./useProjects";
import type { InternTaskItem } from "../types/project.types";

// GET /task-api/projects/{id_project}/tasks
export const useProjectTasks = (projectId: number) => {
  const [tasks, setTasks] = useState<InternTaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    if (!projectId) return;
    setLoading(true);
    getProjectTasks(projectId)
      .then(setTasks)
      .catch(() => setError("Gagal memuat task."))
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { tasks, loading, error, refetch }; // tambah refetch
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

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { task, loading, error, refetch };
};

export const useTaskSubmissions = (taskId: string, projectId?: string) => {
  const [task, setTask] = useState<AdminTaskDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    if (!taskId) return;
    setLoading(true);
    getTaskSubmissions(taskId, projectId)
      .then(setTask)
      .catch(() => setError("Gagal memuat submissions."))
      .finally(() => setLoading(false));
  }, [taskId, projectId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { task, loading, error, refetch };
};

// POST /task-api/projects/{id_project}/tasks
export const useCreateTask = (projectId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (
    payload: CreateTaskPayload,
  ): Promise<ProjectTask | null> => {
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
    projectId?: string,
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
export const useSubmission = (
  taskId: string,
  initialSubmission?: TaskSubmissionData | null,
  projectId?: string,
) => {
  const [submission, setSubmission] = useState<TaskSubmissionData | null>(
    initialSubmission ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFile = async (files: File[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await submitTaskFile(taskId, files, projectId);
      if (res) setSubmission(res);
      return res;
    } catch (err){
      setError("Gagal submit file.");
      throw error;
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitLink = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await submitTaskLink(taskId, url, projectId);
      if (res) setSubmission(res);
      return res;
    } catch (err){
      setError("Gagal submit link.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFile = async (submissionId: number, files: File[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateSubmissionFile(submissionId, files);
      if (res) setSubmission(res);
      return res;
    } catch (err){
      setError("Gagal update submission.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async (submissionId: number, url: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateSubmissionLink(submissionId, url);
      if (res) setSubmission(res);
      return res;
    } catch (err){
      setError("Gagal update submission.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (submissionId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteSubmission(submissionId);
      setSubmission(null);
      return true;
    } catch (err) {
      setError("Gagal hapus submission.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submission,
    submitFile,
    submitLink,
    updateFile,
    updateLink,
    remove,
    loading,
    error,
  };
};

// hooks/useAllMentorTasks.ts
export const useAllMentorTasks = (enabled: boolean) => {
  const [tasks, setTasks] = useState<MentorTaskItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return; // tidak fetch kalau intern
    setLoading(true);
    getAllMentorTasks()
      .then(setTasks)
      .catch(() => setError("Gagal memuat tasks mentor."))
      .finally(() => setLoading(false));
  }, [enabled]);

  return { tasks, loading, error };
};

export interface Deadline {
  date: Date;
  label: string;
}

export const useDeadlines = () => {
  const { user, loading: userLoading, error: userError } = useCurrentUser();

  const isIntern = user?.role === "intern";

  const {
    tasks: internTasks,
    loading: internLoading,
    error: internError,
  } = useMyTasks();
  const {
    tasks: mentorTasks,
    loading: mentorLoading,
    error: mentorError,
  } = useAllMentorTasks(!isIntern && user !== null);

  const deadlines: Deadline[] = useMemo(() => {
    if (!user) return [];
    return isIntern
      ? internTasks.map((task) => ({
          date: new Date(task.deadline_at),
          label: task.title,
        }))
      : mentorTasks.map((task) => ({
          date: new Date(task.deadline_at),
          label: `[${task.project_name}] ${task.title}`,
        }));
  }, [isIntern, internTasks, mentorTasks, user]);

  // Loading: tunggu user dulu, baru tunggu task yang relevan dengan rolenya
  const loading = userLoading || (isIntern ? internLoading : mentorLoading);
  const error = userError || (isIntern ? internError : mentorError);

  return { deadlines, loading, error, isIntern };
};
