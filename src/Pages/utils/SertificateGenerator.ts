import api from "../../lib/api";
import QRCode from "qrcode";

export function resolveImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("data:")) return path; // untuk QR data URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const apiBaseURL = api.defaults.baseURL ?? "";
  const origin = new URL(apiBaseURL).origin;
  return `${origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Load Image dari URL
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal load gambar: ${src}`));
    img.src = resolveImageUrl(src);
  });
}

// Load kedua font dari Google Fonts (hanya sekali)
export async function ensureFontsLoaded(): Promise<void> {
  // Trigger & tunggu font yang sudah diload via <link> di index.html
  await Promise.all([
    document.fonts.load('105px "Great Vibes"'),
    document.fonts.load('54px "Grenze"'),
  ]);
  await document.fonts.ready;
}

// Generate satu sertifikat sebagai Blob
export async function generateCertificate(
  templateUrl: string,
  internName: string,
  projectName: string,
  certificateNo: string,
  ProjectDuration: string,
  verifyUrl: string,
): Promise<Blob> {
  // Pastikan font siap sebelum menggambar teks
  await ensureFontsLoaded();

  const img = await loadImage(templateUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Nama intern — besar (Great Vibes)
  ctx.font = `105px "Great Vibes", cursive`;
  ctx.fillStyle = "#800000";
  ctx.fillText(internName, canvas.width * 0.57, canvas.height * 0.48);

  // Nama intern — versi kecil di pojok bawah
  ctx.font = `30px "Great Vibes", cursive`;
  ctx.fillStyle = "#800000";
  ctx.fillText(internName, canvas.width * 0.825, canvas.height * 0.895);

  // Nama project (Grenze)
  ctx.font = `400 54px "Grenze", serif`;
  ctx.fillStyle = "#090909";
  ctx.fillText(projectName, canvas.width * 0.57, canvas.height * 0.615);

  // Certificate no — besar (Grenze)
  ctx.font = `50px "Grenze", serif`;
  ctx.fillStyle = "#090909";
  ctx.fillText(certificateNo, canvas.width * 0.666, canvas.height * 0.305);

  // Certificate no — kecil di pojok bawah
  ctx.font = `20px "Grenze", serif`;
  ctx.fillStyle = "#800000";
  ctx.fillText(certificateNo, canvas.width * 0.825, canvas.height * 0.918);

  //Durasi Project — besar (Grenze)
  ctx.font = `400 48px "Grenze", serif`;
  ctx.fillStyle = "#090909";
  ctx.fillText(ProjectDuration, canvas.width * 0.68, canvas.height * 0.66);

  // QR code — kalau verifyUrl diisi
  const qrDataUrl = await QRCode.toDataURL('http://localhost:5173/verify-certificate/' + verifyUrl, {
    width: 200,
    margin: 1,
  });
  const qrImg = await loadImage(qrDataUrl);
  const qrSize = canvas.width * 0.103;
  ctx.drawImage(
    qrImg,
    canvas.width * 0.8 - qrSize,
    canvas.height * 0.75 - qrSize,
    qrSize,
    qrSize,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob gagal"))),
      "image/png",
    );
  });
}
