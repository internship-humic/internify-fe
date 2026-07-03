import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useCurrentUser } from './useUser';
import type { Project } from '../types/project.types';
import { getProjects, getMentorProjects } from '../services/ProjectService';

export const useProjectsByRole = (
  status?: "active" | "completed" | "archived"
) => {
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useCurrentUser();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    const fetcher =
      user.role === "admin"
        ? getProjects(status)
        : user.role === "mentor"
        ? getMentorProjects()
        : Promise.resolve([]);

    fetcher
      .then(setProjects)
      .catch(() => setError("Gagal memuat projects."))
      .finally(() => setLoading(false));
  }, [user, status]);

  useEffect(() => {
    if (!userLoading && user) {
      refetch();
    }
  }, [userLoading, user, refetch]);

  return {
    projects,
    loading: userLoading || loading,
    error: userError || error,
    refetch,
    role: user?.role ?? null,
  };
};