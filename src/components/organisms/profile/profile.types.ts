import { UserRole } from "@/src/enum";

export interface Profile {
    _id: string;
    email: string
    name: string
    role: UserRole
    profileImage?: string
    createdAt: string
    firstName: string
    isActive: boolean
    isEmailVerified: boolean
    lastName: string
    phone?: string
    updatedAt: string
    username: string
    __v?: number;
}

export interface ProfileResponse {
    success: boolean;
    message: string;
    data: Profile;
    timestamp: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: File; // FormData
}