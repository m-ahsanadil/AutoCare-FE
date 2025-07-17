'use client';

import { useToast } from '@/hooks/use-toast';
import { Input } from '@/src/components/atoms/Input';
import { ProfileImageUploader } from '@/src/components/molecules/FileUpload';
import { UserRole, UserRoleValues } from '@/src/enum';
import { useRegister } from '@/src/lib/context/RegisterContext';
import { Loader2 } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FormikHelpers, getIn, useFormik } from "formik"
import { registerSchema } from '@/src/validation/schemas';


interface RegisterFormValues {
    profileImage: File | null;
    username: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

const initialRegisterValues: RegisterFormValues = {
    profileImage: null as File | null,
    username: '',
    role: UserRole.CUSTOMER,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
}

export default function Register() {
    const { toast } = useToast()

    const { handleSaveRegister, isSuccess, error, isLoading, showPassword, showConfirmPassword, togglePasswordVisibility } = useRegister();

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Registration successful!",
                description: "You have been registered successfully.",
            });
        }
        if (error) {
            const errMessage = (error as any)?.data?.message || "Registration failed.";
            toast({ title: "Error", description: errMessage, variant: "destructive" });
        }
    }, [isSuccess, error]);

    const handleRegisterForm = useCallback(async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
        try {
            // Create a copy without confirmPassword field
            const { confirmPassword, ...dataToSend } = values
            await handleSaveRegister(dataToSend)
            actions.resetForm();
            actions.setSubmitting(false);
        } catch (error) {
            actions.setSubmitting(false);
            toast({
                title: "Error",
                description: "An error occurred while processing your request.",
                variant: "destructive",
            });
        }
    }, [toast, handleSaveRegister])

    const formik = useFormik({
        initialValues: initialRegisterValues,
        validationSchema: registerSchema,
        onSubmit: handleRegisterForm,
    });

    const handleImageSelect = (file: File) => {
        formik.setFieldValue('profileImage', file);
    };

    // Function to get field error
    const getFieldError = (fieldName: string) => {
        const touched = getIn(formik.touched, fieldName);
        const error = getIn(formik.errors, fieldName);
        return touched && error ? error : null;
    };

    const { touched, errors, values, handleBlur, handleChange, handleReset, handleSubmit } = formik;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
                        Register
                    </h2>

                    {/* Clickable Profile Image & Profile Image Preview */}
                    <ProfileImageUploader
                        imageUrl={
                            values.profileImage ? URL.createObjectURL(values.profileImage) : undefined
                        }
                        onImageSelect={handleImageSelect}
                    />

                    {/* Two-column layout for names on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={getFieldError("firstName")}
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={getFieldError("lastName")}
                        />
                    </div>
                    <Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={getFieldError("email")}
                    />
                    <Input
                        label="Username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={getFieldError("username")}
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={getFieldError("phone")}
                    />
                    {/* Password fields in two-column layout on larger screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="relative">
                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={getFieldError("password")}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('password')}
                                className="absolute right-3 top-8 sm:top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>

                        <div className="relative">
                            <Input
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={getFieldError("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute right-3 top-8 sm:top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="w-full">
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                            required
                        >
                            {UserRoleValues.filter(role =>
                                role !== UserRole.ADMIN &&
                                role !== UserRole.SUPER_ADMIN &&
                                role !== UserRole.RECEPTIONIST
                            ).map((role) => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                                </option>
                            ))}
                            {getFieldError('role') && (
                                <p className="text-red-500 text-sm">{getFieldError('role')}</p>
                            )}
                        </select>

                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2 sm:py-3 px-4 rounded-md transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}