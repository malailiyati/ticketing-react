import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import Movies from "./pages/Movies.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Payment from "./Payment.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouteLayout />}>
          <Route path="/pages/Home" element={<Home />}></Route>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/pages/Login" element={<Login />}></Route>
          <Route path="/pages/Register" element={<Register />}></Route>
          <Route path="/pages/Payment" element={<Payment />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Router;
