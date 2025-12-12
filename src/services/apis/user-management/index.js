/**
 * @version 0.0.1
 * Updated On : 06 Dec, 2025
 * This is a collection of User Management APIs.
 * It handles all user-related API routes.
 */

import { responseHandler, axiosApi } from "@/services/core";
import type { User, UserQueryParams, BulkDeletePayload, BulkUpdateStatusPayload, ToastMessage } from "@/types";

export const UserApis = {
  /**
   * Get all users
   * @param params - Query params (optional)
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  GetAllUser: (
    params: UserQueryParams = {},
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<User[] | null> => {
    const api_call = axiosApi.get<User[]>('/users', { params });
    return responseHandler<User[]>(api_call, toast_success, toast_loading);
  },
  /**
   * Get all roles
   * @param params - Query params (optional)
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  GetAllRoles: (
    params: UserQueryParams = {},
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<unknown[] | null> => {
    const api_call = axiosApi.get<unknown[]>('/roles', { params });
    return responseHandler<unknown[]>(api_call, toast_success, toast_loading);
  },

  /**
   * Get single user details
   * @param userId - User ID
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  GetUserById: (
    userId: string | number,
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<User | null> => {
    const api_call = axiosApi.get<User>(`/users/${userId}`);
    return responseHandler<User>(api_call, toast_success, toast_loading);
  },

  /**
   * Create new user
   * @param data - User data
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  CreateUser: (
    data: Partial<User> & { email: string; password: string },
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<User | null> => {
    const api_call = axiosApi.post<User>('/users', data);
    return responseHandler<User>(api_call, toast_success, toast_loading);
  },

  /**
   * Update user details
   * @param userId - User ID
   * @param data - Updated user data
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  UpdateUser: (
    userId: string | number,
    data: Partial<User>,
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<User | null> => {
    const api_call = axiosApi.put<User>(`/users/${userId}`, data);
    return responseHandler<User>(api_call, toast_success, toast_loading);
  },

  /**
   * Delete user
   * @param userId - User ID
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  DeleteUser: (
    userId: string | number,
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<{ message?: string } | null> => {
    const api_call = axiosApi.delete<{ message?: string }>(`/users/${userId}`);
    return responseHandler<{ message?: string }>(api_call, toast_success, toast_loading);
  },

  /**
   * Delete users in bulk
   * @param payload - Array of user IDs to delete
   * @param toast_success - Optional success message. Default false.
   * @param toast_loading - Optional loading message. Default false.
   * @returns JSON response or null.
   */
  BulkDeleteUsers: (
    payload: BulkDeletePayload,
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<{ message?: string } | null> => {
    const api_call = axiosApi.post<{ message?: string }>("/users/bulk-delete", payload);
    return responseHandler<{ message?: string }>(api_call, toast_success, toast_loading);
  },

  /**
   * Update users' active status in bulk
   * @param payload - Bulk update payload with user IDs and status
   * @param toast_success - Optional success message.
   * @param toast_loading - Optional loading message.
   * @returns JSON response or null.
   */
  BulkUpdateUserStatus: (
    payload: BulkUpdateStatusPayload,
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<{ message?: string } | null> => {
    const api_call = axiosApi.post<{ message?: string }>("/users/bulk-update", payload);
    return responseHandler<{ message?: string }>(api_call, toast_success, toast_loading);
  },

  /**
   * Update logged-in user's profile
   * @param data - Profile data
   * @param toast_success - Success message if provided. Default false.
   * @param toast_loading - Loading message if provided. Default false.
   * @returns JSON response or null.
   */
  UpdateUserProfile: (
    data: Partial<User>,
    toast_success: ToastMessage = false,
    toast_loading: ToastMessage = false
  ): Promise<User | null> => {
    const api_call = axiosApi.put<User>('/users/profile', data);
    return responseHandler<User>(api_call, toast_success, toast_loading);
  },
};