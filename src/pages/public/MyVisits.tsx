import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export function MyVisits() {
  const { user } = useAuth();
  if (!user) return null;
  return <Navigate to={`/patients/history/${user.id}`} replace />;
}
