import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
  passwordMessage: null,
  passwordError: null,
  profileMessage: null,
  profileError: null,
};

// Update Profile
export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      let body;
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      if (payload instanceof FormData) {
        // Kalau payload sudah FormData (misalnya update foto)
        body = payload;
      } else {
        // Kalau payload object biasa (update nama, email, dll)
        body = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            body.append(key, value);
          }
        });
      }

      const res = await fetch(`${import.meta.env.VITE_BE_HOST}/user/profile`, {
        method: "PATCH",
        headers, // jangan set Content-Type manual, biar browser isi boundary
        body,
      });

      if (!res.ok) throw new Error("Gagal update profile");
      const data = await res.json();

      const u = data.data;
      return {
        id: u.user_id,
        email: u.email,
        role: u.role,
        firstName: u.first_name,
        lastName: u.last_name,
        phone: u.phone,
        profilePicture: u.profile_picture,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get Profile
export const getProfileThunk = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BE_HOST}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Gagal ambil profile");
      }

      const data = await res.json();

      const u = data.data;
      return {
        id: u.user_id,
        email: u.email,
        role: u.role,
        firstName: u.first_name,
        lastName: u.last_name,
        phone: u.phone,
        profilePicture: u.profile_picture,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update Password
export const updatePasswordThunk = createAsyncThunk(
  "auth/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BE_HOST}/user/password`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!res.ok) throw new Error("Gagal update password");
      const data = await res.json();
      return data.message; // backend balikin pesan sukses
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },

    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetPasswordStatus: (state) => {
      state.passwordMessage = null;
      state.passwordError = null;
    },
    resetProfileStatus: (state) => {
      state.profileMessage = null;
      state.profileError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.profileMessage = "Profile berhasil diupdate";
        state.profileError = null;
      })
      .addCase(updatePasswordThunk.fulfilled, (state, action) => {
        // Kalau update password sukses, kita bisa simpan pesan dari backend
        // atau langsung trigger notifikasi di UI
        state.passwordMessage = action.payload;
        state.passwordError = null;
      })
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.passwordError = action.payload;
        state.passwordMessage = null; // bersihin message kalau gagal
      });
  },
});

export const {
  login,
  logout,
  updateProfile,
  resetPasswordStatus,
  resetProfileStatus,
} = authSlice.actions;
export default authSlice.reducer;
