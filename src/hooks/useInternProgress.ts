// hooks/useInternProgress.ts
import { useState, useEffect, useCallback } from "react";
import { getProjectTasks, getTaskSubmissions } from "../services/TaskService";
import { getCertificatesByProject } from "../services/CertificateService";
import type { AdminTaskDetail } from "../types/task.types";

export interface InternSubmissionProgress {
  id_user: number;
  full_name: string;
  email: string;
  avatar: string | null;
  submitted: number;
  total_tasks: number;
  is_eligible: boolean;
  has_certificate: boolean;
}

export const useProjectInternProgress = (projectid: number) => {
  const [data, setData] = useState<InternSubmissionProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!projectid) return;
    setLoading(true);
    setError(null);

    try {
      const [tasks, certificates] = await Promise.all([
        getProjectTasks(projectid),
        getCertificatesByProject(projectid).catch(() => []),
      ]);

      const certifiedUserIds = new Set(
        (certificates ?? []).map((cert) => cert.id_user)
      );

      const taskDetails = await Promise.all(
        tasks.map((task) =>
          getTaskSubmissions(task.slug, projectid) as Promise<AdminTaskDetail>
        )
      );

      const internMap = new Map<number, InternSubmissionProgress>();

      for (const taskDetail of taskDetails) {
        if (!taskDetail?.submissions) continue;

        for (const sub of taskDetail.submissions) {
          const hasSubmitted = !!sub.submission;
          const existing = internMap.get(sub.id_user);

          if (existing) {
            existing.total_tasks += 1;
            if (hasSubmitted) existing.submitted += 1;
          } else {
            internMap.set(sub.id_user, {
              id_user: sub.id_user,
              full_name: sub.full_name,
              email: sub.email,
              avatar: sub.profile_picture,
              submitted: hasSubmitted ? 1 : 0,
              total_tasks: 1,
              is_eligible: false,
              has_certificate: certifiedUserIds.has(sub.id_user),
            });
          }
        }
      }

      const result = Array.from(internMap.values()).map((intern) => ({
        ...intern,
        is_eligible:
          intern.total_tasks > 0 && intern.submitted === intern.total_tasks,
      }));

      setData(result);
    } catch {
      setError("Gagal memuat progress intern.");
    } finally {
      setLoading(false);
    }
  }, [projectid]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};