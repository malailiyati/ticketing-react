import React, { useState } from "react";
import logo from "../assets/logo-tickitz.png";
import "../styles/Register.css";

function Register() {
  const [err, setErr] = useState({ email: "", password: "" });
  function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let valid = true;
    const newErr = { email: "", password: "" };

    //validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErr.email = "email tidak boleh kosong";
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErr.email = "format email tidak valid";
      valid = false;
    }

    //validasi password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!password) {
      newErr.password = "password tidak boleh kosong";
      valid = false;
    } else if (!passwordPattern.test(password)) {
      newErr.password =
        "password minimal 8 karakter,mengandung minimal 1 huruf besar, 1 huruf kecil dan 1 karakter spesial(!@#$%^&*><";
      valid = false;
    }

    setErr(newErr);

    if (!valid) return;
    const inputData = {
      email,
      password,
    };

    localStorage.setItem("userLogin", JSON.stringify(inputData));

    form.reset();
  }
  return (
    <>
      <body>
        <header>
          <img src={logo} alt="logo tickitz" />
        </header>
        <main>
          <div>
            <div className="progress">
              <div className="step-progress">
                <div className="step active">1</div>
                <div className="label on">Fill Form</div>
              </div>

              <div className="connector">
                <div className="small strip"></div>
                <div className="medium strip"></div>
                <div className="large strip"></div>
                <div className="medium strip"></div>
                <div className="small strip"></div>
              </div>

              <div className="step-progress">
                <div className="step">2</div>
                <div className="label">Activete</div>
              </div>

              <div className="connector">
                <div className="small strip"></div>
                <div className="medium strip"></div>
                <div className="large strip"></div>
                <div className="medium strip"></div>
                <div className="small strip"></div>
              </div>

              <div className="step-progress">
                <div className="step">3</div>
                <div className="label">Done</div>
              </div>
            </div>

            <form onSubmit={submitHandler}>
              <div className="inputEmail">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                {err.email && <p style={{ color: "red" }}>{err.email}</p>}
              </div>
              <div className="pass">
                <label htmlFor="pwd">Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="pwd"
                  placeholder="Enter your password"
                />
                {err.password && <p style={{ color: "red" }}>{err.password}</p>}
              </div>
              <div className="checkbox-line">
                <input type="checkbox" name="agree" id="agree" />
                <label htmlFor="agree">I agree to terms & conditions</label>
              </div>

              <br />
              <button type="submit" id="submitBtn">
                Login
              </button>
            </form>
            <div className="question">
              <span>Already have an account?</span>
              <a href="../signIn/sigIn.html">Sig In</a>
            </div>
            <div className="connect">
              <div className="normal strip"></div>
              <p>or</p>
              <div className="normal strip"></div>
            </div>
            <a href=""></a>
            <div className="social-login">
              <div className="social-option">
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
              <div className="social-option">
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
      </body>
    </>
  );
}

export default Register;
