
'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSetPasswordMutation } from "@/src/lib/store/services/authApi"
import { Loader2 } from "lucide-react"

export default function SetPasswordPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [setPassword, { isLoading, isSuccess, error, data }] = useSetPasswordMutation()
    const searchParams = useSearchParams()

    // Get query parameters
    const id = searchParams.get("id")
    const token = searchParams.get("token")

    const [password, setPasswordInput] = useState("")

    useEffect(() => {
        if (!id || !token) {
            toast({
                title: "Error",
                description: "Missing user ID or token",
                variant: "destructive",
            })
            router.push("/login")
        } 
    }, [id, token]);

    // Handle success
    useEffect(() => {
        if (isSuccess && data) {
            console.log(data);

            toast({
                title: "Success",
                description: "Password set successfully",
            })

            // Check if we have redirectUrl in the response
            if (data.data?.redirectUrl) {
                // Redirect to Google success page
                window.location.href = data.data.redirectUrl;
            } else {
                // Fallback redirect
                router.push("/dashboard")
            }
        }
    }, [isSuccess, data, toast, router])

    // Handle error
    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: 'data' in error
                    ? (error.data as any)?.message || "Failed to set password"
                    : "Failed to set password",
                variant: "destructive",
            })
        }
    }, [error, toast])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password || password.length < 6) {
            return toast({
                title: "Validation Error",
                description: "Password must be at least 6 characters",
                variant: "destructive",
            })
        }

        if (!token) {
            return toast({
                title: "Error",
                description: "Missing authentication token",
                variant: "destructive",
            })
        }

        // Trigger the mutation
        await setPassword({ password, token })
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm bg-white">
            <h1 className="text-xl font-semibold mb-4">Set Your Password</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
                <Button className="mt-4 w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Setting Password..." : "Set Password"}
                </Button>
            </form>

            <Button
                variant="outline"
                className="mt-2 w-full"
                type="button"
                onClick={() => router.push("/login")}
            >
                Skip for now
            </Button>
        </div>
    )
}