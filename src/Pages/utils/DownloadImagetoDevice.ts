// utils/certificateDownload.ts
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Helper: capture sebuah HTMLElement menjadi canvas
 */
export const captureCertificateElement = async (
  element: HTMLElement
): Promise<HTMLCanvasElement> => {
  return html2canvas(element, {
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    scale: 2, // hasil lebih tajam
  });
};

/**
 * Download elemen sertifikat sebagai PNG/JPG
 */
export const downloadCertificateAsImage = async (
  element: HTMLElement | null,
  fileName: string,
  format: "png" | "jpg" = "png",
  fallbackImageUrl?: string
): Promise<void> => {
  try {
    if (!element) throw new Error("Elemen sertifikat tidak ditemukan");

    const canvas = await captureCertificateElement(element);

    const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
    const quality = format === "jpg" ? 0.95 : 1;
    const dataUrl = canvas.toDataURL(mimeType, quality);

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${fileName}.${format}`;
    a.click();
  } catch (error) {
    console.error("Gagal mengunduh sertifikat sebagai gambar:", error);

    // fallback: download langsung dari image_path kalau html2canvas gagal (mis. CORS)
    if (fallbackImageUrl) {
      const a = document.createElement("a");
      a.href = fallbackImageUrl;
      a.download = `${fileName}.png`;
      a.target = "_blank";
      a.click();
    }
  }
};

/**
 * Download elemen sertifikat sebagai PDF
 */
export const downloadCertificateAsPdf = async (
  element: HTMLElement | null,
  fileName: string
): Promise<void> => {
  try {
    if (!element) throw new Error("Elemen sertifikat tidak ditemukan");

    const canvas = await captureCertificateElement(element);
    const imgData = canvas.toDataURL("image/png", 1.0);

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Tentukan orientasi PDF berdasarkan rasio gambar
    const orientation = imgWidth > imgHeight ? "landscape" : "portrait";

    const pdf = new jsPDF({
      orientation,
      unit: "px",
      format: [imgWidth, imgHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Gagal mengunduh sertifikat sebagai PDF:", error);
  }
};