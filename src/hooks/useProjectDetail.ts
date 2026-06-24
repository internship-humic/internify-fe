// hooks/useProjectDetail.ts
/**
 * Bagian Detail dari Project: Ketika User sudah masuk ke dalam Project Card
 * Komponen yang masuk: IDProject, ParticipantTab, ForumTab, Submissions
 */
import { useEffect, useState } from "react";
import { getProjectById, getProjectInterns, getProjectTasks  } from "../services/ProjectService";
import type { Project, Intern, ProjectTask } from "../types/project.types";

export const useProjectDetail = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProjectById(id)
      .then(setProject)
      .catch(() => setError("Gagal memuat detail project."))
      .finally(() => setLoading(false));
  }, [id]);

  return { project, loading, error };
};

export const useProjectInterns = (projectId: string) => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    getProjectInterns(projectId)
      .then(setInterns)
      .catch(() => setError("Gagal memuat participants."))
      .finally(() => setLoading(false));
  }, [projectId]);

  return { interns, loading, error };
};

export const useProjectTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    getProjectTasks(projectId)
      .then(setTasks)
      .catch(() => setError("Gagal memuat tasks."))
      .finally(() => setLoading(false));
  }, [projectId]);

  return { tasks, loading, error };
};