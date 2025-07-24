// "use client"

// import type React from "react"
// import { FormikHelpers, useFormik } from 'formik'
// import { useEffect, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { useAuth } from "@/src/lib/context/auth-provider"
// import { Car, Wrench, Cloud, Map, Play, Loader2, } from "lucide-react"
// import { loginSchema } from "@/src/validation/schemas"
// import { useLoginMutation } from "@/src/lib/store/services"
// import { useToast } from "@/hooks/use-toast"
// import { BASE_URL } from "@/src/dotenv"
// import { FaGoogle } from "react-icons/fa";
// import { Input } from "@/src/components/atoms/Input"
// import { getFieldError } from "@/src/utils/formikHelpers"


// interface LoginFormValues {
//   usernameOrEmail: string
//   password: string
// }

// const initialValues: LoginFormValues = {
//   usernameOrEmail: '',
//   password: ''
// }

// export default function LoginPage() {

//   const router = useRouter()
//   const [login] = useLoginMutation()
//   const { toast } = useToast()
//   const { login: authLogin } = useAuth();
//   const [loading, setLoading] = useState(false)
//   const [serverErrorMessage, setServerErrorMessage] = useState('')
//   const [serverSuccessMessage, setServerSuccessMessage] = useState('')
//   const [isNavigating, setIsNavigating] = useState<boolean>(false)
//   const searchParams = useSearchParams();
//   const { user } = useAuth()

//   useEffect(() => {
//     if (isNavigating) {
//       const role = user?.role
//       const timer = setTimeout(() => {
//         router.push(`${role}/dashboard`)
//       }, 1000)

//       return () => clearTimeout(timer)
//     }
//   }, [isNavigating, router])

//   useEffect(() => {
//     const error = searchParams.get('error');

//     if (error) {
//       let message = 'An error occurred during login.';

//       switch (error) {
//         case 'google_auth_failed':
//           message = 'Google login failed. Please try again.';
//           break;
//         case 'token_expired':
//           message = 'Your session has expired. Please login again.';
//           break;
//         // Add more cases as needed
//       }

//       toast({
//         title: 'Login Error',
//         description: message,
//         variant: 'destructive',
//       });

//       // ✅ Clean the URL after showing the error
//       const cleanUrl = window.location.origin + '/login';
//       window.history.replaceState(null, '', cleanUrl);
//     }
//   }, [searchParams, toast, router]);

//   const handleLogin = async (values: LoginFormValues, action: FormikHelpers<LoginFormValues>) => {
//     setLoading(true)

//     // 👇 If not demo, proceed with real API login
//     const response = await login(values)

//     try {
//       if (response.data && response.data.success === true) {
//         const userData = response.data.data.user;
//         const userToken = response.data.data.token;

//         // Save to auth context
//         authLogin({
//           id: userData._id,
//           email: userData.email,
//           name: `${userData.firstName} ${userData.lastName}`,
//           role: userData.role,
//           profileImage: userData.profileImage,
//           createdAt: userData.createdAt,
//           firstName: userData.firstName,
//           isActive: userData.isActive,
//           isEmailVerified: userData.isEmailVerified,
//           lastName: userData.lastName,
//           phone: userData.phone,
//           updatedAt: userData.updatedAt,
//           username: userData.username
//         }, userToken);

//         setServerErrorMessage('')
//         setServerSuccessMessage(response.data.message)
//         toast({
//           title: "Login Successful",
//           description: response.data.message || "Welcome back!",
//         })
//         action.resetForm()
//         setLoading(false)
//         setIsNavigating(true)
//       } else {
//         if (response.error && 'data' in response.error) {
//           setServerErrorMessage(
//             (response.error.data as { message?: string })?.message || 'An error occurred'
//           );
//           toast({
//             title: "Login Failed",
//             description: (response.error.data as { message?: string })?.message || "An unexpected error occurred.",
//             variant: "destructive"
//           })
//         } else {
//           setServerErrorMessage('An unexpected error occurred');
//         }
//       }
//     } catch (error) {
//       console.error(error)
//       setLoading(false)
//     } finally {
//       setLoading(false)
//     }

//   }

//   const formik = useFormik({
//     initialValues,
//     validationSchema: loginSchema,
//     onSubmit: handleLogin
//   })


//   const openGooglePopup = () => {
//     window.location.href = `${BASE_URL}/api/v1/auth/google`;
//   }

//   const { handleBlur, handleChange, errors, handleSubmit, values, touched } = formik
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
//               <Car className="w-6 h-6 text-white" />
//             </div>
//             <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">
//               <Wrench className="w-6 h-6 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold text-gray-900">AutoCare360</CardTitle>
//           <CardDescription>Vehicle Service Management System</CardDescription>
//           {serverErrorMessage && (
//             <p className='mb-4 text-sm text-red-800 bg-red-100 p-3 text-center rounded-md border border-red-200'>
//               {serverErrorMessage}
//             </p>
//           )}
//           {serverSuccessMessage && (
//             <p className='mb-4 text-sm text-green-800 bg-green-100 p-3 rounded-md border border-green-200'>
//               {serverSuccessMessage}
//             </p>
//           )}
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* ✅ Proper usage of Input component with getFieldError */}
//             <Input
//               label="Username or Email"
//               name="usernameOrEmail"
//               type="text"
//               value={values.usernameOrEmail}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter your username or email"
//               required
//               error={getFieldError(touched, errors, 'usernameOrEmail')}
//             />

//             <Input
//               label="Password"
//               name="password"
//               type="password"
//               value={values.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter your password"
//               required
//               error={getFieldError(touched, errors, 'password')}
//             />

//             <Button
//               disabled={loading}
//               type="submit"
//               className={`flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2 sm:py-3 px-4 rounded-md transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'cursor-not-allowed' : ''} w-full`}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </Button>
//           </form>

//           <Button
//             className="mt-4 w-full bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
//             onClick={openGooglePopup}
//             type="button"
//             disabled={loading}
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24">
//               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//             </svg>
//             {/* <FaGoogle className="w-5 h-5"/> */}
//             Continue with Google
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorAlert } from '@/src/components/molecules/ErrorAlert';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error]);



  const handleGoogleLogin = () => {
    // Redirect to your backend Google auth endpoint
    window.location.href = 'http://localhost:8000/api/v1/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {showAlert && error && (
          <ErrorAlert
            error={error}
            onDismiss={() => setShowAlert(false)}
          />
        )}

        <div className="space-y-6">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

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
    </div>
  );
}