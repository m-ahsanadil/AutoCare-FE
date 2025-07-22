
// 'use client'

// import { useEffect, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { useSetPasswordMutation } from "@/src/lib/store/services/authApi"
// import { Loader2 } from "lucide-react"

// export default function SetPasswordPage() {
//     const router = useRouter()
//     const { toast } = useToast()
//     const [setPassword, { isLoading, isSuccess, error, data }] = useSetPasswordMutation()
//     const searchParams = useSearchParams()

//     // Get query parameters
//     const id = searchParams.get("id")
//     const token = searchParams.get("token")

//     const [password, setPasswordInput] = useState("")

//     useEffect(() => {
//         if (!id || !token) {
//             toast({
//                 title: "Error",
//                 description: "Missing user ID or token",
//                 variant: "destructive",
//             })
//             router.push("/login")
//         } 
//     }, [id, token]);

//     // Handle success
//     useEffect(() => {
//         if (isSuccess && data) {
//             console.log(data);

//             toast({
//                 title: "Success",
//                 description: "Password set successfully",
//             })

//             // Check if we have redirectUrl in the response
//             if (data.data?.redirectUrl) {
//                 // Redirect to Google success page
//                 window.location.href = data.data.redirectUrl;
//             } 
//         }
//     }, [isSuccess, data, toast, router])

//     // Handle error
//     useEffect(() => {
//         if (error) {
//             toast({
//                 title: "Error",
//                 description: 'data' in error
//                     ? (error.data as any)?.message || "Failed to set password"
//                     : "Failed to set password",
//                 variant: "destructive",
//             })
//         }
//     }, [error, toast])

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         if (!password || password.length < 6) {
//             return toast({
//                 title: "Validation Error",
//                 description: "Password must be at least 6 characters",
//                 variant: "destructive",
//             })
//         }

//         if (!token) {
//             return toast({
//                 title: "Error",
//                 description: "Missing authentication token",
//                 variant: "destructive",
//             })
//         }

//         // Trigger the mutation
//         await setPassword({ password, token })
//     }

//     return (
//         <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm bg-white">
//             <h1 className="text-xl font-semibold mb-4">Set Your Password</h1>
//             <form onSubmit={handleSubmit}>
//                 <Input
//                     type="password"
//                     placeholder="Enter new password"
//                     value={password}
//                     onChange={(e) => setPasswordInput(e.target.value)}
//                 />
//                 <Button className="mt-4 w-full" disabled={isLoading}>
//                     {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                     {isLoading ? "Setting Password..." : "Set Password"}
//                 </Button>
//             </form>

//             <Button
//                 variant="outline"
//                 className="mt-2 w-full"
//                 type="button"
//                 onClick={() => router.push("/login")}
//             >
//                 Skip for now
//             </Button>
//         </div>
//     )
// }


'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react"

export default function SetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id || !token) {
            router.push('/login?error=invalid_password_reset');
        }
    }, [id, token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/set-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password,
                    userId: id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Password set successfully, redirect to login
                router.push('/login?success=password_set');
            } else {
                setError(data.message || 'Failed to set password');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Set Your Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please create a password for your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Setting Password..." : "Set Password"}
                        </button>
                    </div>
                </form>

                {/* Development Info */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md text-xs">
                        <p><strong>User ID:</strong> {id}</p>
                        <p><strong>Token:</strong> {token?.substring(0, 20)}...</p>
                    </div>
                )}
            </div>
        </div>
    );
}