import { AuthProvider } from "@/components/auth-provider";
import { StoreProvider } from "./StoreProvider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <StoreProvider>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </StoreProvider>
    );
};