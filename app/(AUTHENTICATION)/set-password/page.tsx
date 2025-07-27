'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import { Loader2 } from "lucide-react"
import { useToast } from '@/src/lib/context/toast-context';
import { useSetPasswordMutation } from '@/src/lib/store/services';


export default function SetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    const { showToast } = useToast();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    // RTK Query mutation hook
    const [setPasswordMutation, {
        isLoading,
        isError,
        data,
        error: mutationError,
        isSuccess
    }] = useSetPasswordMutation();

    useEffect(() => {
        if (!id || !token) {
            showToast({ title: 'Error', description: 'Invalid request parameters', type: 'error' });
            router.push('/login?error=invalid_password_reset');
            return;
        }
    }, [id, token, router, showToast]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            showToast({ title: 'Error', description: 'Passwords do not match', type: 'error' });
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            showToast({ title: 'Error', description: 'Password too short', type: 'error' });
            return;
        }

        if (!id || !token) {
            setError('Missing required parameters');
            showToast({ title: 'Error', description: 'Invalid request parameters', type: 'error' });
            return;
        }

        try {
            const res = await setPasswordMutation({
                request: { password, userId: id },
                token
            }).unwrap();

            // const data: SetPasswordResponse = await response.json();
            showToast({
                title: "Success",
                description: res.message,
                type: "success",
            });

            setTimeout(() => {
                const URL = res.data.redirectUrl;
                router.push(URL)
            }, 800);
        } catch (err: any) {
            const message = err?.data?.message || "Something went wrong";
            setError(message);
            showToast({ title: "Error", description: message, type: "error" });
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
                        <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Setting Password..." : "Set Password"}
                        </button>
                    </div>
                </form>

                {/* Development Info */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md text-xs">
                        <p className="mb-2"><strong>User ID:</strong> {id}</p>
                        <div>
                            <p className="mb-1"><strong>Token:</strong></p>
                            <div className="bg-white border rounded p-2 max-w-full overflow-x-auto">
                                <code className="text-xs font-mono whitespace-nowrap">
                                    {token}
                                </code>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}