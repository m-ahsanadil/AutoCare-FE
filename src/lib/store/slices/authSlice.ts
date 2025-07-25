import { UserRole } from '@/src/enum'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
      role: 'customer' | 'admin' | string; // You can narrow this union if roles are fixed
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

export interface AuthState {
  token: string | null
  user: {
    id: string
    email: string
    name: string
    role: UserRole
  } | null
}

const initialState: AuthState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set token and user info after login
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthState['user'] }>
    ) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },

    // Logout clears all auth info
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer