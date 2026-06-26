// hooks/useMahasiswa.ts
import { useState, useEffect } from 'react';
import type { Mahasiswa } from '../types/project.types';
import { getMahasiswa } from '../services/MahasiswaService';

export const useMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMahasiswa()
      .then(setMahasiswa)
      .catch(() => setError('Gagal memuat data mahasiswa.'))
      .finally(() => setLoading(false));
  }, []);

  return { mahasiswa, loading, error };
};