// src/utils/certificateGenerator.ts

// ── Konstanta posisi nama di template ─────────────────────────────────────────
const NAME_Y_RATIO = 0.55;       // posisi Y = 55% dari tinggi canvas
const NAME_FONT_SIZE = 48;       // px
const NAME_FONT_FAMILY = "Georgia, serif";
const NAME_COLOR = "#1a1a1a";

// ── Load Image dari URL ────────────────────────────────────────────────────────
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // penting untuk URL eksternal (Supabase, dll)
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal load gambar: ${src}`));
    img.src = src;
  });
}

// ── Generate satu sertifikat sebagai Blob ─────────────────────────────────────
export async function generateCertificate(
  templateUrl: string,
  internName: string
): Promise<Blob> {
  const img = await loadImage(templateUrl);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  // Tulis nama di tengah horizontal, posisi Y dari konstanta
  ctx.font = `bold ${NAME_FONT_SIZE}px ${NAME_FONT_FAMILY}`;
  ctx.fillStyle = NAME_COLOR;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(internName, canvas.width / 2, canvas.height * NAME_Y_RATIO);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob gagal"))),
      "image/png"
    );
  });
}