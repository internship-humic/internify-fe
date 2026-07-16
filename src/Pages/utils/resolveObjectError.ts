// Ubah message backend (string ATAU object field-errors) jadi satu string aman
export function resolveErrorMessage(message: unknown, fallback = "Silakan coba lagi."): string {
  if (typeof message === "string") return message;
  if (message && typeof message === "object") {
    // ambil semua value error, gabung: { end_date: "...", start_date: "..." } -> "... \n ..."
    return Object.values(message as Record<string, unknown>)
      .flat()
      .filter((v): v is string => typeof v === "string")
      .join(" ") || fallback;
  }
  return fallback;
}