import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { Draft } from 'immer';

export interface User {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  token: string;
  online: string[];
  socketconnection: Socket | null;
}

const initialState: User = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  online: [],
  socketconnection: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = "";
      state.email = "";
      state.name = "";
      state.profile_pic = "";
      state.token = "";
      state.online = [];
      state.socketconnection = null;
    },
    onlineUser: (state, action: PayloadAction<string[]>) => {
      state.online = action.payload;
    },
    setSocketConnection: (state, action: PayloadAction<Socket | null>) => {
      state.socketconnection = action.payload as unknown as Draft<Socket>;
    },
  },
});

export const { setUser, setToken, logout, onlineUser, setSocketConnection } = userSlice.actions;

export default userSlice.reducer;
