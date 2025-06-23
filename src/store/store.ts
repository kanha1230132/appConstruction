import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './slice/UserSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist: ['User']
};

const persistedUserReducer = persistReducer(persistConfig, UserSlice.reducer);

export const store = configureStore({
  reducer: {
    UserSlice: persistedUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if using non-serializable values
    }),

});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
