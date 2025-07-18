// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const password = localStorage.getItem("wallet_password");
  const uuid = localStorage.getItem("wallet_uuid");

  if (!password || !uuid) {
    return <Navigate to="/" replace />; // or /login
  }

  return <>{children}</>;
};

export default ProtectedRoute;
