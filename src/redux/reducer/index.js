/**
 * @version 0.0.1
 * Root reducer - Combines all reducers
 */
import { combineReducers } from '@reduxjs/toolkit';
import sessionReducer from './sessionReducer';
// import userReducer from './userReducer'; // Add more as needed

const rootReducer = combineReducers({
  session: sessionReducer,
  // user: userReducer, // Add more as needed
});

export default rootReducer;

