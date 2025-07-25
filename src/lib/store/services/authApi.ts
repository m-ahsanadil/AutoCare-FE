import { UserRole } from "@/src/enum";
import { api } from "./api";

interface LogoutResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface SetPasswordRequest {
  password: string;
  userId: string;
}
export interface SetPasswordResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      role: UserRole
      profileImage: string;
      isActive: boolean;
      isEmailVerified: boolean;
      lastLogin: string; // ISO date string
      createdAt: string;
      updatedAt: string;
    };
    redirectUrl: string;
    token: string;
  };
  timestamp: string;
}


export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface User {
  _id: string;
  email: string
  name: string
  role: UserRole
  profileImage?: string
  createdAt: string
  firstName: string
  isActive: boolean
  isEmailVerified: boolean
  lastName: string
  phone?: string
  updatedAt: string
  username: string
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
  timestamp: string;
}


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
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

    // Set Password Mutation
    setPassword: builder.mutation<SetPasswordResponse, { request: SetPasswordRequest; token: string }>({
      query: ({ request, token }) => ({
        url: '/auth/set-password',
        method: 'POST',
        body: request,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Auth', 'User'],
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