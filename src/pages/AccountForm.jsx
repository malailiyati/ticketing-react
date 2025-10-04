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
import eyeSolid from "../assets/eye-solid-full (2).svg";
import eyeSlash from "../assets/eye-slash-regular-full.svg";

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
    confirmPassword: "",
  });
  const [err, setErr] = useState({ newPassword: "", confirmPassword: "" });
  // state buat toggle password
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const toggleShow = (field) => {
    if (field === "old") setShowOldPwd((prev) => !prev);
    if (field === "new") setShowNewPwd((prev) => !prev);
    if (field === "confirm") setShowConfirmPwd((prev) => !prev);
  };

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

    const { newPassword, oldPassword, confirmPassword } = formPassword;
    let valid = true;
    const newErr = { newPassword: "", confirmPassword: "" };

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

    if (confirmPassword !== newPassword) {
      newErr.confirmPassword =
        "Konfirmasi password tidak sama dengan password baru";
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
                        className="border border-gray-300 rounded-md w-full pl-4 bg-gray-100"
                        type="text"
                        id="email"
                        name="newEmail"
                        value={formProfile.newEmail}
                        onChange={onChangeProfile}
                        disabled
                      />
                    </div>

                    <div>
                      <label htmlFor="phone-number">Phone Number</label>
                      <br />
                      <div className="flex border border-gray-300 rounded-md w-full pl-4">
                        <span className="code-country">+62 | </span>
                        <input
                          type="tel"
                          id="phone-number"
                          name="phone"
                          value={formProfile.phone}
                          onChange={onChangeProfile}
                          className="pl-2"
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

              {/* Old Password */}
              <div className="w-full relative mb-4">
                <label htmlFor="oldpwd">Old Password</label>
                <input
                  className="border border-gray-300 rounded-md w-full pl-4 pr-10"
                  type={showOldPwd ? "text" : "password"}
                  name="oldPassword"
                  id="oldpwd"
                  placeholder="Write your old password"
                  value={formPassword.oldPassword}
                  onChange={onChangePassword}
                />
                <img
                  src={showOldPwd ? eyeSolid : eyeSlash}
                  alt="toggle"
                  className="absolute right-5 top-16 cursor-pointer w-5"
                  onClick={() => toggleShow("old")}
                />
              </div>

              {/* New Password */}
              <div className="w-full relative mb-4">
                <label htmlFor="newpwd">New Password</label>
                <input
                  className="border border-gray-300 rounded-md w-full pl-4 pr-10"
                  type={showNewPwd ? "text" : "password"}
                  name="newPassword"
                  id="newpwd"
                  placeholder="Write your new password"
                  value={formPassword.newPassword}
                  onChange={onChangePassword}
                />
                <img
                  src={showNewPwd ? eyeSolid : eyeSlash}
                  alt="toggle"
                  className="absolute right-5 top-16 cursor-pointer w-5"
                  onClick={() => toggleShow("new")}
                />
                {err.newPassword && (
                  <p className="text-red-500">{err.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full relative mb-4">
                <label htmlFor="confirmpwd">Confirm Password</label>
                <input
                  className="border border-gray-300 rounded-md w-full pl-4 pr-10"
                  type={showConfirmPwd ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmpwd"
                  placeholder="Confirm your new password"
                  value={formPassword.confirmPassword}
                  onChange={onChangePassword}
                />
                <img
                  src={showConfirmPwd ? eyeSolid : eyeSlash}
                  alt="toggle"
                  className="absolute right-5 top-16 cursor-pointer w-5"
                  onClick={() => toggleShow("confirm")}
                />
                {err.confirmPassword && (
                  <p className="text-red-500">{err.confirmPassword}</p>
                )}
              </div>

              {/* Pesan sukses / error dari backend */}
              {passwordMessage && (
                <p className="text-green-500">{passwordMessage}</p>
              )}
              {passwordError && <p className="text-red-500">{passwordError}</p>}
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
