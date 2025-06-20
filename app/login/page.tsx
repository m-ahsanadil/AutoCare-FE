"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Car, Wrench } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Demo credentials
    const demoUsers = {
      "admin@autocare360.com": { role: "admin", name: "John Admin" },
      "mechanic@autocare360.com": { role: "mechanic", name: "Mike Mechanic" },
      "receptionist@autocare360.com": { role: "receptionist", name: "Sarah Reception" },
    }

    if (email in demoUsers && password === "password123") {
      const user = demoUsers[email as keyof typeof demoUsers]
      login({
        id: "1",
        email,
        name: user.name,
        role: user.role as "admin" | "mechanic" | "receptionist",
      })
      router.push("/dashboard")
    } else {
      alert(
        "Invalid credentials. Use demo accounts:\n- admin@autocare360.com\n- mechanic@autocare360.com\n- receptionist@autocare360.com\nPassword: password123",
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">AutoCare360</CardTitle>
          <CardDescription>Vehicle Service Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Admin:</strong> admin@autocare360.com
              </p>
              <p>
                <strong>Mechanic:</strong> mechanic@autocare360.com
              </p>
              <p>
                <strong>Receptionist:</strong> receptionist@autocare360.com
              </p>
              <p>
                <strong>Password:</strong> password123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
