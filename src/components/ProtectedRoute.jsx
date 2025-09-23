import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // ambil token dari redux
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    // kalau tidak ada token → redirect ke /login
    return <Navigate to="/login" replace />;
  }

  // kalau ada token → render children (halaman yang dilindungi)
  return children;
}

export default ProtectedRoute;
