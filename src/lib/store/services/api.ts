import { BASE_URL } from '@/src/dotenv'
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../'

// Base query with common configuration
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    headers.set('Content-Type', 'application/json')
    return headers
  },
})

// Base query with re-auth logic
const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions)

  // Handle 401 unauthorized
  if (result.error && result.error.status === 401) {
    // Try to refresh token or redirect to login
    console.log('Token expired, redirecting to login')
    // You can dispatch logout action here
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
    'Product',
    'Order',
    'Category',
    'Review'
  ],
  endpoints: () => ({}),
})