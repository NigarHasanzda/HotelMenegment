import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://hospitalmanage.runasp.net/api/Authentication";

// 🔵 1. Bütün istifadəçiləri gətir
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/GetAllUser`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔵 2. ID-ə görə istifadəçi rolu
export const getUserRole = createAsyncThunk(
  "users/getUserRole",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/GetUserRole/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const allUserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    role: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔵 getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data; // backend-də data içində gəlir
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔵 getUserRole
      .addCase(getUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.data; // rol data içində gəlir
      })
      .addCase(getUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allUserSlice.reducer;
