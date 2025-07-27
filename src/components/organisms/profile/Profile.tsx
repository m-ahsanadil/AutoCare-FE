'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { UserRole } from '@/src/enum';
import { useAuth } from '@/src/lib/context/auth-provider';
import { Input } from '../../atoms/Input';
import { CameraIcon, ImageIcon, Loader2 } from 'lucide-react';

interface UserData {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    profileImage?: string;
    extraDetails?: Record<string, string>;
}

const mockUser: UserData = {
    name: 'Faizan Adil',
    email: 'faizan@example.com',
    phone: '+92 312 2713867',
    role: UserRole.MECHANIC,
    profileImage: '', // fallback image
    extraDetails: {
        experience: '5 years',
        specialization: 'Engine Repair',
    },
};

export default function Profile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(user?.profileImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || UserRole.CUSTOMER,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Optional: Upload file to server immediately here
            // Or keep it for saving later
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch("http://localhost:8000/api/v1/upload", {
            method: "POST",
            body: formData,
        });
        return res.json(); // return image URL
    };


    const handleSave = async () => {
        try {
            setIsSaving(true);
            setTimeout(() => {
                setIsSaving(false);
                setIsEditing(false);
            }, 2000);
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleCancel = () => {
        if (!user) return;
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone || "",
            role: user.role,
        });
        setIsEditing(false);
    };

    if (!user) return <div className="text-center py-10">Loading profile...</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white p-6 shadow rounded-lg space-y-6">
                {/* Header Section with Avatar */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group" onClick={handleAvatarClick}>
                            {previewImage ? (
                                <Image
                                    src={previewImage}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center bg-gray-200 w-full h-full text-gray-500">
                                    <ImageIcon className="w-10 h-10" />
                                </div>
                            )}

                            {/* Hover Overlay (optional) */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                                <CameraIcon className="w-6 h-6 text-white" />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleProfileImageChange}
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-sm text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                            <div className="flex gap-2 mt-1">
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${user.isEmailVerified
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {user.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                                </span>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {user.isActive ? 'Active' : 'Inactive'}
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
                            {new Date(user.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Updated At</label>
                        <p className="text-gray-700 text-sm mt-1">
                            {new Date(user.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                    {isEditing ? (
                        <>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {isSaving ? (
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
        </div>
    );
}
