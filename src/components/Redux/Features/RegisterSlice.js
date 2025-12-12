import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {

      const payload = {
        name: userData.name,
        surname: userData.surname,
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      };

      const res = await axios.post(
        "http://hospitalmanage.runasp.net/api/Authentication/Register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Xəta baş verdi");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
