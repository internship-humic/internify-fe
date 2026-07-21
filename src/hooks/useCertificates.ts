// hooks/useCertificates.ts
import { useState, useEffect, useCallback } from "react";
import type { Certificate, CertificateVerifyResult } from "../types/certificate.types";
import {
  claimCertificate,
  getMyCertificates,
  getAllCertificates,
  getCertificateDetail,
  getCertificatesByProject,
  uploadCertificateTemplate,
  generateCertificate,
  verifyCertificateByUuid
} from "../services/CertificateService";

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

// POST /certificate-api/claim
export const useClaimCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const claim = async (id_project: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await claimCertificate(id_project);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal claim sertifikat.";
      setError(msg);
      return { success: false as const, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { claim, loading, error };
};

export const useGenerateCertificates = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const generate = async (id_project: number, id_users: number[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { data, message } = await generateCertificate(id_project, id_users);
      setSuccess(true);
      return { data, message };
    } catch (err: any) {
      const message = err?.response?.data?.message ?? "Gagal generate sertifikat.";
      setError(message);
      return { message };
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
    setLoading(true);
    setError(null);
    try {
      const { data, message } = await uploadCertificateTemplate(id_project, file);
      return { success: true as const, data, message };
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Gagal upload template.";
      setError(msg);
      return { success: false as const, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading, error };
};

export const useCertificateVerification = (uuid: string) => {
  const [verification, setVerification] = useState<CertificateVerifyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;
    verifyCertificateByUuid(uuid)
      .then(setVerification)
      .catch(() => setError("Gagal memverifikasi sertifikat."))
      .finally(() => setLoading(false));
  }, [uuid]);

  return { verification, loading, error };
}

