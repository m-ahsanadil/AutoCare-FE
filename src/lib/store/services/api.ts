import { BASE_URL } from '@/src/dotenv'
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../'
import { useAuth } from '../../context/auth-provider'

const VERSION = 'api/v1'
const REQUEST_TIMEOUT = 30000

// Base query with common configuration
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/${VERSION}`,
  timeout: REQUEST_TIMEOUT,

  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("autocare360_token");

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    // Only set JSON content-type if NOT sending FormData
    if (!(headers.get('Content-Type') === null)) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
})

// Base query with re-auth logic
const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn("Unauthorized - redirecting or refreshing token");
  }

  return result;
};

// Create the base API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'User',
    'Profile',
    'Product',
    'Order',
    'Category',
    'Review',
    'Dashboard',
    'Settings',
    'Notification',
    'Report',
    'Inventory',
    'Customer',
    'Service',
    'Appointment',
    'Invoice',
    'Payment',
  ],
  endpoints: () => ({}),
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,
})


// Helper function to clear all cached data
export const clearAllCache = () => {
  return api.util.resetApiState()
}

// Helper function to invalidate specific tags
export const invalidateApiTags = (
  tags: (
    | 'Auth'
    | 'User'
    | 'Profile'
    | 'Product'
    | 'Order'
    | 'Category'
    | 'Review'
    | 'Dashboard'
    | 'Settings'
    | 'Notification'
    | 'Report'
    | 'Inventory'
    | 'Customer'
    | 'Service'
    | 'Appointment'
    | 'Invoice'
    | 'Payment'
  )[]
) => {
  // Map string tags to TagDescription objects
  const tagDescriptions = tags.map(tag => ({ type: tag }));
  return api.util.invalidateTags(tagDescriptions);
}

// Network status utilities
export const isNetworkError = (error: any): boolean => {
  return error?.status === 'FETCH_ERROR' || error?.status === 'TIMEOUT_ERROR'
}

export const isServerError = (error: any): boolean => {
  return error?.status >= 500 && error?.status < 600
}

export const isClientError = (error: any): boolean => {
  return error?.status >= 400 && error?.status < 500
}