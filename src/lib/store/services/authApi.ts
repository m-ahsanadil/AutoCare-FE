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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    // Logout mutation
    logout: builder.mutation<{ success: boolean; message: string }, string>({
      query: (token) => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Auth'],
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