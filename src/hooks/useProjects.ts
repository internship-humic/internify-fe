import { useEffect, useState } from "react";
// Projects
import { getMyProjects } from "../services/ProjectService";
import type { Project } from "../types/project.types";
// Tasks
import { getMyTasks } from "../services/ProjectService";
import type { InternTask } from "../types/project.types";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getMyProjects()
      .then(setProjects)
      .catch(() => setError("Gagal memuat project."))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};

export const useInternTasks = () => {
  const [tasks, setTasks] = useState<InternTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getMyTasks()
      .then(setTasks)
      .catch(() => setError("Gagal memuat tasks."))
      .finally(() => setLoading(false));
  }, []);

  return { tasks, loading, error };
};

