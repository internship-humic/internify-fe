// hooks/useMahasiswa.ts
import { useState, useEffect, useCallback } from 'react';
import type { Mahasiswa } from '../types/project.types';
import { getMahasiswa } from '../services/MahasiswaService';

export const useMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getMahasiswa()
      .then(setMahasiswa)
      .catch(() => setError('Gagal memuat data mahasiswa.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { mahasiswa, loading, error, refetch };
};