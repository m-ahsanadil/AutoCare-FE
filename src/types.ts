// global-error-types.ts

/**
 * Global Error Response Interfaces for Client-Side Application
 * Handles all possible error scenarios from your Express error handler
 */

// =============================================================================
// BASE ERROR INTERFACES
// =============================================================================

/**
 * Standard API error response structure from your server
 */
export interface ApiErrorResponse {
  /** Always false for error responses */
  success: false;
  
  /** Human-readable error message */
  message: string;
  
  /** HTTP status code */
  statusCode: number;
  
  /** Optional error code for specific error types */
  code?: string | number;
  
  /** Additional error details (only in development) */
  details?: {
    stack?: string;
    path?: string;
    value?: any;
    errors?: any[];
    [key: string]: any;
  };
  
  /** Timestamp when error occurred */
  timestamp: string;
}

/**
 * Network/Client-side error (not from API)
 */
export interface NetworkError {
  /** Error type identifier */
  type: 'NETWORK_ERROR' | 'PARSE_ERROR' | 'CLIENT_ERROR';
  
  /** Error message */
  message: string;
  
  /** Original error object */
  originalError?: Error;
  
  /** Request that caused the error */
  request?: {
    url: string;
    method: string;
    headers?: Record<string, string>;
  };
}

// =============================================================================
// SPECIFIC ERROR TYPES FROM YOUR ERROR HANDLER
// =============================================================================

/**
 * Database/Mongoose related errors
 */
export interface DatabaseErrorResponse extends ApiErrorResponse {
  statusCode: 400 | 404 | 409;
  errorType: 'DATABASE_ERROR';
  subType: 'CAST_ERROR' | 'DUPLICATE_KEY' | 'VALIDATION_ERROR';
}

/**
 * Authentication/JWT related errors
 */
export interface AuthErrorResponse extends ApiErrorResponse {
  statusCode: 401;
  errorType: 'AUTH_ERROR';
  subType: 'INVALID_TOKEN' | 'EXPIRED_TOKEN' | 'NO_TOKEN';
}

/**
 * File upload related errors
 */
export interface FileUploadErrorResponse extends ApiErrorResponse {
  statusCode: 400;
  errorType: 'FILE_UPLOAD_ERROR';
  subType: 'FILE_TOO_LARGE' | 'UNEXPECTED_FIELD' | 'INVALID_FILE_TYPE';
}

/**
 * Authorization/Permission errors
 */
export interface AuthorizationErrorResponse extends ApiErrorResponse {
  statusCode: 403;
  errorType: 'AUTHORIZATION_ERROR';
  subType: 'INSUFFICIENT_PERMISSIONS' | 'RESOURCE_FORBIDDEN';
}

/**
 * Resource not found errors
 */
export interface NotFoundErrorResponse extends ApiErrorResponse {
  statusCode: 404;
  errorType: 'NOT_FOUND_ERROR';
  subType: 'RESOURCE_NOT_FOUND' | 'ENDPOINT_NOT_FOUND';
}

/**
 * Rate limiting errors
 */
export interface RateLimitErrorResponse extends ApiErrorResponse {
  statusCode: 429;
  errorType: 'RATE_LIMIT_ERROR';
  retryAfter?: number; // seconds to wait before retry
}

/**
 * Server errors
 */
export interface ServerErrorResponse extends ApiErrorResponse {
  statusCode: 500 | 502 | 503 | 504;
  errorType: 'SERVER_ERROR';
  subType: 'INTERNAL_ERROR' | 'BAD_GATEWAY' | 'SERVICE_UNAVAILABLE' | 'TIMEOUT';
}

// =============================================================================
// UNION TYPES FOR ALL POSSIBLE ERRORS
// =============================================================================

/**
 * All possible API error responses from your server
 */
export type ApiError = 
  | DatabaseErrorResponse
  | AuthErrorResponse
  | FileUploadErrorResponse
  | AuthorizationErrorResponse
  | NotFoundErrorResponse
  | RateLimitErrorResponse
  | ServerErrorResponse
  | ApiErrorResponse; // Generic fallback

/**
 * All possible errors (API + Network)
 */
export type GlobalError = ApiError | NetworkError;

// =============================================================================
// ERROR CLASSIFICATION ENUMS
// =============================================================================

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',           // User can continue, show toast
  MEDIUM = 'medium',     // User needs to take action
  HIGH = 'high',         // Blocks user workflow
  CRITICAL = 'critical'  // App-breaking, needs immediate attention
}

/**
 * Error categories for handling strategies
 */
