export interface CertificateUser {
  id: number;
  full_name: string;
  email: string;
}

export interface CertificateProject {
  id: number;
  project_name: string;
  description: string;
}

export interface Certificate {
  id: number;
  id_project: number;
  id_user: number;
  certificate_no: string;
  issued_at: string;
  uuid: string;
  user: CertificateUser;
  project: CertificateProject;
}

// Khusus GET /certificate-api/verify-uuid/{uuid}
export interface CertificateVerification {
  uuid: string;
  intern_name: string;
  project_name: string;
  created_at: string;
}

export interface CertificateTemplate {
  id_project: number;
  certificate_template: string;
}

export interface CertificateVerifyResult {
  uuid: string;
  intern_name: string;
  project_name: string;
  created_at: string;
}