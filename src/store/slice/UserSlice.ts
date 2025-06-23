import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  UserId: '',
  UserToken: '',
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateUserDetails: (state,action) => {
        const {token} = action.payload
    }
  },
});

export const { updateUserDetails } = UserSlice.actions;

export default UserSlice.reducer;