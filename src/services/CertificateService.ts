// services/CertificateService.ts
import api from "../lib/api";
import type {
  Certificate,
  CertificateVerifyResult,
  CertificateTemplate,
} from "../types/certificate.types";

// POST /certificate-api/claim
export const claimCertificate = async (id_project: number): Promise<Certificate> => {
  const res = await api.post("/certificate-api/claim", { id_project });
  return res.data.data;
};

// GET /certificate-api/my-certificates
export const getMyCertificates = async (): Promise<Certificate[]> => {
  const res = await api.get("/certificate-api/my-certificates");
  return res.data.data;
};

// GET /certificate-api/all (admin only)
export const getAllCertificates = async (): Promise<Certificate[]> => {
  const res = await api.get("/certificate-api/all");
  return res.data.data;
};

// GET /certificate-api/detail/{id}
export const getCertificateDetail = async (id: number): Promise<Certificate> => {
  const res = await api.get(`/certificate-api/detail/${id}`);
  return res.data.data;
};

// GET /certificate-api/project/{id_project} (admin only)
export const getCertificatesByProject = async (id_project: number): Promise<Certificate[]> => {
  const res = await api.get(`/certificate-api/project/${id_project}`);
  return res.data.data;
};

// GET /certificate-api/verify-uuid/{uuid} (public)
export const verifyCertificateByUuid = async (uuid: string): Promise<CertificateVerifyResult> => {
  const res = await api.get(`/certificate-api/verify-uuid/${uuid}`);
  return res.data.data;
};

// POST /certificate-api/projects/{id_project}/template
export const uploadCertificateTemplate = async (
  id_project: number,
  file: File
): Promise<CertificateTemplate> => {
  const formData = new FormData();
  formData.append("template", file);
  const res = await api.post(`/certificate-api/projects/${id_project}/template`, formData);
  return res.data.data;
};