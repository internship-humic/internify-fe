import { Outlet, Navigate } from "react-router-dom";
import { decodeJWT } from "./decodeJWT";

type Role = "intern" | "admin" | "mentor";
interface RouteProps {
  allowedRoles?: Role[];
}

interface JwtPayload {
  id: string;
  email: string;
  role: "intern" | "mentor" | "admin";
  signature?: string | null;
  iat: number;
  exp: number;
}

const ProtectedRoutes = ({ allowedRoles }: RouteProps) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login-internify" replace />;
  }

  const decoded = decodeJWT<JwtPayload>(token);
  const userRole = decoded?.role as Role | undefined;

  if (!userRole) {
    sessionStorage.removeItem("token");
    return <Navigate to="/login-internify" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <Navigate
        to={userRole === "intern" ? "/intern" : "/mentor"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;