import { createSlice } from '@reduxjs/toolkit';
import { GetWeatherResponse, JobHazardRequest, UserLocation } from '../../api/apiInterface';

interface UserState {
  UserId: string;
  UserToken: string;
  IsBoss: boolean;
  UserName: string;
  UserEmail: string;
  JobHazard: JobHazardRequest | undefined;
  UserLocation: UserLocation | undefined;
}

const initialState : UserState= {
  UserId: '',
  UserToken: '',
  IsBoss: false,
  UserName: '',
  UserEmail:'',
  JobHazard : undefined,
  UserLocation : undefined
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
    updateJobHazard: (state, action) => {
      state.JobHazard = action.payload;
    },
    resetJobHazard: (state) => {
      state.JobHazard = undefined;
    },
    updateUserLocation: (state, action) => {
      state.UserLocation = action.payload;
    },
     rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserDetails,rehydrate,logoutUser,userIsBoss,updateJobHazard,resetJobHazard ,updateUserLocation} = UserSlice.actions;

export default UserSlice.reducer;