'use client';

import Image from "next/image";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/src/lib/context/auth-provider';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GoogleSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast()
    const { login, user, logout } = useAuth();
    const [error, setError] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');



    useEffect(() => {
        const processAuth = async () => {
            try {
                // Validation
                if (!token || !userParam) {
                    toast({
                        title: "Login Failed",
                        description: "Missing authentication data",
                        variant: "destructive",
                    })
                    throw new Error('Missing authentication data. Please try logging in again.');
                }

                // Parse user data
                const decodedUserData = JSON.parse(decodeURIComponent(userParam));

                // Attempt login
                login(decodedUserData, token);

                toast({
                    title: "Success",
                    description: "Logged in with Google successfully!",
                })

                // Redirect after success
                setTimeout(() => {
                    setIsRedirecting(true);
                    router.push(`/${decodedUserData.role}/dashboard`);
                }, 2000);

            } catch (error) {
                setError('No user data or token received');
                toast({
                    title: "Login Error",
                    description: "Unable to decode user data",
                    variant: "destructive",
                })
                router.push('/login?error=google_auth_failed');
            }
        }
        processAuth();
    }, [searchParams, login, router]);


    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('❌ google success logout error:', error);
            // You could show a toast notification here if needed
        }
    };

    if (!user && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Redirecting...
            </div>
        );
    }


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
                {isRedirecting && (
                    <div className="text-center text-sm text-gray-500 mb-4">
                        Redirecting to dashboard...
                    </div>
                )}

                {user && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-center mb-3">
                                {user.profileImage ? (
                                    <div className="relative w-12 h-12 mr-3">
                                        <Image
                                            src={user.profileImage}
                                            alt="Profile"
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                        <span className="text-gray-600 font-bold">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <p><strong>Role:</strong> {user.role}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Account Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
                                <p><strong>Email Verified:</strong> {user.isEmailVerified ? 'Yes' : 'No'}</p>
                            </div>
                        </div>

                        <div className="flex space-x-3">

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
                {process.env.NODE_ENV === 'development' && user && (
                    <details className="mt-6 text-xs">
                        <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                            Debug Info (Development Only)
                        </summary>
                        <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-auto">
                            {JSON.stringify(user, null, 2)}
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