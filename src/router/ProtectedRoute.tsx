import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthContext } from "../context/AuthProvider.tsx";

interface ProtectedRouteProps {
  element: ReactNode;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { element } = props;
  const { isLoggedIn, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};
