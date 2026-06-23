import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate to={user.role === "admin" ? "/accounts" : "/profile"} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
