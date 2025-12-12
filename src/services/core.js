import axios from 'axios';
import { toast } from 'sonner';

import { CONFIG } from '@/config';

/**
 *  Get session data from redux-persist storage
 *  Internal helper function for axios interceptors
 */
const getPersistedSession = ()=> {
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (!persistedState) return null;

    const parsed = JSON.parse(persistedState);
    const session = JSON.parse(parsed.session || '{}');
    return session.userSession || null;
  } catch {
    return null;
  }
};


/**
 *  Update access token in redux-persist storage
 *  Note: This directly updates localStorage. For better approach, dispatch Redux action from components.
 */
export const setAccessToken = (newAccessToken: string): void => {
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (!persistedState) return;

    const parsed = JSON.parse(persistedState);
    const session = JSON.parse(parsed.session || '{}');
    
    if (session.userSession?.token) {
      session.userSession.token.access_token = newAccessToken;
    } else if (session.userSession) {
      // If token structure doesn't exist, create it
      session.userSession.token = {
        access_token: newAccessToken,
        refresh_token: session.userSession.token?.refresh_token || '',
      };
    } else {
      return; // No session to update
    }

    // Update the persisted state
    parsed.session = JSON.stringify(session);
    localStorage.setItem('persist:root', JSON.stringify(parsed));
  } catch (error) {
    console.error('Failed to update access token:', error);
  }
};

/**
 *  Get access token from redux-persist storage
 */
export const getAccessToken = (): string | null => {
  try {
    const session = getPersistedSession();
    if (!session) return null;

    return (
      session?.token?.access_token ||
      (session as { access_token?: string }).access_token ||
      (session as { access?: string }).access ||
      null
    );
  } catch {
    return null;
  }
};

/**
 *  Get refresh token from redux-persist storage
 */
export const getRefreshToken = (): string | null => {
  try {
    const session = getPersistedSession();
    if (!session) return null;

    return (
      session?.token?.refresh_token ||
      (session as { refresh_token?: string }).refresh_token ||
      (session as { refresh?: string }).refresh ||
      null
    );
  } catch {
    return null;
  }
};

/**
 *  Axios Instances
 */
export const axiosApi = axios.create({
  baseURL: CONFIG.API_URL + '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const publicAxios = axios.create({
  baseURL: CONFIG.API_URL + '/api',
  headers: { 'Content-Type': 'application/json' }
});

/**
 *  Request Interceptor: Attach Access Token
 */
axiosApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 *  Refresh Token Logic
 */
let isRefreshing = false;

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown | null, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: { config?: InternalAxiosRequestConfig & { _retry?: boolean }; response?: { status?: number } }) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && originalRequest && !originalRequest._retry) {
      const refreshToken = getRefreshToken();

      //------ If no refresh token, log out & redirect ------//
      if (!refreshToken) {
        // Clear redux-persist storage
        localStorage.removeItem('persist:root');
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login'; // Safe browser redirect
        return Promise.reject(error);
      }

      //---- Handle concurrent refresh attempts ----//
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = 'Bearer ' + token;
            }
            return axiosApi(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        //------- Attempt refresh--------//
        const res = await publicAxios.post<{ token?: { access_token?: string }; access?: string; access_token?: string }>('/auth/refresh-token', {
          refresh_token: refreshToken
        });

        const newAccessToken =
          res?.data?.token?.access_token || res?.data?.access || res?.data?.access_token;

        if (!newAccessToken) throw new Error('Failed to refresh token');

        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
        }
        return axiosApi(originalRequest);
      } catch (err: unknown) {
        processQueue(err, null);

        //--------- If refresh token request also failed (unauthorized)---------//
        const errStatus = (err as { response?: { status?: number } })?.response?.status;
        if (errStatus === 401 || errStatus === 403) {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('persist:root');
          window.location.href = '/login'; //Redirect to login
        } else {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('persist:root');
          window.location.href = '/login';
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

/**
 *  Ngrok header setup
 */
const addNgrokHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (
    (config.baseURL && config.baseURL.includes('ngrok-free.app')) ||
    (config.url && config.url.includes('ngrok-free.app'))
  ) {
    if (config.headers) {
      config.headers['ngrok-skip-browser-warning'] = 'True';
    }
  }
  return config;
};

publicAxios.interceptors.request.use(addNgrokHeader, (error) => Promise.reject(error));
axiosApi.interceptors.request.use(addNgrokHeader, (error) => Promise.reject(error));

/**
 *  Unified Response Handler
 */
export const responseHandler = async <T = unknown>(
  api_call: Promise<AxiosResponse<T>>,
  toast_success: string | false = false,
  toast_loading: string | false = false
): Promise<T | null> => {
  let response: AxiosResponse<T> | null = null;
  let toastId: string | number | null = null;

  if (toast_loading) toastId = toast.loading(toast_loading);

  try {
    response = await api_call;
    if (response.status === 200 || response.status === 201) {
      if (toast_success && toastId) toast.success(toast_success, { id: toastId });
      else if (toastId) toast.dismiss(toastId);
      return response.data;
    } else {
      if (toastId)
        toast.error(
          `Error ${response.status}: ${(response?.data as { message?: string })?.message || 'Something went wrong'}`,
          { id: toastId }
        );
      return null;
    }
  } catch (error: unknown) {
    const axiosError = error as {
      response?: {
        data?: { detail?: string; message?: string };
        status?: number;
      };
      message?: string;
    };

    const errorMessage =
      axiosError?.response?.data?.detail ||
      axiosError?.response?.data?.message ||
      axiosError?.message ||
      'Something went wrong. Please contact admin.';

    const statusCode = axiosError?.response?.status;

    if (toastId) {
      if (statusCode === 400) toast.error(`Error 400: ${errorMessage}`, { id: toastId });
      else if (statusCode === 401)
        toast.error(`Unauthorized 401: ${errorMessage}`, { id: toastId });
      else if (statusCode === 403)
        toast.error('Unauthorized 403: Action forbidden.', { id: toastId });
      else if (statusCode === 404) toast.error(`Not Found 404: ${errorMessage}`, { id: toastId });
      else if (statusCode === 500)
        toast.error(`Server Error 500: ${errorMessage}`, { id: toastId });
      else toast.error(`Error ${statusCode || ''}: ${errorMessage}`, { id: toastId });
    }

    return null;
  }
};