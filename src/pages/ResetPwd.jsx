import React, { useContext, useState } from "react";
import logo from "../assets/logo-tickitz.png";
import { useNavigate } from "react-router-dom";
import eyeSolid from "../assets/eye-solid-full (2).svg";
import eyeSlash from "../assets/eye-slash-regular-full.svg";
import { authContext } from "../context/auth/authContext";

function ResetPwd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [err, setErr] = useState({ newPassword: "", confirmPassword: "" });
  const emailTarget = localStorage.getItem("targetEmail");
  //   const [_, setData] = useState();
  console.log("email", emailTarget);
  const { users, setUsers } = useContext(authContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  // validasi localStorage
  //   useEffect(() => {
  //     const userData = localStorage.getItem("userLogin");
  //     if (userData) {
  //       // navigate("/");
  //     }
  //   }, [navigate]);

  const eyeHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const eyeHandlerConfirm = () => {
    setShowPwd((prev) => !prev);
  };

  const handleNewPwd = (event) => {
    event.preventDefault();

    const { newPassword, confirmPassword } = form;

    let valid = true;
    const newErr = { newPassword: "", confirmPassword: "" };

    //validasi password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!newPassword) {
      newErr.newPassword = "password tidak boleh kosong";
      valid = false;
    } else if (!passwordPattern.test(newPassword)) {
      newErr.newPassword =
        "password minimal 8 karakter,mengandung minimal 1 huruf besar, 1 huruf kecil dan 1 karakter spesial(!@#$%^&*><";
      valid = false;
    }
    setErr(newErr);

    if (confirmPassword !== newPassword) {
      setError("Password tidak cocok");
      valid = false;
    }
    if (!valid) return;

    if (valid) {
      if (!users) {
        setError("Data user tidak valid. Coba daftar ulang.");
        return;
      }
      const idx = users.findIndex((u) => u.email === emailTarget);
      if (idx === -1) {
        setError("Sesi reset kedaluwarsa atau email tidak ditemukan.");
        return;
      }
      // users[idx] = { ...users[idx], password: newPassword };

      // const newUser = { password: newPassword };
      const updatedPwd = [...users];
      updatedPwd[idx] = { ...users[idx], password: newPassword };
      localStorage.setItem("userLogin", JSON.stringify(updatedPwd));
      setUsers(updatedPwd);
      setUsers(emailTarget, newPassword);
      localStorage.removeItem("targetEmail"); // bereskan sesi
      navigate("/login");
    }
  };
  return (
    <>
      <section className="bg-overlay-img min-h-screen bg-center bg-no-repeat bg-cover text-sm">
        <header className="flex justify-center">
          <img
            className="w-[276px] h-[104px] mt-[20px] mb-[20px]"
            src={logo}
            alt="logo tickitz"
          />
        </header>
        <main className="flex justify-center items-center">
          <div className="bg-white p-[50px] rounded-[7px] w-[400px] mb-[70px]">
            <div>
              <h1 className="text-[30px] font-normal mb-[15px]">
                Reset Password
              </h1>
            </div>

            <form
              className="mt-[20px] flex flex-col justify-center items-start"
              onSubmit={handleNewPwd}
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <label htmlFor="pwd">New password</label>
                <br />
                <div className="relative w-[300px]">
                  <input
                    className="w-full h-[40px] my-[15px] bg-[#f6f7ffba] border border-gray-300 rounded-[5px] px-[20px]"
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    id="pwd"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={onChangeHandler}
                  />
                  <img
                    src={showPassword ? eyeSlash : eyeSolid}
                    width="20"
                    height="20"
                    alt="eye"
                    className="absolute right-2 top-6 cursor-pointer"
                    onClick={eyeHandler}
                  />
                  {err.newPassword && (
                    <p style={{ color: "red" }}>{err.newPassword}</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor="confirmPwd">Confirm password</label>
                <br />
                <div className="relative w-[300px]">
                  <input
                    className="w-full h-[40px] my-[15px] bg-[#f6f7ffba] border border-gray-300 rounded-[5px] px-[20px]"
                    type={showPwd ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPwd"
                    placeholder="Confirm new password"
                    value={form.confirmPassword}
                    onChange={onChangeHandler}
                  />
                  <img
                    src={showPwd ? eyeSlash : eyeSolid}
                    width="20"
                    height="20"
                    alt="eye"
                    className="absolute right-2 top-6 cursor-pointer"
                    onClick={eyeHandlerConfirm}
                  />
                </div>
              </div>

              <br />
              <button
                className="bg-[var(--color--primary)] text-white rounded-[5px] p-[15px] w-full mb-[15px] cursor-pointer"
                type="submit"
                id="submitBtn"
              >
                Reset Password
              </button>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

export default ResetPwd;
