"use client"
import { AuthProvider } from "@/src/lib/context/auth-provider";
import { StoreProvider } from "./StoreProvider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { RegisterProvider } from "../context/RegisterContext";

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <StoreProvider>
            <RegisterProvider>
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
            </RegisterProvider>
        </StoreProvider>
    );
};