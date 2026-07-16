import api from "../../lib/api";
import QRCode from "qrcode";

export function resolveImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("data:")) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const apiBaseURL = api.defaults.baseURL ?? "";
  const origin = new URL(apiBaseURL).origin;
  return `${origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal load gambar: ${src}`));
    img.src = resolveImageUrl(src);
  });
}

export async function ensureFontsLoaded(): Promise<void> {
  await Promise.all([
    document.fonts.load('105px "Great Vibes"'),
    document.fonts.load('54px "Grenze"'),
  ]);
  await document.fonts.ready;
}


const LAYOUT = {
  internName:      { x: 0.57,  y: 0.48,  size: 140, font: "Great Vibes", color: "#800000" },
  internNameSmall: { x: 0.82,  y: 0.889, size: 33,  font: "Great Vibes", color: "#800000" },
  projectName:     { x: 0.815, y: 0.598, size: 46,  font: "Grenze",      color: "#800000" },
  duration:        { x: 0.692, y: 0.645, size: 48,  font: "Grenze",      color: "#090909" },
  certNo:          { x: 0.6, y: 0.28, size: 50,  font: "Grenze",      color: "#090909" },
  certNoSmall:     { x: 0.825, y: 0.91,  size: 22,  font: "Grenze",      color: "#800000" },
  qr:              { x: 0.77,  y: 0.715, size: 0.103 },
};

export async function generateCertificate(
  templateUrl: string,
  internName: string,
  projectName: string,
  certificateNo: string,
  ProjectDuration: string,
  verifyUrl: string,
): Promise<Blob> {
  await ensureFontsLoaded();

  const img = await loadImage(templateUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const text = (
    cfg: { x: number; y: number; size: number; font: string; color: string },
    value: string,
  ) => {
    ctx.font = `400 ${cfg.size}px "${cfg.font}", serif`;
    ctx.fillStyle = cfg.color;
    ctx.fillText(value, canvas.width * cfg.x, canvas.height * cfg.y);
  };

  text(LAYOUT.internName,      internName);
  text(LAYOUT.internNameSmall, internName);
  text(LAYOUT.projectName,     projectName);
  text(LAYOUT.duration,        ProjectDuration);
  text(LAYOUT.certNo,          certificateNo);
  text(LAYOUT.certNoSmall,     certificateNo);

  // QR code — nanti akan diganti ke alamat domain
  const qrSize = Math.round(canvas.width * LAYOUT.qr.size);
  const qrDataUrl = await QRCode.toDataURL(
    `${window.location.origin}/verify-certificate/${verifyUrl}`,
    { width: qrSize, margin: 1 },
  );
  const qrImg = await loadImage(qrDataUrl);
  ctx.drawImage(qrImg, canvas.width * LAYOUT.qr.x, canvas.height * LAYOUT.qr.y, qrSize, qrSize);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob gagal"))),
      "image/png",
    );
  });
}
