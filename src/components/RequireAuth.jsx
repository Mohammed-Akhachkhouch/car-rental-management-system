import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../store/authStore";

export default function RequireAuth({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return children;
}
