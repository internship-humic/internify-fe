// hooks/useCertificates.ts
import { useState, useEffect, useCallback } from "react";
import type { Certificate, CertificateVerifyResult } from "../types/certificate.types";
import {
  claimCertificate,
  getMyCertificates,
  getAllCertificates,
  getCertificateDetail,
  getCertificatesByProject,
  verifyCertificateByUuid,
  uploadCertificateTemplate,
  generateCertificate
} from "../services/CertificateService";
import { AxiosError } from "axios";

// GET /certificate-api/my-certificates
export const useMyCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getMyCertificates()
      .then(setCertificates)
      .catch(() => setError("Gagal memuat sertifikat."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { certificates, loading, error, refetch };
};
// GET /certificate-api/all
export const useAllCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    getAllCertificates()
      .then(setCertificates)
      .catch(() => setError("Gagal memuat semua sertifikat."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  return { certificates, loading, error, refetch };
};

// GET /certificate-api/detail/{id}
export const useCertificateDetail = (id: number) => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getCertificateDetail(id)
      .then(setCertificate)
      .catch(() => setError("Gagal memuat detail sertifikat."))
      .finally(() => setLoading(false));
  }, [id]);

  return { certificate, loading, error };
};

// GET /certificate-api/project/{id_project}
export const useProjectCertificates = (id_project: number) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    if (!id_project) return;
    setLoading(true);
    getCertificatesByProject(id_project)
      .then(setCertificates)
      .catch(() => setError("Gagal memuat sertifikat project."))
      .finally(() => setLoading(false));
  }, [id_project]);

  useEffect(() => { refetch(); }, [refetch]);

  return { certificates, loading, error, refetch };
};

// GET /certificate-api/verify & verify-uuid (public, on-demand)
export const useVerifyCertificate = () => {
  const [result, setResult] = useState<CertificateVerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyByUuid = useCallback(async (uuid: string) => {
    setLoading(true); setError(null);
    try {
      const res = await verifyCertificateByUuid(uuid);
      setResult(res);
      return res;
    } catch { setError("Sertifikat tidak valid atau tidak ditemukan."); return null; }
    finally { setLoading(false); }
  }, []);

  return { result, loading, error, verifyByUuid };
};

// POST /certificate-api/claim
export const useClaimCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const claim = async (id_project: number) => {
    setLoading(true); setError(null);
    try { return await claimCertificate(id_project); }
    catch { setError("Gagal claim sertifikat."); return null; }
    finally { setLoading(false); }
  };

  return { claim, loading, error };
};

export const useGenerateCertificates = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const generate = async (id_project: number, id_users: number[]): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await generateCertificate(id_project, id_users);
      setSuccess(true);
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 400:
            setError("Ada intern yang tidak eligible atau parameter tidak lengkap.");
            break;
          case 403:
            setError("Hanya mentor/admin project ini yang bisa generate sertifikat.");
            break;
          case 409:
            setError("Sertifikat sudah pernah di-generate untuk satu atau lebih intern.");
            break;
          default:
            setError("Gagal generate sertifikat.");
        }
      } else {
        setError("Gagal generate sertifikat.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { generate, loading, error, success, reset };
};

// POST /certificate-api/projects/{id_project}/template
export const useUploadCertificateTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (id_project: number, file: File) => {
    setLoading(true); setError(null);
    try { return await uploadCertificateTemplate(id_project, file); }
    catch { setError("Gagal upload template."); return null; }
    finally { setLoading(false); }
  };

  return { upload, loading, error };
};