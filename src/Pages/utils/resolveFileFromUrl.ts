import {API_BASE_URL} from "../../lib/api";


export function resolveFileUrl(path?: string | null): string {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}