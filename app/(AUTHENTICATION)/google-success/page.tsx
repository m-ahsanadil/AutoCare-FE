// 'use client'

// import { useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"
// import { Loader2 } from "lucide-react"
// import { useAuth } from "@/src/lib/context/auth-provider"

// export default function GoogleSuccessPage() {
//     const router = useRouter()
//     const params = useSearchParams()
//     const { toast } = useToast()
//     const { login } = useAuth()

//     useEffect(() => {
//         const token = params.get("token")
//         const encodedUser = params.get("user")

//         if (!token || !encodedUser) {
//             toast({
//                 title: "Login Failed",
//                 description: "Missing authentication data",
//                 variant: "destructive",
//             })
//             router.push("/login")
//             return
//         }

//         try {
//             const decodedUserJson = decodeURIComponent(encodedUser)
//             const user = JSON.parse(decodedUserJson)
//             if (!user || !user.id) return
//             if (user) {
//                 login(user, token)
//                 toast({
//                     title: "Success",
//                     description: "Logged in with Google successfully!",
//                 })

//                 router.push(`${user.role}/dashboard`)
//             }
//         } catch (err) {
//             console.error("Google login error:", err)
//             toast({
//                 title: "Login Error",
//                 description: "Unable to decode user data",
//                 variant: "destructive",
//             })
//             router.push("/login")
//         }
//     }, [])

//     return (
//         <div className="flex flex-col items-center justify-center h-screen text-gray-700">
//             <Loader2 className="w-6 h-6 animate-spin mb-2 text-blue-600" />
//             <p className="text-sm font-medium">Logging you in via Google...</p>
//         </div>
//     )
// }

'use client';

import { useAuth } from '@/src/lib/context/auth-provider';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
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

export default function GoogleSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login, logout: authLogout } = useAuth();
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userParam && token) {
            try {
                const decoded = JSON.parse(decodeURIComponent(userParam));
                setUserData(decoded);

                // Use the login function from useAuth instead of localStorage directly
                login(decoded, token);

                console.log('✅ Google OAuth Success');
                console.log('User Data:', decoded);
                console.log('Token:', token);

            } catch (e) {
                console.error('Error parsing user data:', e);
                setError('Failed to parse user information');
            }
        } else {
            setError('No user data or token received');
        }
    }, [token, userParam]);

    const handleContinue = () => {
        // Redirect to dashboard or home page
        router.push(`/${userData?.role}/dashboard`);
    };
    const handleLogout = async () => {
        try {
            // Call logout endpoint
            await fetch('http://localhost:8000/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Use the logout function from useAuth
            authLogout();

            // Redirect to login
            router.push('/login');
        } catch (err) {
            console.error('Logout error:', err);
            // Still logout and redirect even if API call fails
            authLogout();
            router.push('/login');
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                    <div className="text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                <div className="text-center mb-6">
                    <div className="text-green-500 text-5xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
                    <p className="text-gray-600">Google authentication successful</p>
                </div>

                {userData && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-center mb-3">
                                {userData.profileImage ? (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                        <span className="text-gray-600 font-bold">
                                            {userData.firstName[0]}{userData.lastName[0]}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                                    <p className="text-sm text-gray-600">{userData.email}</p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <p><strong>Role:</strong> {userData.role}</p>
                                <p><strong>Username:</strong> {userData.username}</p>
                                <p><strong>Account Status:</strong> {userData.isActive ? 'Active' : 'Inactive'}</p>
                                <p><strong>Email Verified:</strong> {userData.isEmailVerified ? 'Yes' : 'No'}</p>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleContinue}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Continue to Dashboard
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}

                {/* Development Debug Info */}
                {process.env.NODE_ENV === 'development' && userData && (
                    <details className="mt-6 text-xs">
                        <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                            Debug Info (Development Only)
                        </summary>
                        <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-auto">
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                        <p className="mt-2 text-gray-600">
                            <strong>Token:</strong> {token?.substring(0, 20)}...
                        </p>
                    </details>
                )}
            </div>
        </div>
    );
}