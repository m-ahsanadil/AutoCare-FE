import type React from "react"
import { ReactNode } from "react";
import { useAuth } from "@/src/lib/context/auth-provider";
import { NotAuthorizedPage } from "../pages/NotAuthorizedPage";


interface RoleProtectedProps {
    allowedRoles: string[];
    children: ReactNode;
    fallback?: ReactNode
}

const RoleProtected: React.FC<RoleProtectedProps> = ({ allowedRoles, children, fallback = <NotAuthorizedPage /> }) => {
    const { user } = useAuth();

    if (!user || !allowedRoles.includes(user.role)) {
        return <>{fallback}</>
    }

    return <>{children}</>;
};

export default RoleProtected;
