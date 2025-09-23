import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    // belum login → tendang ke login
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    // sudah login tapi bukan admin → tendang ke halaman utama
    return <Navigate to="/ticketing/content" replace />;
  }

  // kalau admin → render children
  return children;
}

export default AdminRoute;
