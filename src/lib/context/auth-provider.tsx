"use client"

import { UserRole } from "@/src/enum"
import type React from "react"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

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
  logout: () => void
  isLoading: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // Check for stored user session and token
    const storedUser = localStorage.getItem("autocare360_user")
    const storedToken = localStorage.getItem("autocare360_token")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setIsLoading(false)
  }, [])


  const login = (userData: User, userToken: string) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem("autocare360_user", JSON.stringify(userData))
    localStorage.setItem("autocare360_token", userToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("autocare360_user")
    localStorage.removeItem("autocare360_token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        token
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
