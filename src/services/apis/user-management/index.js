/**
 * @version 0.0.1
 * Updated On : 12 Dec, 2025
 * This is a collection of User Management APIs.
 * It handles all user-related API routes.
 */

import { responseHandler, axiosApi } from "@/services/core";

export const UserApis = {
  /**
   * Get all users
   * @param {object} params query params (optional)
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  GetAllUser: (params = {}, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.get('/users', { params });
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * Get all roles
   * @param {object} params query params (optional)
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  GetAllRoles: (params = {}, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.get('/roles', { params });
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Get single user details
   * @param {string|number} userId user ID.
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  GetUserById: (userId, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.get(`/users/${userId}`);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Create new user
   * @param {object} data user data.
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  CreateUser: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/users', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Update user details
   * @param {string|number} userId user ID.
   * @param {object} data updated user data.
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  UpdateUser: (userId, data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.put(`/users/${userId}`, data);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Delete user
   * @param {string|number} userId user ID.
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  DeleteUser: (userId, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.delete(`/users/${userId}`);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Delete users in bulk
   * @param {Array<number>} userIds Array of user IDs to delete.
   * @param {string|boolean} toast_success Optional success message. Default false.
   * @param {string|boolean} toast_loading Optional loading message. Default false.
   * @returns {Promise<object|null>} JSON response or null.
   */
  BulkDeleteUsers: (payload, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post("/users/bulk-delete", payload);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Update users' active status in bulk
   * @param {Array<number>} userIds Array of user IDs to update.
   * @param {boolean} isActive New is_active status.
   * @param {string|boolean} toast_success Optional success message.
   * @param {string|boolean} toast_loading Optional loading message.
   * @returns {Promise<object|null>} JSON response or null.
   */
  BulkUpdateUserStatus: (payload, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post("/users/bulk-update", payload);
    return responseHandler(api_call, toast_success, toast_loading);
  },


  /**
   * Update logged-in user's profile
   * @param {object} data profile data.
   * @param {string|boolean} toast_success success message if provided. Default false.
   * @param {string|boolean} toast_loading loading message if provided. Default false.
   * @returns {json|null} json response or null.
   */
  UpdateUserProfile: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.put('/users/profile', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
