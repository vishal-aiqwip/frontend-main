/**
 * @version 0.0.1
 * Updated On : Oct, 2026
 * APIs related to Authentication
 */
import { axiosApi, responseHandler } from "../core";


export const AuthApi = {
  /**
   * Login API
   * @param data - Login credentials
   * @param toast_success - Success message if provided. Default value false.
   * @param toast_loading - Loading message if provided. Default value false.
   * @returns JSON response or null.
   */
  Login: (
    data,
    toast_success = false,
    toast_loading = false
  ) => {
    const api_call = axiosApi.post('/auth/login', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * SignUp API
   * @param data - Signup data
   * @param toast_success - Success message if provided. Default value false.
   * @param toast_loading - Loading message if provided. Default value false.
   * @returns JSON response or null.
   */
  SignUp: (
    data,
    toast_success = false,
    toast_loading = false
  ) => {
    const api_call = axiosApi.post('/auth/signup', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Refresh Token API
   * @param data - Refresh token data
   * @param toast_success - Success message if provided. Default value false.
   * @param toast_loading - Loading message if provided. Default value false.
   * @returns JSON response or null.
   */
  RefreshToken: (
    data,
    toast_success = false,
    toast_loading = false
  ) => {
    const api_call = axiosApi.post('/auth/refresh-token', data);
    return responseHandler(api_call, toast_success, toast_loading);
  }
};