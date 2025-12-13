import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // npm i js-cookie

const API_URL = "http://hospitalmanage.runasp.net/api/Authentication";

/* ================= REGISTER ================= */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/Register`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { errorMessage: "Register error" });
    }
  }
);

/* ================= LOGIN ================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/Login`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { errorMessage: "Login error" });
    }
  }
);

/* ================= LOGOUT ================= */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    return true;
  }
);

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/ForgotPassword`, { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { errorMessage: "Forgot password error" });
    }
  }
);

/* ================= RESET PASSWORD ================= */
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/ResetPassword`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { errorMessage: "Reset password error" });
    }
  }
);

/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* REGISTER */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Qeydiyyat uğurla tamamlandı!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || "Register error";
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          const user = action.payload.data?.user || action.payload.data?.items?.[0] || null;

          state.user = user;

          // Token user obyektindədir
          const token = user?.token || null;
          state.token = token;

          if (token) Cookies.set("token", token, { expires: 7 }); // 7 gün cookie-də saxla

          console.log("Login uğurlu!");
          console.log("User məlumatları:", user);
          console.log("Token:", token);
        } else {
          state.error = action.payload?.errorMessage || "Login xətası";
          state.user = null;
          state.token = null;
          Cookies.remove("token");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || "Login error";
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        Cookies.remove("token");
      })

      /* FORGOT PASSWORD */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Email göndərildi!";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || "Forgot password error";
      })

      /* RESET PASSWORD */
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Şifrə dəyişdirildi!";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.errorMessage || "Reset password error";
      });
  }
});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;
