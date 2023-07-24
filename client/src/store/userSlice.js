import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialUserState = {
  userData: {},
  error: null, // Add an error field to store any potential error messages
  allUsers: [],
};

export const fetchUserData = createAsyncThunk(
  "user/userData",
  async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/user/profile`, config);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/user/users", config);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    removeUser: (state, action) => {
      const nameToRemove = action.payload;
      state.allUsers = state.allUsers.filter((user) => {
        user.userId !== nameToRemove;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.error = null; // Reset the error field on successful registration
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message; // Store the error message in the state
      }),
      builder
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.allUsers = action.payload;
        })
        .addCase(fetchAllUsers.rejected, (state) => {
          state.loading = false;
          state.error = "Failed to fetch users";
        });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
