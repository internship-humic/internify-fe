import { Outlet, Navigate } from "react-router-dom";
import { decodeJWT } from "../utils/decodeJWT";

interface PrivateRouteProps {
  allowedRoles?: ("intern" | "admin" | "mentor")[];
}

const ProtectedRoutes = ({ allowedRoles }: PrivateRouteProps) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return <Navigate to="/login-internify" replace />;
  }

  const decoded = decodeJWT(token);
  const userRole = decoded?.role as "intern" | "admin" | "mentor" | undefined;

  if (!userRole) {
    return <Navigate to="/login-internify" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === "admin" || userRole === "mentor") return <Navigate to="/mentor" replace />;
    if (userRole === "intern") return <Navigate to="/internship" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;