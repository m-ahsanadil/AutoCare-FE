import { api } from "./api";

interface LogoutResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        credentials: "include",
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation({
      query: (formData) => ({
        url: '/auth/register',
        method: 'POST',
        body: formData,
      }),
    }),

    // Get Google auth URL
    getGoogleAuthUrl: builder.query<{ success: boolean; data: { authUrl: string } }, void>({
      query: () => ({
        url: '/auth/google-url',
        method: 'GET',
      }),
    }),

    // Add setPassword mutation
    setPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: '/auth/set-password',
        method: 'POST',
        body: { password },
      }),
      invalidatesTags: ['Auth'],
    }),

    // Logout mutation
    logout: builder.mutation<
      { message: string; success: boolean }, // Response type
      void // No request body needed
    >({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include', // This includes cookies/credentials
      }),
      invalidatesTags: ['Auth', 'User', 'Profile'],
      // Optional: Clear all cache on logout
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear all RTK Query cache on successful logout
          dispatch(api.util.resetApiState());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useSetPasswordMutation,
  useGetGoogleAuthUrlQuery,
  useLogoutMutation,
} = authApi