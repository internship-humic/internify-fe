export const decodeJWT = <T = any>(token: string): T | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    return JSON.parse(window.atob(padded));
  } catch (error) {
    console.error("Gagal decode JWT:", error);
    return null;
  }
};