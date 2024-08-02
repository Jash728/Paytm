import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeUserInfo } = userSlice.actions;
export default userSlice.reducer;