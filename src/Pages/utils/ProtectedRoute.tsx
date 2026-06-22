import { Outlet, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles?: ("admin" | "intern" | "mentor")[];
}

// Helper function untuk decode payload JWT tanpa library external
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Ambil bagian payload (segmen kedua)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const ProtectedRoutes = ({ allowedRoles }: PrivateRouteProps) => {
  // 1. Ambil token dari cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  // Jika tidak punya token, tendang ke login admin awal
  if (!token) {
    return <Navigate to="/login-admin" replace />;
  }

  // 2. Decode token untuk mendapatkan role asli dari Backend
  const decoded = decodeJWT(token);
  const userRole = decoded?.role as "admin" | "intern" | "mentor" | undefined;

  // Jika token corrupt atau tidak bisa di-decode, hanguskan dan tendang ke login
  if (!userRole) {
    return <Navigate to="/login-admin" replace />;
  }

  // 3. Periksa hak akses role terhadap halaman yang dituju
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Jika role tidak diizinkan, kembalikan ke base dashboard masing-masing role
    if (userRole === "admin") return <Navigate to="/dashboard" replace />;
    if (userRole === "mentor") return <Navigate to="/mentor" replace />;
    if (userRole === "intern") return <Navigate to="/intern" replace />;
  }

  // Jika lolos seleksi, render komponen di dalamnya
  return <Outlet />;
};

export default ProtectedRoutes;