"use client"

import type React from "react"
import { FormikHelpers, useFormik } from 'formik'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Car, Wrench } from "lucide-react"
import { loginSchema } from "@/src/validation/schemas"
import { useLoginMutation } from "@/src/lib/store/services"
import { useToast } from "@/hooks/use-toast"
import { UserRole } from "@/src/enum"
import { BASE_URL } from "@/src/dotenv"


interface LoginFormValues {
  email: string
  password: string
}

const initialValues: LoginFormValues = {
  email: '',
  password: ''
}

const demoUsers = {
  "admin@autocare360.com": {
    role: UserRole.ADMIN,
    name: "John Admin",
  },
  "mechanic@autocare360.com": {
    role: UserRole.MECHANIC,
    name: "Mike Mechanic",
  },
  "receptionist@autocare360.com": {
    role: UserRole.RECEPTIONIST,
    name: "Sarah Reception",
  },
};


export default function LoginPage() {

  const router = useRouter()
  const [login] = useLoginMutation()
  const { toast } = useToast()
  const { login: authLogin } = useAuth();
  const [loading, setLoading] = useState(false)
  const [serverErrorMessage, setServerErrorMessage] = useState('')
  const [serverSuccessMessage, setServerSuccessMessage] = useState('')
  const [isNavigating, setIsNavigating] = useState<boolean>(false)
  const searchParams = useSearchParams();


  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        router.push('/dashboard')
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isNavigating, router])

  useEffect(() => {
    const error = searchParams.get('error');

    if (error) {
      let message = 'An error occurred during login.';

      switch (error) {
        case 'google_auth_failed':
          message = 'Google login failed. Please try again.';
          break;
        case 'token_expired':
          message = 'Your session has expired. Please login again.';
          break;
        // Add more cases as needed
      }

      toast({
        title: 'Login Error',
        description: message,
        variant: 'destructive',
      });

      // ✅ Clean the URL after showing the error
      const cleanUrl = window.location.origin + '/login';
      window.history.replaceState(null, '', cleanUrl);
    }
  }, [searchParams, toast, router]);

  const handleLogin = async (values: LoginFormValues, action: FormikHelpers<LoginFormValues>) => {
    setLoading(true)

    // ✅ Check for demo login first
    if (values.email in demoUsers && values.password === "password123") {
      const user = demoUsers[values.email as keyof typeof demoUsers];
      setServerErrorMessage('');
      toast({
        title: "Login Successful",
        description: "You are logged in as a demo user.",
      })
      setServerSuccessMessage("Logged in with demo account successfully.");
      action.resetForm();
      setLoading(false);
      setIsNavigating(true);
      return;
    }

    // 👇 If not demo, proceed with real API login
    const response = await login(values)

    try {
      if (response.data && response.data.success === true) {
        const userData = response.data.data.user;
        const userToken = response.data.data.token;

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

        setServerErrorMessage('')
        setServerSuccessMessage(response.data.message)
        toast({
          title: "Login Successful",
          description: response.data.message || "Welcome back!",
        })
        action.resetForm()
        setLoading(false)
        setIsNavigating(true)
      } else {
        if (response.error && 'data' in response.error) {
          setServerErrorMessage(
            (response.error.data as { message?: string })?.message || 'An error occurred'
          );
          toast({
            title: "Login Failed",
            description: (response.error.data as { message?: string })?.message || "An unexpected error occurred.",
            variant: "destructive"
          })
        } else {
          setServerErrorMessage('An unexpected error occurred');
        }
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }

  }

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleLogin
  })


  const openGooglePopup = () => {
    window.location.href = `${BASE_URL}/api/v1/auth/google`;
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
          {serverErrorMessage && (
            <p className='mb-4 text-sm text-red-800 bg-red-100 p-3 text-center rounded-md border border-red-200'>
              {serverErrorMessage}
            </p>
          )}
          {serverSuccessMessage && (
            <p className='mb-4 text-sm text-green-800 bg-green-100 p-3 rounded-md border border-green-200'>
              {serverSuccessMessage}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type='email'
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type='password'
                id='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className='text-sm text-red-500'>{errors.password}</p>
              )}
            </div>
            <Button
              title='Login'
              disabled={loading}
              type='submit'
              className={`${loading ? 'cursor-not-allowed' : ''} w-full`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <Button
            className="mt-4 w-full bg-white text-black border border-gray-300 flex items-center justify-center gap-2"
            onClick={openGooglePopup}>
            {/* <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            /> */}
            Continue with Google
          </Button>

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
