import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterFormData } from "../components/Register/Register";
import appAxios from "../services/appAxios";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    })
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
});

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterFormData, { rejectWithValue }) => {
    try {
      await appAxios.post('/auth/register', data,)
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export default authSlice.reducer;
