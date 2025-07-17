"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRegisterMutation } from "../store/services";

interface User {
  username: string;
  email: string;
  role: string;
  profileImage?: File | null;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

type RegisterContextType = {
  user: User | null;

  // Show password states
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;

  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;

  // Toggle function that accepts field type
  togglePasswordVisibility: (field: 'password' | 'confirmPassword') => void;

  isLoading: boolean;
  error: unknown;    
  isSuccess: boolean;

  // Register CRUD
  handleSaveRegister: (registerData: User, onSuccess?: () => void) => void;
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [registerMutation, { error, isSuccess, isLoading }] = useRegisterMutation();
  const [user, setUser] = useState<User | null>(null);

  // General Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle function that handles both password fields
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSaveRegister = async (newUser: User, onSuccess?: () => void) => {
    try {
      console.log("Registering user:", newUser);

      const formData = new FormData();
      formData.append("username", newUser.username);
      formData.append("email", newUser.email);
      formData.append("role", newUser.role);
      formData.append("firstName", newUser.firstName);
      formData.append("lastName", newUser.lastName);
      formData.append("password", newUser.password);
      formData.append("phone", newUser.phone);

      if (newUser.profileImage) {
        formData.append("profileImage", newUser.profileImage);
      }

      const res = await registerMutation(formData).unwrap(); // ✅ Actual call
      if (res.success && onSuccess) {
        onSuccess(); // ✅ Call success callback
      }
      setUser(newUser);
    } catch (error: any) {
      console.log("Registration failed:", error);
    }
  };

  const contextValue: RegisterContextType = {
    user,
    showPassword,
    isLoading,
    error,
    isSuccess,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    togglePasswordVisibility,
    handleSaveRegister,
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export function useRegister() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister must be used within RegisterProvider');
  }
  return context;
}