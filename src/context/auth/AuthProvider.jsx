import { useState } from "react";
import { authContext as AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {
  // const dispatch = useDispatch();

  // simpan daftar user & user yang lagi aktif
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("userLogin")) || []
  );

  // fungsi register
  const register = (email, password) => {
    // cek sudah ada user belum
    const isExist = users.find((user) => user.email === email);
    if (isExist) {
      return { success: false, message: "Email sudah terdaftar" };
    }

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    // simpan ke localStorage
    localStorage.setItem("userLogin", JSON.stringify(updatedUsers));
    // localStorage.setItem("currentUser", JSON.stringify(newUser));

    // simpan ke context
    setUsers(updatedUsers);

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ users, register, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
