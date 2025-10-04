import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  // Fallback ke localStorage kalau Redux belum load
  const tokenFromStorage = localStorage.getItem("token");
  const roleFromStorage = localStorage.getItem("role");

  const currentToken = token || tokenFromStorage;
  const currentRole = user?.role || roleFromStorage;

  if (!currentToken) {
    return <Navigate to="/login" replace />;
  }

  if (currentRole !== "admin") {
    return <Navigate to="/ticketing/content" replace />;
  }

  return children;
}

export default AdminRoute;
