/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create session reducer of Redux
 */
import { createSlice } from '@reduxjs/toolkit';




const initialState = {
  userSession: null,
  isLoading: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loadingStart: (state, action) => {
      state.isLoading = action.payload || 'screen';
    },
    loadingStop: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.userSession = action.payload;
    },
    logout: (state) => {
      state.userSession = null;
      state.isLoading = false;
      // Note: To properly clear redux-persist, dispatch persistor.purge() in your component
      // Example: import { persistor } from '@/redux'; persistor.purge();
    },
    updateAccessToken: (state, action) => {
      if (state.userSession?.token) {
        state.userSession.token.access_token = action.payload;
      }
    },
  },
});

export const { loadingStart, loadingStop, login, logout,updateAccessToken } = sessionSlice.actions;
export default sessionSlice.reducer;

