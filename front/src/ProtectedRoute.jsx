import { UserContext } from "./utlis/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; 

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;