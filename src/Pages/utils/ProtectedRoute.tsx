import { Outlet, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles?: ("intern" | "admin")[];
}

const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
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
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return <Navigate to="/login-internify" replace />;
  }

  const decoded = decodeJWT(token);
  const userRole = decoded?.role as"intern" | "admin" | undefined;

  if (!userRole) {
    return <Navigate to="/login-internify" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Jika role tidak diizinkan, kembalikan ke base dashboard masing-masing role
    if (userRole === "admin") return <Navigate to="/mentor" replace />;
    if (userRole === "intern") return <Navigate to="/intern" replace />;
  }

  // Jika lolos seleksi, render komponen di dalamnya
  return <Outlet />;
};

export default ProtectedRoutes;