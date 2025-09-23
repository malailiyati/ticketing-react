import React, { useContext, useState } from "react";
import logo from "../assets/logo-tickitz.png";
import "../styles/index.css";
import { Link, useNavigate } from "react-router";
import eyeSolid from "../assets/eye-solid-full (2).svg";
import eyeSlash from "../assets/eye-slash-regular-full.svg";
import { authContext } from "../context/auth/authContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(authContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const eyeHandler = () => setShowPassword((prev) => !prev);

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = form;

    let valid = true;
    const newErr = { email: "", password: "" };

    // validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErr.email = "Email tidak boleh kosong";
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErr.email = "Format email tidak valid";
      valid = false;
    }

    // validasi password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!password) {
      newErr.password = "Password tidak boleh kosong";
      valid = false;
    } else if (!passwordPattern.test(password)) {
      newErr.password =
        "Password minimal 8 karakter, 1 huruf besar, 1 huruf kecil, 1 karakter spesial";
      valid = false;
    }

    setErr(newErr);
    if (!valid) return;

    // panggil context register
    const res = await register(email, password);
    if (!res.success) {
      setError(res.message);
      return;
    }

    navigate("/login");
  };

  return (
    <>
      <section className="bg-overlay-img min-h-screen bg-center bg-no-repeat bg-cover text-sm">
        <header className="flex justify-center">
          <img
            className="-w[276px] h-[104px] mt-[20px] mb-[20px]"
            src={logo}
            alt="logo tickitz"
          />
        </header>
        <main className="flex justify-center items-center">
          <div className="bg-white p-[15px] rounded-[7px] w-[400px] p-[50px] mb-20">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="flex flex-col">
                <div className="flex justify-center items-center bg-[var(--color--primary)] text-white w-[40px] h-[40px] rounded-full">
                  1
                </div>
                <div className="text-[12px] mt-[4px]">Fill Form</div>
              </div>

              <div className="flex items-center gap-[3px]">
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[14px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-center items-center bg-[var(--color--secundery)] text-white w-[40px] h-[40px] rounded-full">
                  2
                </div>
                <div className="text-[12px] mt-[4px] text-[var(--color--secundery)]">
                  Activete
                </div>
              </div>

              <div className="flex items-center gap-[3px]">
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[14px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[10px]"></div>
                <div className="h-px bg-[var(--color--secundery)] rounded-px w-[6px]"></div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-center items-center bg-[var(--color--secundery)] text-white w-[40px] h-[40px] rounded-full">
                  3
                </div>
                <div className="text-[12px] mt-[4px] text-[var(--color--secundery)]">
                  Done
                </div>
              </div>
            </div>

            <form
              className="flex flex-col justify-center items-start mt-[20px]"
              onSubmit={submitHandler}
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="inputEmail">
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
              <div>
                <label htmlFor="pwd">Password</label>
                <br />
                <div className="relative w-[300px]">
                  <input
                    className="w-full h-[40px] my-[15px] bg-[#f6f7ffba] border border-gray-300 rounded-[5px] px-[20px]"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="pwd"
                    placeholder="Enter your password"
                    value={form.password}
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
                  {err.password && (
                    <p style={{ color: "red" }}>{err.password}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center text-[#1f1f20ba] gap-[6px] my-[5px]">
                <input
                  className="w-[16px] h-[16px] cursor-pointer"
                  type="checkbox"
                  name="agree"
                  id="agree"
                />
                <label htmlFor="agree">I agree to terms & conditions</label>
              </div>

              <br />
              <button
                type="submit"
                className="bg-[var(--color--primary)] text-white w-full rounded py-3 cursor-pointer"
              >
                Submit
              </button>
            </form>
            <div className="text-[#1f1f20ba] text-center">
              <span>Already have an account?</span>
              <Link className="text-[var(--color--primary)]" to="/login">
                Sig In
              </Link>
            </div>
            <div className="flex items-center gap-[20px] h-px text[var(--color--primary)] my-[15px]">
              <div className="h-px bg-[var(--color--secundery)] rounded-px w-full"></div>
              <p>or</p>
              <div className="h-px bg-[var(--color--secundery)] rounded-px w-full"></div>
            </div>
            <a href="ticketing/content"></a>
            <div className="flex flex-row justify-center gap-[20px]">
              <div className="flex flex-row justify-center items-center p-[13px] w-1/2 rounded-[3px] gap[10px] text-[var(--color-secundery)] shadow-[1px_2px_2px_2px_rgba(0,0,0,0.1)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M3.15332 7.3455L6.43882 9.755C7.32782 7.554 9.48082 6 12.0003 6C13.5298 6 14.9213 6.577 15.9808 7.5195L18.8093 4.691C17.0233 3.0265 14.6343 2 12.0003 2C8.15932 2 4.82832 4.1685 3.15332 7.3455Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M12.0002 22.0003C14.5832 22.0003 16.9302 21.0118 18.7047 19.4043L15.6097 16.7853C14.5719 17.5745 13.3039 18.0014 12.0002 18.0003C9.39916 18.0003 7.19066 16.3418 6.35866 14.0273L3.09766 16.5398C4.75266 19.7783 8.11366 22.0003 12.0002 22.0003Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                    fill="#1976D2"
                  />
                </svg>

                <p>Google</p>
              </div>
              <div className="flex flex-row justify-center items-center p-[13px] w-1/2 rounded-[3px] gap[10px] text-[var(--color-secundery)] shadow-[1px_2px_1px_2px_rgba(0,0,0,0.1)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.001 2.00195C6.47895 2.00195 2.00195 6.47895 2.00195 12.001C2.00195 16.991 5.65795 21.127 10.439 21.88V14.892H7.89895V12.001H10.439V9.79795C10.439 7.28995 11.932 5.90695 14.215 5.90695C15.309 5.90695 16.455 6.10195 16.455 6.10195V8.56095H15.191C13.951 8.56095 13.563 9.33295 13.563 10.124V11.999H16.334L15.891 14.89H13.563V21.878C18.344 21.129 22 16.992 22 12.001C22 6.47895 17.523 2.00195 12.001 2.00195Z"
                    fill="#395185"
                  />
                </svg>
                <p>Facebook</p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Register;