export enum ErrorCategory {
  USER_INPUT = 'user_input',         // 400, validation errors
  AUTHENTICATION = 'authentication', // 401 errors
  AUTHORIZATION = 'authorization',   // 403 errors
  NOT_FOUND = 'not_found',          // 404 errors
  SERVER_ISSUE = 'server_issue',    // 5xx errors
  NETWORK_ISSUE = 'network_issue',  // Network problems
  CLIENT_ERROR = 'client_error'     // Client-side issues
}

/**
 * User action recommendations
 */
export enum UserAction {
  RETRY = 'retry',
  LOGIN = 'login',
  REFRESH = 'refresh',
  CONTACT_SUPPORT = 'contact_support',
  GO_BACK = 'go_back',
  NONE = 'none'
}

// =============================================================================
// ERROR PROCESSING UTILITIES
// =============================================================================

/**
 * Processed error information for UI display
 */
export interface ProcessedError {
  /** User-friendly message to display */
  userMessage: string;
  
  /** Error severity level */
  severity: ErrorSeverity;
  
  /** Error category */
  category: ErrorCategory;
  
  /** Recommended user action */
  action: UserAction;
  
  /** Whether the operation can be retried */
  canRetry: boolean;
  
  /** Whether to show technical details */
  showDetails: boolean;
  
  /** Technical error message for developers */
  technicalMessage?: string;
  
  /** Error code for tracking */
  errorCode?: string;
  
  /** Retry delay in milliseconds */
  retryDelay?: number;
}

/**
 * Error processor function type
 */
export type ErrorProcessor = (error: GlobalError) => ProcessedError;

// =============================================================================
// ERROR HANDLER CONFIGURATION
// =============================================================================

/**
 * Configuration for global error handling
 */
export interface ErrorHandlerConfig {
  /** Show detailed error messages in development */
  showDetailedErrors: boolean;
  
  /** Default retry attempts */
  defaultRetryAttempts: number;
  
  /** Default retry delay (ms) */
  defaultRetryDelay: number;
  
  /** Enable error reporting to external service */
  enableErrorReporting: boolean;
  
  /** Custom error messages */
  customMessages?: Record<string, string>;
  
  /** Callback for error logging */
  onError?: (error: GlobalError, context?: any) => void;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Check if error is an API error
 */
export const isApiError = (error: any): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' in error &&
    error.success === false &&
    'message' in error &&
    'statusCode' in error
  );
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: any): error is NetworkError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    ['NETWORK_ERROR', 'PARSE_ERROR', 'CLIENT_ERROR'].includes(error.type)
  );
};

/**
 * Check if error is authentication related
 */
export const isAuthError = (error: any): error is AuthErrorResponse => {
  return isApiError(error) && error.statusCode === 401;
};

/**
 * Check if error is authorization related
 */
export const isAuthorizationError = (error: any): error is AuthorizationErrorResponse => {
  return isApiError(error) && error.statusCode === 403;
};

/**
 * Check if error is server-side
 */
export const isServerError = (error: any): error is ServerErrorResponse => {
  return isApiError(error) && error.statusCode >= 500;
};

/**
 * Check if error is client-side
 */
export const isClientError = (error: any): error is ApiError => {
  return isApiError(error) && error.statusCode >= 400 && error.statusCode < 500;
};

// =============================================================================
// RESPONSE WRAPPER TYPES
// =============================================================================

/**
 * Generic API response wrapper
 */
export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
  timestamp: string;
} | ApiError;

/**
 * Async operation result
 */
export type AsyncResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: GlobalError;
};

// =============================================================================
// USAGE EXAMPLES IN COMMENTS
// =============================================================================

/**
 * USAGE EXAMPLES:
 * 
 * // In your API client
 * const fetchUser = async (id: string): Promise<AsyncResult<User>> => {
 *   try {
 *     const response = await fetch(`/api/users/${id}`);
 *     const data: ApiResponse<User> = await response.json();
 *     
 *     if (data.success) {
 *       return { success: true, data: data.data };
 *     } else {
 *       return { success: false, error: data };
 *     }
 *   } catch (error) {
 *     return { 
 *       success: false, 
 *       error: {
 *         type: 'NETWORK_ERROR',
 *         message: 'Failed to fetch user',
 *         originalError: error as Error
 *       }
 *     };
 *   }
 * };
 * 
 * // In your React component
 * const handleError = (error: GlobalError) => {
 *   if (isAuthError(error)) {
 *     // Redirect to login
 *     router.push('/login');
 *   } else if (isServerError(error)) {
 *     // Show server error message
 *     toast.error('Server temporarily unavailable');
 *   } else {
 *     // Show generic error
 *     toast.error(error.message);
 *   }
 * };
 */