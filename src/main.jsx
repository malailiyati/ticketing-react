import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/index.css";
// import App from "./components/App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Movies from "./components/Movies.jsx";

// eslint-disable-next-line react-refresh/only-export-components
function Home() {
  const [page, setPage] = useState("login");
  function changeHandler(event) {
    setPage(event.target.value);
  }
  return (
    <StrictMode>
      <select name="page" value={page} onChange={changeHandler}>
        <option value="login">Login</option>
        <option value="register">Register</option>
        <option value="movies">Movies</option>
      </select>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "movies" && <Movies />}
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Home />);
