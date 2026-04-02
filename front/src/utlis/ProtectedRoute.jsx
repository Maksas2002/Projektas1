import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Navigate } from "react-router";

// Pridedame 'requiredRole' parametrą
function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if (requiredRole && user.role !== requiredRole) {  // ar adminas turi būti atjungtas po puslapio perkrovimo?
  //   return <Navigate to="/" replace />;
  // }

  // Jei viskas gerai, rodome turinį
  return children;
}

export default ProtectedRoute;