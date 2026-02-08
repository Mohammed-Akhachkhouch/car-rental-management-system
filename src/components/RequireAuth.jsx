import { Navigate, useLocation } from "react-router-dom";
import { getAuth, isLoggedIn } from "../store/authStore";

export default function RequireAuth({
  children,
  allowedRole,
  redirectTo = "/login",
}) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRole) {
    const { user } = getAuth();
    if (!user || user.role !== allowedRole) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children;
}
