/**
 * @version 0.0.1
 * Updated On : 06 Dec, 2025
 * Custom ErrorLog hook to handle UI errors in prod
 */
import { useCallback, useRef } from 'react';
import { logger } from '@/lib/logger';

export const useErrorLog = (fileLocation) => {
  // Use ref to store fileLocation to avoid recreating function on every render
  const fileLocationRef = useRef(fileLocation);
  fileLocationRef.current = fileLocation;

  /**
   * Log error with file location context
   * @param error - Error object or error-like object
   */
  const handleError = useCallback((error) => {
    const errorObj = error;
    const errorLogString = `Date: ${new Date()} \nFile: ${fileLocationRef.current} \nError: ${errorObj?.message || 'Unknown error'}`;
    logger.error('------------------------');
    logger.error(errorLogString);
    logger.error('**** Stack Trace ****');
    logger.error(errorObj?.stack || 'No stack trace available');
    logger.error('------------------------');
  }, []); // Empty deps - function is stable, fileLocation accessed via ref

  return handleError;
};