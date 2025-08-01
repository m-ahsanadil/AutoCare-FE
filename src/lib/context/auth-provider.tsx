"use client"

import { UserRole } from "@/src/enum"
import type React from "react"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { useLogoutMutation } from "../store/services"

type User = {
  id: string
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

type AuthContextType = {
  user: User | null
  login: (user: User, token: string) => void
  logout: () => Promise<void>
  isLoading: boolean
  token: string | null;
  isLoggingOut: boolean

}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()


  useEffect(() => {
    // Check for stored user session and token
    const storedUser = localStorage.getItem("autocare360_user")
    const storedToken = localStorage.getItem("autocare360_token")

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        // Clear corrupted data
        localStorage.removeItem("autocare360_user")
        localStorage.removeItem("autocare360_token")
      }
    }
    setIsLoading(false)
  }, [])


  const login = useCallback((userData: User, userToken: string) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem("autocare360_user", JSON.stringify(userData))
    localStorage.setItem("autocare360_token", userToken)
  }, [])

  const logout = useCallback(async () => {
    try {
      // Call logout API if token exists
      if (token) {
        await logoutMutation().unwrap();
        console.log('✅ Logout API call successful')
      }
    } catch (error) {
      console.error('❌ Logout API error:', error)
      // Continue with logout even if API call fails
    } finally {
      // Clear state and localStorage
      setUser(null)
      setToken(null)
      localStorage.removeItem("autocare360_user")
      localStorage.removeItem("autocare360_token");
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
  }, [token, logoutMutation])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        token,
        isLoggingOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
