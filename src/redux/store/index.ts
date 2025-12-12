/**
 * @version 0.0.1
 * Redux store configuration with redux-persist
 */
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducer';

// Persist configuration
const persistConfig = {
  key: 'root', // Change this to your app name if needed, e.g., 'askeagle_local_storage'
  version: 1,
  storage,
  whitelist: ['session'], // Only persist session slice
  // Optional: Don't persist isLoading
  // transforms: [
  //   {
  //     in: (state: RootState) => ({ ...state, session: { ...state.session, isLoading: false } }),
  //     out: (state: RootState) => state,
  //   },
  // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
