import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo-tickitz.png";
import { useNavigate, Link } from "react-router-dom";
import ResetPwd from "./ResetPwd";
import { authContext } from "../context/auth/authContext";

function ForgotPwd() {
  const navigate = useNavigate();
  const { users } = useContext(authContext);

  const [form, setForm] = useState({ email: "" });
  const [err, setErr] = useState({ email: "" });
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  // validasi localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userLogin");
    if (userData) {
      // navigate("/");
    }
  }, [navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    const { email } = form;

    let valid = true;
    const newErr = { email: "" };

    //validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErr.email = "email tidak boleh kosong";
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErr.email = "format email tidak valid";
      valid = false;
    }
    setErr(newErr);
    if (!valid) return;

    // Ambil data user dari localStorage hasil register
    // const storedUserStr = localStorage.getItem("userLogin");
    // if (!storedUserStr) {
    //   setError("Belum ada user terdaftar, silakan daftar terlebih dahulu.");
    //   return;
    // }
    // const storedUser = JSON.parse(storedUserStr);

    // const user = storedUser.find((u) => u.email === email);

    if (!users) {
      setError("Belum ada user terdaftar, silakan daftar terlebih dahulu.");
      return;
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      setError("Email tidak ditemukan, silakan cek kembali atau daftar baru.");
      return;
    }

    if (valid) {
      setIsOpen(true);

      //   console.log(setEmailForgot);
      localStorage.setItem("targetEmail", user.email);
      //   navigate("/ticketing/content");
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
            <form
              className="mt-[20px] flex flex-col justify-center items-start"
              onSubmit={submitHandler}
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="w-[300px] h-[40px] my-[15px] bg-[#f6f7ffba] border border-gray-300 rounded-[5px] px-[20px]"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={onChangeHandler}
                />
                {err.email && <p style={{ color: "red" }}>{err.email}</p>}
              </div>

              <br />
              <button
                className="bg-[var(--color--primary)] text-white rounded-[5px] p-[15px] w-full mb-[15px] cursor-pointer"
                type="submit"
                id="submitBtn"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </main>
      </section>
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/40 flex justify-center items-center z-2"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className="relative bg-white rounded-lg p-10 md:1/3 w-1/2 h-fit text-[16px] text-[var(--colortwo)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h1 className="text-[24px] text-center text-black mb-[35px] font-bold">
                Reset Password
              </h1>

              <p className="leading-[28px] text-[var(--color--secundery)] mb-5">
                Klik link berikut untuk reset password <br />
                <Link to="/resetPwd" className="underline text-blue-700">
                  resertpwd/askjhdl =/784
                </Link>
              </p>
            </div>
            <div
              className="absolute top-5 right-5 cursor-pointer  font-700 text-[20px]"
              onClick={() => setIsOpen(false)}
            >
              X
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPwd;
