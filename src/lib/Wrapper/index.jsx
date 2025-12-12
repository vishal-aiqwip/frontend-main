/**
 * @version 0.0.1
 * Updated On : Dec 06, 2025
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux';
import { updateAccessToken } from '@/redux/actions';
import { AuthApi } from '@/services/apis/auth';
import { getAccessToken, getRefreshToken } from '@/services/core';
import { isTokenExpired } from '@/lib/jwt';

import { useErrorLog } from '@/hooks';
import { Loader } from '@/components';



const Wrapper = ({ children }) => {
  //-------------- State & Variables --------------//
  const handleError = useErrorLog('lib/Wrapper'); 
  const dispatch = useAppDispatch();
  const { isLoading, userSession } = useAppSelector((state) => state.session);

  //-------------- Use Effects --------------//
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      // If no tokens exist, skip
      if (!accessToken || !refreshToken) {
        return;
      }

      // Check if access token is expired
      const expired = isTokenExpired(accessToken);
      console.log('expired', expired);
      
      if (expired) {
        console.log('Access token is expired, refreshing...');
        
        try {
          const response = await AuthApi.RefreshToken(
            { refresh_token: refreshToken },
            false,
            false
          );

          if (response?.token?.access_token) {
            const newAccessToken = response.token.access_token;
            dispatch(updateAccessToken(newAccessToken));
            console.log('Access token refreshed successfully');
          } else if (response?.access_token) {
            dispatch(updateAccessToken(response.access_token));
            console.log('Access token refreshed successfully');
          } else {
            console.error('Failed to refresh token: No access token in response');
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
          handleError(error);
        }
      } 
      // else {
      //   console.log('Access token is still valid');
      // }
    };

    // Only check after Redux state is rehydrated and userSession exists
    if (userSession) {
      checkAndRefreshToken();
    }
  }, [dispatch, userSession, handleError]);

  //-------------- Other Methods --------------//

  return (
    <>
      {isLoading === 'screen' && <Loader />}
      {children}
    </>
  );
};

export { Wrapper };