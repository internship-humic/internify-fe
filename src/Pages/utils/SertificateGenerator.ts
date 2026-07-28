import { resolveFileUrl } from "./resolveFileFromUrl";
import QRCode from "qrcode";

//LOAD IMAGE TEMPLATE
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal load gambar: ${src}`));
    img.src = resolveFileUrl(src);
  });
}

//LOAD FONT UNTUK MENCEGAH FONT TERGANTI
async function ensureFontsLoaded(): Promise<void> {
  await Promise.all([
    document.fonts.load('105px "Great Vibes"'),
    document.fonts.load('54px "Grenze"'),
  ]);
  await document.fonts.ready;
}

// LAYOUT DEFAULT SERTIFIKAT YANG AKAN DIGENERATE
const LAYOUT = {
  internName:      { x: 0.54,  y: 0.5,  size: 130, font: "Great Vibes", color: "#800000" },
  internNameSmall: { x: 0.82,  y: 0.889, size: 47,  font: "Great Vibes", color: "#090909" },
  projectName:     { x: 0.815, y: 0.598, size: 46,  font: "Grenze",      color: "#800000" },
  duration:        { x: 0.7, y: 0.645, size: 48,  font: "Grenze",      color: "#090909" },
  certNo:          { x: 0.56, y: 0.305, size: 50,  font: "Grenze",      color: "#090909" },
  certNoSmall:     { x: 0.827, y: 0.92,  size: 32,  font: "Grenze",      color: "#090909"},
  qr:              { x: 0.77,  y: 0.715, size: 0.103 },
};

// HELPER: kurangi ukuran font 25% jika nama melebihi 22 karakter (termasuk spasi)
function fitNameText(name: string, baseSize: number): number {
  const SAFE_LENGTH = 24;
  const REDUCTION_PER_CHAR = 0.032;
  const MIN_SCALE = 0.75;

  const length = name.length;
  if (length <= SAFE_LENGTH) return baseSize;
  const scale = Math.max(1 - (length - SAFE_LENGTH) * REDUCTION_PER_CHAR, MIN_SCALE);
  return baseSize * scale;
}

//MAIN FUNCTION: generasi sertifikat intern formatted
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
    const size = cfg === LAYOUT.internName ? fitNameText(value, cfg.size) : cfg.size;
    ctx.font = `400 ${size}px "${cfg.font}", serif`;
    ctx.fillStyle = cfg.color;
    ctx.fillText(value, canvas.width * cfg.x, canvas.height * cfg.y);
  };

  text(LAYOUT.internName,      internName);
  text(LAYOUT.internNameSmall, internName);
  text(LAYOUT.projectName,     projectName);
  text(LAYOUT.duration,        ProjectDuration);
  text(LAYOUT.certNo,          certificateNo);
  text(LAYOUT.certNoSmall,     certificateNo);

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
