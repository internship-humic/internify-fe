import api from "../../lib/api";

// src/utils/certificateGenerator.ts
export function resolveImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const apiBaseURL = api.defaults.baseURL ?? "";
  const origin = new URL(apiBaseURL).origin;
  return `${origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

// ── Load Image dari URL ────────────────────────────────────────────────────────
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal load gambar: ${src}`));
    img.src = resolveImageUrl(src);
  });
}

// ── Generate satu sertifikat sebagai Blob ─────────────────────────────────────
export async function generateCertificate(
  templateUrl: string,
  internName: string,
  projectName: string,
  uuid: string,
  barcodeUrl: string
): Promise<Blob> {
  const img = await loadImage(templateUrl);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  // Tulis nama di tengah horizontal, posisi Y dari konstanta
  ctx.font = `bold 48px Georgia, serif`;
  ctx.fillStyle = "#800000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(internName, canvas.width / 2, canvas.height * 0.55);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob gagal"))),
      "image/png"
    );
  });
}