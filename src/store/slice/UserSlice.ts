import { createSlice } from '@reduxjs/toolkit';
import { ExpenseReportRequest, ExpenseReportResponse, GetWeatherResponse, JobHazardRequest, MileageData, NotificationRespionse, SchedulesResponse, UserLocation } from '../../api/apiInterface';


interface UserState {
  UserId: string;
  UserToken: string;
  IsBoss: boolean;
  UserName: string;
  UserEmail: string;
  UserMileageRate: number;
  UserMileageAllowanceDistance: number;
  JobHazard: JobHazardRequest | undefined;
  UserLocation: UserLocation | undefined;
  MileageData:  MileageData | undefined;
        IsRideCompleted: boolean;
        ExpenseData: ExpenseReportRequest | undefined;
        SelectedSchedule:SchedulesResponse | undefined;
        Notfications: NotificationRespionse[]

}

const initialState : UserState= {
  UserId: '',
  UserToken: '',
  IsBoss: false,
  UserName: '',
  UserEmail:'',
  UserMileageAllowanceDistance: 0,
  UserMileageRate: 0,
  JobHazard : undefined,
  UserLocation : undefined,
  MileageData: undefined,
  IsRideCompleted: false,
  ExpenseData: undefined,
  SelectedSchedule:undefined,
  Notfications: []
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      console.log("first", action.payload);
      const { email, isBoss, token, userId, userName,mileage_rate, allowanceDistance } = action.payload;
      state.UserId = userId;
      state.UserToken = token;
      state.IsBoss = isBoss;
      state.UserName = userName;
      state.UserEmail = email;
      state.UserMileageRate = mileage_rate ? mileage_rate : 0;
      state.UserMileageAllowanceDistance = allowanceDistance;
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
    updateMileageData: (state, action) => {
      state.MileageData = action.payload;
    },
    updateIsRideCompleted: (state, action) => {
      state.IsRideCompleted = action.payload;
    },
    updateExpenseData:(state,action)=>{
      state.ExpenseData = action.payload
    },
    updateNoficaitions:(state,action)=>{
      state.Notfications = action.payload
    },
     rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateNoficaitions,updateUserDetails,rehydrate,logoutUser,userIsBoss,updateJobHazard,resetJobHazard ,updateUserLocation, updateMileageData, updateIsRideCompleted, updateExpenseData} = UserSlice.actions;

export default UserSlice.reducer;