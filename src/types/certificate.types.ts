// types/certificate.types.ts

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
  user: CertificateUser;
  project: CertificateProject;
}

export interface CertificateVerifyResult {
  uuid: string;
  intern_name: string;
  project_name: string;
  created_at: string;
}

export interface CertificateTemplate {
  id_project: number;
  certificate_template: string;
}

// Notification
export interface Notification {
  id: number;
  id_user: number;
  id_admin: number | null;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}