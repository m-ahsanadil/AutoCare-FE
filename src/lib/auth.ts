// lib/auth.ts
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  isActive: boolean;
  isEmailVerified: boolean;
  phone?: string;
  updatedAt: string;
  username: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  username?: string;
  profileImage?: File;
}

export interface SetPasswordData {
  password: string;
  confirmPassword: string;
}

class AuthService {
  private baseUrl = `${API_BASE_URL}/api/v1/auth`;

  // Login with email/password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Important for cookies
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  }

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const formData = new FormData();
    
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  }

  // Set password for users without password (e.g., Google OAuth users)
  async setPassword(passwordData: SetPasswordData, token: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/set-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Setting password failed');
    }

    return response.json();
  }

  // Logout user
  async logout(): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get('autocare360_token')?.value;

    if (token) {
      try {
        await fetch(`${this.baseUrl}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
      } catch (error) {
        console.error('Logout request failed:', error);
      }
    }
  }

  // Get Google OAuth URL
  async getGoogleAuthUrl(): Promise<{ authUrl: string }> {
    const response = await fetch(`${this.baseUrl}/google-url`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get Google auth URL');
    }

    const data = await response.json();
    return data.data;
  }

  // Client-side: Redirect to Google OAuth
  initiateGoogleAuth(): void {
    window.location.href = `${this.baseUrl}/google`;
  }

  // Parse user data from URL parameters (for OAuth callbacks)
  parseUserFromUrl(searchParams: URLSearchParams): User | null {
    const userParam = searchParams.get('user');
    if (!userParam) return null;

    try {
      return JSON.parse(decodeURIComponent(userParam));
    } catch (error) {
      console.error('Failed to parse user data from URL:', error);
      return null;
    }
  }

  // Get token from URL parameters
  getTokenFromUrl(searchParams: URLSearchParams): string | null {
    return searchParams.get('token');
  }

  // Server-side: Get current user from cookies
  async getCurrentUser(): Promise<User | null> {
    const cookieStore = cookies();
    const token = (await cookieStore).get('autocare360_token')?.value;
    
    if (!token) return null;

    try {
      // Decode JWT token to get user data (basic implementation)
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      return payload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  // Check if user is authenticated (server-side)
  async isAuthenticated(): Promise<boolean> {
    const cookieStore = cookies();
    const token = (await cookieStore).get('autocare360_token')?.value;
    return !!token;
  }
}

export const authService = new AuthService();