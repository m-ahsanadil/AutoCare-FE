'use client';

import { useToast } from '@/hooks/use-toast';
import { Input } from '@/src/components/atoms/Input';
import {  ProfileImageUploader } from '@/src/components/molecules/FileUpload';
import { UserRole, UserRoleValues } from '@/src/enum';
import { useRegister } from '@/src/lib/context/RegisterContext';
import { Loader2 } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

export default function Register() {
    const { toast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the hidden file input

    const { handleSaveRegister, isSuccess, error, isLoading, showPassword, showConfirmPassword, togglePasswordVisibility } = useRegister();

    const [formData, setFormData] = useState({
        profileImage: null as File | null,
        username: '',
        role: 'admin',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);


    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Password mismatch",
                description: "Your password and confirm password do not match.",
            });
            return;
        }

        // Create a copy without confirmPassword field
        const { confirmPassword, ...dataToSend } = formData
        await handleSaveRegister(dataToSend);

    }, [formData, toast, handleSaveRegister]);

    // Handle profile image click
    const handleProfileImageClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profileImage: file,
            }));
        }
    };

    // Default profile image (you can replace this with your own default image)
    const defaultProfileImage = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23e5e7eb'/%3e%3cpath d='M50 30c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15s15-6.716 15-15c0-8.284-6.716-15-15-15zm0 35c-11.046 0-20 8.954-20 20v5h40v-5c0-11.046-8.954-20-20-20z' fill='%239ca3af'/%3e%3c/svg%3e";

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
                        Register
                    </h2>


                    {/* Clickable Profile Image & Profile Image Preview */}
                    <ProfileImageUploader
                        imageFile={formData.profileImage}
                        onImageSelect={(file) =>
                            setFormData((prev) => ({ ...prev, profileImage: file }))
                        }
                    />

                    {/* Two-column layout for names on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    {/* Password fields in two-column layout on larger screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="relative">
                            <Input
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                required
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
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
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
                            value={formData.role}
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