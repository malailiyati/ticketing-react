import React, { useState } from "react";
import AccountSetting from "../components/AccountSetting";
import InfoAccount from "../components/InfoAccount";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/authSlice";

function AccountForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    newEmail: user.email,
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      newPassword,
      confirmPassword,
      newEmail,
      firstName,
      lastName,
      phone,
    } = form;
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

    dispatch(
      updateProfile({
        firstName,
        lastName,
        email: newEmail,
        password: newPassword,
        phone,
      })
    );
    setErr({ newPassword: "" });
    setError("");
  };
  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="flex gap-10 flex-col md:flex-row">
        <div>
          <InfoAccount />
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <AccountSetting />

            <div className="bg-white rounded-[20px] mb-[50px] md:w-[700px] pt-[20px] px-[30px] pb-[40px] leading-[50px]">
              <p className="border-b border-[var(--color--secundery)]">
                Details information
              </p>
              <div className="flex gap-5 md:gap-[40px]">
                <div className="w-full">
                  <div>
                    <label for="firstname">First Name</label> <br />
                    <input
                      className="border border-gray-300 rounded-md w-full pl-4"
                      type="text"
                      id="firstname"
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                    />
                  </div>

                  <div>
                    <label for="lastname">Last Name</label> <br />
                    <input
                      className="border border-gray-300 rounded-md w-full pl-4"
                      type="text"
                      id="lastname"
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div>
                    <label for="email">E-mail</label> <br />
                    <input
                      className="border border-gray-300 rounded-md w-full pl-4"
                      type="text"
                      id="email"
                      name="newEmail"
                      value={form.newEmail}
                      onChange={onChange}
                    />
                  </div>

                  <div>
                    <label for="phone-number">Phone Number</label>
                    <br />
                    <div className="flex border border-gray-300 rounded-md w-full pl-4">
                      <span className="code-country">+62 |</span>
                      <input
                        type="tel"
                        id="phone-number"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] mb-[50px] md:w-[700px] py-[20px] px-[20px] leading-[50px]">
              <p className="border-b border-[var(--color--secundery)]">
                Account and Privacy
              </p>
              <div className="flex gap-[40px]">
                <div className="w-full">
                  <label for="pwd">Password</label>
                  <br />
                  <input
                    className="border border-gray-300 rounded-md w-full pl-4"
                    type="password"
                    name="newPassword"
                    id="pwd"
                    placeholder="Write your password"
                    value={form.newPassword}
                    onChange={onChange}
                  />
                </div>

                <div className="w-full">
                  <label for="confirmpwd">Password</label>
                  <br />
                  <input
                    className="border border-gray-300 rounded-md w-full pl-4"
                    type="password"
                    name="confirmPassword"
                    id="confirmpwd"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={onChange}
                  />
                </div>
              </div>
              {err.newPassword && (
                <p style={{ color: "red" }}>{err.newPassword}</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <button
              type="submit"
              className="py-[15px] px-[70px] [background-color:var(--color--primary)] text-white text-center rounded-[7px]"
            >
              Update changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AccountForm;
