import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// --- LOGIN ASYNC THUNK ---
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://hospitalmanage.runasp.net/api/Authentication/Login",
        {
          userNameOrEmail: formData.userNameOrEmail,
          password: formData.password,
          isRemembered: formData.isRemembered || false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Əgər backend error göndərirsə
      if (res.data?.errorFlag) {
        return rejectWithValue(res.data?.errorMessage);
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login zamanı xəta baş verdi");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    user: null,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        toast.success("Login uğurludur!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login zamanı xəta baş verdi");
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
