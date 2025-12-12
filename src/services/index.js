/**
 * @version 0.0.1
 * Updated On : june 06, 2025
 * Import and export apis from ./apis
 * Import it in component as API.Login()
 */
import { AuthApi } from '@/services/apis/auth';
import { UserApis } from './apis/user-management';


export const API = {
  ...AuthApi,
  ...UserApis,

};
