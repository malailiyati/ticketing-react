import React, { useState, useEffect } from "react";
import AccountSetting from "../components/AccountSetting";
import InfoAccount from "../components/InfoAccount";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileThunk,
  updateProfileThunk,
  updatePasswordThunk,
  resetPasswordStatus,
  resetProfileStatus,
} from "../../redux/slices/authSlice";

function AccountForm() {
  const dispatch = useDispatch();
  const { user, passwordMessage, passwordError, profileMessage, profileError } =
    useSelector((state) => state.auth);
  // const [form, setForm] = useState({
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   newEmail: user.email,
  //   phone: "",
  // });
  // State untuk profile
  const [formProfile, setFormProfile] = useState({
    firstName: "",
    lastName: "",
    newEmail: "",
    phone: "",
  });

  // State untuk password
  const [formPassword, setFormPassword] = useState({
    newPassword: "",
    oldPassword: "",
  });
  const [err, setErr] = useState({ newPassword: "", confirmPassword: "" });
  // const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  // useEffect(() => {
  //   const url = "http://localhost:8080/user/profile";
  //   const request = new Request(url, {
  //     method: "GET",
  //     // headers: {
  //     //   "Authorization": "Bearer "
  //     // }
  //   });
  //   fetch(request)
  //     .then((response) => {
  //       if (!response.ok) throw response.statusText;
  //       return response.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);

  // Sync redux user ke formProfile
  useEffect(() => {
    if (user) {
      setFormProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        newEmail: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Auto clear pesan setelah 3 detik
  useEffect(() => {
    if (passwordMessage || passwordError) {
      const timer = setTimeout(() => {
        dispatch(resetPasswordStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordMessage, passwordError, dispatch]);

  useEffect(() => {
    if (profileMessage || profileError) {
      const timer = setTimeout(() => {
        dispatch(resetProfileStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [profileMessage, profileError, dispatch]);

  //  Handler profile
  const onChangeProfile = (e) => {
    const { name, value } = e.target;
    setFormProfile((prev) => ({ ...prev, [name]: value }));
  };

  const submitProfile = (e) => {
    e.preventDefault();
    dispatch(
      updateProfileThunk({
        firstName: formProfile.firstName,
        lastName: formProfile.lastName,
        email: formProfile.newEmail,
        phone: formProfile.phone,
      })
    );
    // setError("");
  };

  // Handler password
  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setFormPassword((prev) => ({ ...prev, [name]: value }));
  };

  const submitPassword = (e) => {
    e.preventDefault();

    const { newPassword, oldPassword } = formPassword;
    let valid = true;
    const newErr = { newPassword: "" };

    // validasi password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!newPassword) {
      newErr.newPassword = "Password tidak boleh kosong";
      valid = false;
    } else if (!passwordPattern.test(newPassword)) {
      newErr.newPassword =
        "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan karakter spesial";
      valid = false;
    }

    setErr(newErr);
    if (!valid) return;

    // dispatch(
    //   updateProfile({
    //     password: newPassword,
    //     oldPassword,
    //   })
    // );
    dispatch(resetPasswordStatus());
    dispatch(updatePasswordThunk({ oldPassword, newPassword }));
    // setError("");
  };
  return (
    <main className="bg-[#a0a3bd33] p-25">
      <div className="flex gap-10 flex-col md:flex-row">
        <div>
          <InfoAccount />
        </div>
        <div className="">
          <form onSubmit={submitProfile}>
            <div>
              <AccountSetting />
              <div className="bg-white rounded-[20px] mb-[50px] md:w-[700px] pt-[20px] px-[30px] pb-[40px] leading-[50px]">
                <p className="border-b border-[var(--color--secundery)]">
                  Details information
                </p>
                <div className="flex gap-5 md:gap-[40px]">
                  <div className="w-full">
                    <div>
                      <label htmlFor="firstname">First Name</label> <br />
                      <input
                        className="border border-gray-300 rounded-md w-full pl-4"
                        type="text"
                        id="firstname"
                        name="firstName"
                        value={formProfile.firstName}
                        onChange={onChangeProfile}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastname">Last Name</label> <br />
                      <input
                        className="border border-gray-300 rounded-md w-full pl-4"
                        type="text"
                        id="lastname"
                        name="lastName"
                        value={formProfile.lastName}
                        onChange={onChangeProfile}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <div>
                      <label htmlFor="email">E-mail</label> <br />
                      <input
                        className="border border-gray-300 rounded-md w-full pl-4"
                        type="text"
                        id="email"
                        name="newEmail"
                        value={formProfile.newEmail}
                        onChange={onChangeProfile}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone-number">Phone Number</label>
                      <br />
                      <div className="flex border border-gray-300 rounded-md w-full pl-4">
                        <span className="code-country">+62 |</span>
                        <input
                          type="tel"
                          id="phone-number"
                          name="phone"
                          value={formProfile.phone}
                          onChange={onChangeProfile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {profileMessage && (
                  <p style={{ color: "green" }}>{profileMessage}</p>
                )}
                {profileError && <p style={{ color: "red" }}>{profileError}</p>}
              </div>
              <button
                type="submit"
                className="py-[15px] px-[70px] [background-color:var(--color--primary)] text-white text-center rounded-[7px]"
              >
                Update changes
              </button>
            </div>
          </form>

          <form onSubmit={submitPassword}>
            <div className="bg-white rounded-[20px] my-[50px] md:w-[700px] py-[20px] px-[20px] leading-[50px]">
              <p className="border-b border-[var(--color--secundery)]">
                Account and Privacy
              </p>
              <div className="flex gap-[40px]">
                <div className="w-full">
                  <label htmlFor="confirmpwd">Old Password</label>
                  <br />
                  <input
                    className="border border-gray-300 rounded-md w-full pl-4"
                    type="password"
                    name="oldPassword"
                    id="confirmpwd"
                    placeholder="Write your old password"
                    value={formPassword.oldPassword}
                    onChange={onChangePassword}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="pwd">New Password</label>
                  <br />
                  <input
                    className="border border-gray-300 rounded-md w-full pl-4"
                    type="password"
                    name="newPassword"
                    id="pwd"
                    placeholder="Write your password"
                    value={formPassword.newPassword}
                    onChange={onChangePassword}
                  />
                </div>
              </div>
              {err.newPassword && (
                <p style={{ color: "red" }}>{err.newPassword}</p>
              )}
              {/* Pesan sukses / error dari backend */}
              {passwordMessage && (
                <p style={{ color: "green" }}>{passwordMessage}</p>
              )}
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="py-[15px] px-[70px] [background-color:var(--color--primary)] text-white text-center rounded-[7px]"
            >
              Update changes
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AccountForm;
