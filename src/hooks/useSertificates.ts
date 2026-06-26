// hooks/useCertificates.ts
import { useState, useEffect, useCallback } from "react";
import type { Certificate, CertificateVerifyResult } from "../types/certificate.types";
import {
  claimCertificate,
  getMyCertificates,
  getAllCertificates,
  getCertificateDetail,
  getCertificatesByProject,
  verifyCertificate,
  verifyCertificateByUuid,
  uploadCertificateTemplate,
} from "../services/CertificateService";

// GET /certificate-api/my-certificates
export const useMyCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyCertificates()
      .then(setCertificates)
      .catch(() => setError("Gagal memuat sertifikat."))
      .finally(() => setLoading(false));
  }, []);

  return { certificates, loading, error };
};

// GET /certificate-api/all
export const useAllCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCertificates()
      .then(setCertificates)
      .catch(() => setError("Gagal memuat semua sertifikat."))
      .finally(() => setLoading(false));
  }, []);

  return { certificates, loading, error };
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

  useEffect(() => {
    if (!id_project) return;
    getCertificatesByProject(id_project)
      .then(setCertificates)
      .catch(() => setError("Gagal memuat sertifikat project."))
      .finally(() => setLoading(false));
  }, [id_project]);

  return { certificates, loading, error };
};

// GET /certificate-api/verify & verify-uuid (public, on-demand)
export const useVerifyCertificate = () => {
  const [result, setResult] = useState<CertificateVerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyByNo = useCallback(async (certificate_no: string) => {
    setLoading(true); setError(null);
    try {
      const res = await verifyCertificate(certificate_no);
      setResult(res);
      return res;
    } catch { setError("Sertifikat tidak valid atau tidak ditemukan."); return null; }
    finally { setLoading(false); }
  }, []);

  const verifyByUuid = useCallback(async (uuid: string) => {
    setLoading(true); setError(null);
    try {
      const res = await verifyCertificateByUuid(uuid);
      setResult(res);
      return res;
    } catch { setError("Sertifikat tidak valid atau tidak ditemukan."); return null; }
    finally { setLoading(false); }
  }, []);

  return { result, loading, error, verifyByNo, verifyByUuid };
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