'use client'

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/src/lib/context/auth-provider"

export default function GoogleSuccessPage() {
    const router = useRouter()
    const params = useSearchParams()
    const { toast } = useToast()
    const { login } = useAuth()

    useEffect(() => {
        const token = params.get("token")
        const encodedUser = params.get("user")

        if (!token || !encodedUser) {
            toast({
                title: "Login Failed",
                description: "Missing authentication data",
                variant: "destructive",
            })
            router.push("/login")
            return
        }

        try {
            const decodedUserJson = decodeURIComponent(encodedUser)
            const user = JSON.parse(decodedUserJson)
            if (!user || !user.id) return
            if (user) {
                login(user, token)
                toast({
                    title: "Success",
                    description: "Logged in with Google successfully!",
                })

                router.push(`${user.role}/dashboard`)
            }
        } catch (err) {
            console.error("Google login error:", err)
            toast({
                title: "Login Error",
                description: "Unable to decode user data",
                variant: "destructive",
            })
            router.push("/login")
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-700">
            <Loader2 className="w-6 h-6 animate-spin mb-2 text-blue-600" />
            <p className="text-sm font-medium">Logging you in via Google...</p>
        </div>
    )
}