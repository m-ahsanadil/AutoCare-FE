import { BASE_URL } from '@/src/dotenv'
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../'

const VERSION = 'api/v1'
const REQUEST_TIMEOUT = 30000
// Base query with common configuration
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/${VERSION}`,
  timeout: REQUEST_TIMEOUT,

  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.token

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
  let result = await baseQuery(args, api, extraOptions)

  // Handle 401 unauthorized
  if (result.error && result.error.status === 401) {
    // Try to refresh token or redirect to login
    console.log('Token expired or invalid, forcing logout')
  }

  return result
}

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