import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './slice/UserSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStore } from '../api/apiClient';
import { ReportSlice } from './slice/Reports';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage
};

const persistedUserReducer = persistReducer(persistConfig, UserSlice.reducer);

export const store = configureStore({
  reducer: {
    User: persistedUserReducer,
    Reports: ReportSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if using non-serializable values
    }),

});
setStore(store);
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
