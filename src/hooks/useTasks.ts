import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  ProjectTaskDetail,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskSubmissionData,
  AdminTaskDetail,
  MentorTaskItem,
  ProjectTask,
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
import { useCurrentUser } from "./useUser";
import { useMyTasks } from "./useProjects";
import type { InternTaskItem } from "../types/project.types";
import { getProjects, getProjectById } from "../services/ProjectService";

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

  return { tasks, loading, error, refetch };
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

  const create = async (payload: CreateTaskPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await createTask(projectId, payload);
      return { data, message };
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Gagal membuat task.";
      setError(message);
      return { message };
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
      const { data, message } = await updateTask(taskId, payload, projectId);
      return { data, message };
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Gagal mengupdate task.";
      setError(message);
      return { message };
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
      const data = await deleteTask(taskId, projectId);
      const msg = data?.message ?? "Task berhasil dihapus.";
      return { message: msg };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal menghapus task.";
      setError(msg);
      return {  message: msg, failed: true as const };
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
      if (res.data) setSubmission(res.data);
      return res;
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal submit file.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitLink = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await submitTaskLink(taskId, url, projectId);
      if (res.data) setSubmission(res.data);
      return res;
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal submit link.";
      setError(msg);
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
      if (res.data) setSubmission(res.data);
      return res;
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal update submission.";
      setError(msg);
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
      if (res.data) setSubmission(res.data);
      return res;
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal update submission.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (submissionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteSubmission(submissionId);
      setSubmission(null);
      return { success: true as const, message: res.message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal hapus submission.";
      setError(msg);
      return { success: false as const, message: msg };
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

// hooks/useAllMentorTasks.ts - Ambil semua tasks untuk mentor (tanpa filter project)/hanya ambil tasks yang dibuat pengguna tersebut (mentor) untuk semua project yang dia ikuti. Ini digunakan untuk menampilkan semua tasks mentor di halaman dashboard mentor.
export const useAllMentorTasks = (enabled: boolean) => {
  const [tasks, setTasks] = useState<MentorTaskItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
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

// hooks.useRetrieveAllTasks.ts - Ambil semua tasks untuk admin tanpa adanya batasan dari pembuat task (mentor), bertujuan agar admin bisa melihat semua task yang ada di dalam database
interface AdminTask extends ProjectTask {
  project_name: string;
}
export const useRetrieveAllTasks = (enabled = true) => {
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    const fetchAllTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const projects = await getProjects();
        const projectDetails = await Promise.all(
          projects.map((project) => getProjectById(project.id)),
        );

        if (!isMounted) return;

        const allTasks = projectDetails.flatMap((project) =>
          project.tasks.map((task) => ({
            ...task,
            project_name: project.project_name,
          })),
        );
        setTasks(allTasks);
      } catch (err) {
        if (!isMounted) return;
        setError("Gagal memuat semua tasks.");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchAllTasks();
    return () => {
      isMounted = false;
    };
  }, [enabled]);

  return { tasks, loading, error };
}

export const useDeadlines = () => {
  const { user, loading: userLoading, error: userError } = useCurrentUser();

  const isIntern = user?.role === "intern";
  const isMentor = user?.role === "mentor";
  const isAdmin = user?.role === "admin";

  const { tasks: internTasks, loading: internLoading, error: internError } = useMyTasks();
  const { tasks: mentorTasks, loading: mentorLoading, error: mentorError } = useAllMentorTasks(isMentor);
  const { tasks: allTasks, loading: allTasksLoading, error: allTasksError } = useRetrieveAllTasks(isAdmin);

  const deadlines: Deadline[] = useMemo(() => {
    if (!user) return [];

    if (isIntern) {
      return internTasks.map((task) => ({
        date: new Date(task.deadline_at),
        label: task.title,
      }));
    }

    if (isMentor) {
      return mentorTasks.map((task) => ({
        date: new Date(task.deadline_at),
        label: `[${task.project_name}] ${task.title}`,
      }));
    }

    if (isAdmin) {
      return allTasks.map((task) => ({
        date: new Date(task.deadline_at),
        label: `[${task.project_name}] ${task.title}`,
      }));
    }

    return [];
  }, [isAdmin, isIntern, isMentor, allTasks, internTasks, mentorTasks, user]);

  const loading = userLoading || (isIntern ? internLoading : isMentor ? mentorLoading : allTasksLoading);
  const error = userError || (isIntern ? internError : isMentor ? mentorError : allTasksError);

  return { deadlines, loading, error, isIntern };
};
