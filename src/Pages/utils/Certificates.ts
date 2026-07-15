import jsPDF from "jspdf";
import JSZip from "jszip";
import type { Certificate } from "../../types/certificate.types";
import { generateCertificate, resolveImageUrl } from "./SertificateGenerator";

function formatDateIndo(date: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDateIndo(startDate)} - ${formatDateIndo(endDate)}`;
}
// 1. Preview di tab baru
export const previewCertificate = async (
  cert: Certificate,
  templateUrl: string,
): Promise<void> => {
  const tab = window.open("", "_blank");

  const blob = await generateCertificate(
    resolveImageUrl(templateUrl),
    cert.user.full_name,
    cert.project.project_name,
    cert.certificate_no,
    formatDateRange(cert.project.start_date, cert.project.end_date),
    cert.uuid,
  );
  const url = URL.createObjectURL(blob);

  if (!tab) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.click();
    return;
  }

  tab.document.write(`
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <title>Sertifikat - ${cert.user.full_name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #1a1a1a;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            font-family: sans-serif;
          }
          p { color: #aaa; font-size: 13px; letter-spacing: 0.05em; }
          small { color: #555; font-size: 11px; font-family: monospace; }
          img {
            max-width: 90vw;
            max-height: 82vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.6);
          }
        </style>
      </head>
      <body>
        <p>${cert.user.full_name.toUpperCase()}</p>
        <small>${cert.certificate_no}</small>
        <img src="${url}" alt="Sertifikat ${cert.user.full_name}" 
          onload="URL.revokeObjectURL(this.src)" />
      </body>
    </html>
  `);
  tab.document.close();
};

// ── 2. Download PDF ───────────────────────────────────────────────────────────
export const downloadCertificatePdf = async (
  cert: Certificate,
  templateUrl: string,
): Promise<void> => {
  const fileName = `Sertifikat - ${cert.user.full_name} - ${cert.certificate_no}`;
  const blob = await generateCertificate(
    resolveImageUrl(templateUrl),
    cert.user.full_name,
    cert.project.project_name,
    cert.certificate_no,
    formatDateRange(cert.project.start_date, cert.project.end_date),
    cert.uuid,
  );

  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = dataUrl;
  });

  const orientation = img.width > img.height ? "landscape" : "portrait";
  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [img.width, img.height],
  });
  pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
  pdf.save(`${fileName}.pdf`);
};

// ── 3. Download PNG atau JPG ──────────────────────────────────────────────────
export const downloadCertificateImage = async (
  cert: Certificate,
  templateUrl: string,
  format: "png" | "jpg" = "png",
): Promise<void> => {
  const fileName = `Sertifikat - ${cert.user.full_name} - ${cert.certificate_no}`;
  const blob = await generateCertificate(
    resolveImageUrl(templateUrl),
    cert.user.full_name,
    cert.project.project_name,
    cert.certificate_no,
    formatDateRange(cert.project.start_date, cert.project.end_date),
    cert.uuid,
  );

  let finalBlob = blob;

  if (format === "jpg") {
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = dataUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    finalBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob gagal"))),
        "image/jpeg",
        0.95,
      );
    });
  }

  const url = URL.createObjectURL(finalBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
};

// ── 4. Download All ZIP ───────────────────────────────────────────────────────
export const downloadAllCertificatesZip = async (
  certificates: Certificate[],
  templateUrl: string,
  projectName: string,
  onProgress?: (done: number, total: number) => void,
): Promise<void> => {
  const zip = new JSZip();
  const total = certificates.length;

  await Promise.all(
    certificates.map(async (cert, i) => {
      const blob = await generateCertificate(
        resolveImageUrl(templateUrl),
        cert.user.full_name,
        cert.project.project_name,
        cert.certificate_no,
        formatDateRange(cert.project.start_date, cert.project.end_date),
        cert.uuid,
      );
      zip.file(`Sertifikat - ${cert.user.full_name}.png`, blob);
      onProgress?.(i + 1, total);
    }),
  );

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(zipBlob);
  a.download = `Sertifikat - ${projectName}.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
};
