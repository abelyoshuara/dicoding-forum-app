import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../interfaces/attributes";

export const initialState: User = {
  id: "",
  name: "",
  email: "",
  avatar: "",
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (_state, action: PayloadAction<User>) => {
      // const { id, name, email, avatar } = action.payload;
      // state.id = id;
      // state.name = name;
      // state.email = email;
      // state.avatar = avatar;
      return { ...action.payload };
    },
    unsetAuthUser: () => initialState,
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export const selectUserId = (state: RootState) => state.authUser.id;
export const selectUserName = (state: RootState) => state.authUser.name;
export const selectUserEmail = (state: RootState) => state.authUser.email;
export const selectCurrentUser = (state: RootState) => state.authUser;

export default authUserSlice.reducer;
