import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";

import Movies from "./pages/Movies.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Payment from "./pages/Payment.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Footer from "./components/Footer.jsx";
import Subscribe from "./components/Subscribe.jsx";
import TicketResult from "./pages/TicketResult.jsx";
import AccountForm from "./pages/AccountForm.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import Admin from "./pages/Admin.jsx";
import ForgotPwd from "./pages/ForgotPwd.jsx";
import ResetPwd from "./pages/ResetPwd.jsx";
import MovieAdmin from "./pages/MovieAdmin.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route index element={<Navigate to="/ticketing/content" replace />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpwd" element={<ForgotPwd />} />
          <Route path="resetPwd" element={<ResetPwd />} />
          <Route path="ticketing" element={<RouteLayout />}>
            <Route path="content" element={<Home />} />
            <Route path="movies">
              <Route index element={<Movies />} />
              <Route path=":movieId" element={<MovieDetail />} />
              <Route
                path=":movieId/order"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="ticket"
                element={
                  <ProtectedRoute>
                    <TicketResult />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="accountSetting"
              element={
                <ProtectedRoute>
                  <AccountForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="orderHistory"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="movieAdmin"
              element={
                <AdminRoute>
                  <MovieAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="addMovie"
              element={
                <AdminRoute>
                  <AddMovie />
                </AdminRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteLayout() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);
  const showSubscribe = ["/movies/content", "/movies/movies"].includes(
    location.pathname
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {showSubscribe && <Subscribe />}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default Router;
