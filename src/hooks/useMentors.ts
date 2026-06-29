import { useState, useEffect, useCallback } from "react";
import type { MentorData, CreateMentorPayload, UpdateMentorPayload } from "../services/MentorServices";
import {
  createMentorService,
  getMentorsService,
  getMentorDetailService,
  updateMentorService,
  deleteMentorService,
} from "../services/MentorServices"

// ── GET ALL ──────────────────────────────────────────────────────────────────
export const useMentors = () => {
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setMentors(await getMentorsService());
    } catch {
      setError("Gagal mengambil data mentor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { mentors, loading, error, refetch: fetch };
};

// ── GET DETAIL ───────────────────────────────────────────────────────────────
export const useMentorDetail = (id: number | null) => {
  const [mentor, setMentor] = useState<MentorData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      setMentor(await getMentorDetailService(id));
    } catch {
      setError("Gagal mengambil detail mentor.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { mentor, loading, error, refetch: fetch };
};

// ── CREATE ───────────────────────────────────────────────────────────────────
export const useCreateMentor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMentor = async (payload: CreateMentorPayload): Promise<MentorData | null> => {
    setLoading(true);
    setError(null);
    try {
      return await createMentorService(payload);
    } catch {
      setError("Gagal membuat akun mentor.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createMentor, loading, error };
};

// ── UPDATE ───────────────────────────────────────────────────────────────────
export const useUpdateMentor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMentor = async (
    id: number,
    payload: UpdateMentorPayload
  ): Promise<MentorData | null> => {
    setLoading(true);
    setError(null);
    try {
      return await updateMentorService(id, payload);
    } catch {
      setError("Gagal memperbarui data mentor.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateMentor, loading, error };
};

// ── DELETE ───────────────────────────────────────────────────────────────────
export const useDeleteMentor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMentor = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteMentorService(id);
      return true;
    } catch {
      setError("Gagal menghapus mentor.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMentor, loading, error };
};