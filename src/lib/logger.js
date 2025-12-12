/**
 * Logger utility for development and production
 * Replaces console statements with environment-aware logging
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  /**
   * Log information (development only)
   */
  log: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Log warnings (development only)
   */
  warn: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  /**
   * Log errors (always logged, can be extended to send to error tracking service)
   */
  error: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.error(...args);
    }
    // TODO: In production, send to error tracking service (e.g., Sentry)
    // if (errorTrackingService) {
    //   errorTrackingService.captureException(...args);
    // }
  },

  /**
   * Debug logs (development only)
   */
  debug: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },

  /**
   * Info logs (development only)
   */
  info: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.info(...args);
    }
  }
};