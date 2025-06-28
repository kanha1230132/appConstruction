import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  UserId: '',
  UserToken: '',
  IsBoss: false,
  UserName: '',
  UserEmail:''
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      console.log("first", action.payload);
      const { email, isBoss, token, userId, userName } = action.payload;
      state.UserId = userId;
      state.UserToken = token;
      state.IsBoss = isBoss;
      state.UserName = userName;
      state.UserEmail = email;
    },
    logoutUser: (state) => {
      state.UserId = '';
      state.UserToken = '';
      state.IsBoss = false;
    },
    userIsBoss: (state, action) => {
      state.IsBoss = action.payload;
    },
     rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserDetails,rehydrate,logoutUser,userIsBoss } = UserSlice.actions;

export default UserSlice.reducer;