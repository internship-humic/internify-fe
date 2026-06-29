// services/mahasiswa.service.ts
import api from '../lib/api';
import type { Mahasiswa, MahasiswaResponse } from "../types/project.types"

export const getMahasiswa = async (): Promise<Mahasiswa[]> => {
  const response = await api.get<MahasiswaResponse>('/mahasiswa-api/get');
  return response.data.data;
};