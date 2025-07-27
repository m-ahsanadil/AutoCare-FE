import { useToast } from '@/src/lib/context/toast-context';
import { Car, Wrench } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ErrorAlert } from '../../molecules/ErrorAlert';
import { useAuth } from '@/src/lib/context/auth-provider';
import { FormikHelpers, useFormik } from 'formik';
import { loginSchema } from '@/src/validation/schemas';
import { BASE_URL } from '@/src/dotenv';
import { useLoginMutation } from '@/src/lib/store/services';
import { Input } from '../../atoms/Input'; 
import { getFieldError } from '@/src/utils/formikHelpers';

interface LoginFormValues {
    usernameOrEmail: string
    password: string
}

const initialValues: LoginFormValues = {
    usernameOrEmail: '',
    password: ''
}

export const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [isNavigating, setIsNavigating] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState(false);
    const { showToast } = useToast();
    const { user, login: authLogin } = useAuth()
    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        }
    }, [error]);

    useEffect(() => {
        if (isNavigating && user) {
            const role = user?.role
            const timer = setTimeout(() => {
                router.push(`${role}/dashboard`)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [isNavigating, router, user])

    const handleLogin = async (values: LoginFormValues, action: FormikHelpers<LoginFormValues>) => {
        try {
            const res = await login(values).unwrap();
            if (res.data && res.success === true) {
                const userData = res.data.user
                const userToken = res.data.token;

                // Save to auth context
                authLogin({
                    id: userData._id,
                    email: userData.email,
                    name: `${userData.firstName} ${userData.lastName}`,
                    role: userData.role,
                    profileImage: userData.profileImage,
                    createdAt: userData.createdAt,
                    firstName: userData.firstName,
                    isActive: userData.isActive,
                    isEmailVerified: userData.isEmailVerified,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    updatedAt: userData.updatedAt,
                    username: userData.username
                }, userToken);

                action.resetForm()
                setIsNavigating(true)
                showToast({
                    title: 'Login Successful!',
                    description: 'Welcome back, you have been successfully logged in.',
                    type: 'success'
                });
            }
        } catch (error: any) {
            if (error?.data?.message) {
                showToast({
                    title: 'Login Failed',
                    description: error.data.message,
                    type: 'error'
                });
            } else {
                showToast({
                    title: 'Login Failed',
                    description: 'An unexpected error occurred. Please try again.',
                    type: 'error'
                });
            }
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: handleLogin
    })

    const handleGoogleLogin = () => {
        window.location.href = `${BASE_URL}/api/v1/auth/google`;
    }

    const { handleBlur, handleChange, errors, handleSubmit, values, touched } = formik

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
                <div className='text-center mb-8'>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">
                            <Wrench className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Autocare360</h1>
                    <p className="text-gray-600">Vehicle Service Management System</p>

                    {showAlert && error && (
                        <div className="mt-4">
                            <ErrorAlert
                                error={error}
                                onDismiss={() => setShowAlert(false)}
                            />
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Username or Email"
                        name="usernameOrEmail"
                        type="text"
                        value={values.usernameOrEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your username or email"
                        error={getFieldError(touched, errors, 'usernameOrEmail')}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        error={getFieldError(touched, errors, 'password')}
                        required
                        disabled={isLoading}
                    />

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading || isNavigating}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading || isNavigating ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {isNavigating ? 'Redirecting...' : 'Signing In...'}
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading || isNavigating}
                            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => router.push('/register')}
                            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition-colors duration-200"
                        >
                            Sign up
                        </button>
                    </p>
                </div>

                {/* Test Buttons (for development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Test OAuth Scenarios</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => window.open('http://localhost:8000/api/v1/auth/test-google-callback?scenario=no_user', '_self')}
                                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                            >
                                Test: No User Found (!user condition)
                            </button>

                            <button
                                onClick={() => window.open('http://localhost:8000/api/v1/auth/test-google-callback?scenario=error', '_self')}
                                className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
                            >
                                Test: Catch Block (error scenario)
                            </button>

                            <button
                                onClick={() => window.open('http://localhost:8000/api/v1/auth/test-google-callback?scenario=no_password', '_self')}
                                className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
                            >
                                Test: No Password (redirect to set-password)
                            </button>

                            <button
                                onClick={() => window.open('http://localhost:8000/api/v1/auth/test-google-callback?scenario=success', '_self')}
                                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                            >
                                Test: Success Flow
                            </button>
                            <button
                                onClick={() => router.push('/login?error=invalid_password_reset')}
                                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm"
                            >
                                Test: Invalid Password Reset
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}