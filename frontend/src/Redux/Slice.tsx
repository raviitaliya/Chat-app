import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string ;
  name: string;
  email: string;
  profile_pic: string;
  token: string;
}

const initialState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.profile_pic = action.payload?.profile_pic;
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
    },
  },
});

export const { setUser, setToken, logout } = counterSlice.actions;

export default counterSlice.reducer;