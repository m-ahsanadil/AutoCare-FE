'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { UserRole } from '@/src/enum';
import { useAuth } from '@/src/lib/context/auth-provider';
import { Input } from '../../atoms/Input';
import { CameraIcon, ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/src/lib/context/toast-context';
// import { useUploadProfileImageMutation } from '@/src/lib/store/services';
import { ProfileImageUploader } from '../../molecules/FileUpload';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/src/lib/store/services/profile.api';
import { ApiError, isApiError, isAuthError, isServerError, NetworkError } from '@/src/types';
import { Skeleton } from '../../ui/Skeleton';


export default function Profile() {
    const { showToast } = useToast();
    const { data: profile, isLoading } = useGetProfileQuery();
    const [isEditing, setIsEditing] = useState(false);
    const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
    const [image, setImage] = useState<{ file: File | null; preview: string | null }>({
        file: null,
        preview: profile?.profileImage || null,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        role: "",
    });

    useEffect(() => {
        if (!profile) return;

        setFormData(prev => {
            if (
                prev.firstName === profile.firstName &&
                prev.lastName === profile.lastName &&
                prev.username === profile.username &&
                prev.email === profile.email &&
                prev.phone === (profile.phone || "") &&
                prev.role === profile.role
            ) return prev;

            return {
                firstName: profile.firstName,
                lastName: profile.lastName,
                username: profile.username,
                email: profile.email,
                phone: profile.phone || "",
                role: profile.role,
            };
        });

        setImage(prev => ({
            ...prev,
            preview: profile.profileImage || null,
            file: null, // reset file
        }));
    }, [profile]);


    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ file, preview: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleAvatarClick = () => {
        fileInputRef.current?.click();
        if (!isEditing) return;
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
            if (formData.firstName) data.append("firstName", formData.firstName);
            if (formData.lastName) data.append("lastName", formData.lastName);
            if (formData.phone) data.append("phone", formData.phone);
            if (image.file) data.append("profileImage", image.file);

            const updatedProfile = await updateProfile(data).unwrap();

            showToast({
                title: "✅ Profile updated successfully",
                description: `Hi ${updatedProfile.firstName}, your profile was saved.`,
            });

            setIsEditing(false);
        } catch (error: unknown) {
            if (isAuthError(error)) {
                showToast({ title: "Unauthorized", description: "Please login again." });
                // router.push('/login')
            } else if (isServerError(error)) {
                showToast({ title: "Server Error", description: "Try again later." });
            } else if (isApiError(error)) {
                showToast({ title: "Error", description: error.message });
            } else {
                showToast({ title: "Unknown Error", description: "Something went wrong." });
            }
        }
    };

    const isFormDirty = useMemo(() => {
        if (!profile) return false;

        return (
            profile.firstName !== formData.firstName ||
            profile.lastName !== formData.lastName ||
            profile.phone !== formData.phone ||
            image.file !== null // means new image selected
        );
    }, [formData, image.file, profile]);

    const handleCancel = () => {
        if (!profile) return;
        setFormData({
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
            email: profile.email,
            phone: profile.phone || "",
            role: profile.role,
        });
        profile.profileImage || null;
        setImage({
            file: null,
            preview: profile.profileImage || null,
        });
        setIsEditing(false);
    };

    if (!profile) return <div className="text-center py-10">Loading profile...</div>;

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
                <Skeleton className="w-24 h-24 rounded-full" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                {/* repeat skeletons for each input field */}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white p-6 shadow rounded-lg space-y-6">
                {/* Header Section with Avatar */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* <div className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group" onClick={handleAvatarClick}> */}
                        <div
                            className={`relative w-24 h-24 rounded-full overflow-hidden group ${isEditing ? 'cursor-pointer' : 'cursor-default'
                                }`}
                            onClick={handleAvatarClick}
                        >
                            {image.preview ? (
                                <Image
                                    src={image.preview || "/default-avatar.png"}
                                    alt="Profile"
                                    fill
                                    loading="lazy"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center bg-gray-200 w-full h-full text-gray-500">
                                    <ImageIcon className="w-10 h-10" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                                <CameraIcon className="w-6 h-6 text-white" />
                            </div>

                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                ref={fileInputRef}
                                className="hidden"
                                disabled={!isEditing}
                                onChange={handleProfileImageChange}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {profile.firstName} {profile.lastName}
                            </h2>
                            <p className="text-sm text-gray-500 capitalize">{profile.role.replace('_', ' ')}</p>
                            <div className="flex gap-2 mt-1">
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${profile.isEmailVerified
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {profile.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                                </span>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${profile.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {profile.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editable Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                    />
                    <Input
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={() => { }}
                        disabled
                    />
                </div>

                {/* Non-editable Meta Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Created At</label>
                        <p className="text-gray-700 text-sm mt-1">
                            {new Date(profile.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Updated At</label>
                        <p className="text-gray-700 text-sm mt-1">
                            {new Date(profile.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                    {isEditing ? (
                        <>
                            <button
                                disabled={updateProfileLoading || !isFormDirty}
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {updateProfileLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                            <button
                                className="border border-gray-400 text-gray-800 px-4 py-2 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-gray-800 text-white px-4 py-2 rounded"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
}
