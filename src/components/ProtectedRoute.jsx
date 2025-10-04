import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  // Fallback ke localStorage
  const tokenFromStorage = localStorage.getItem("token");
  const roleFromStorage = localStorage.getItem("role");

  const currentToken = token || tokenFromStorage;
  const currentRole = user?.role || roleFromStorage;

  if (!currentToken) {
    return <Navigate to="/login" replace />;
  }

  // Admin tidak boleh akses route user
  if (currentRole === "admin") {
    return <Navigate to="/ticketing/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
