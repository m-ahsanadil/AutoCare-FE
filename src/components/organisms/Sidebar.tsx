'use client';
import { useUI } from "@/src/lib/context/UIContext";
import { LogOut, UserCheck, User, Stethoscope, Shield, Crown, Wrench } from "lucide-react";
import Link from "next/link";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useMemo } from "react";
import { useAuth } from "@/src/lib/context/auth-provider";
import { UserRole } from "@/src/enum";
import { getIconComponent } from "@/src/utils/getIconComponent";
import { useDashboardData } from "../hooks/useDashboardData";
import { usePathname } from "next/navigation";
import { UrlObject } from "url";

export const getRoleColor = (role?: string) => {
    switch (role) {
        case UserRole.SUPER_ADMIN:
            return "text-purple-600 bg-purple-100";
        case UserRole.ADMIN:
            return "text-red-600 bg-red-100";
        case UserRole.MECHANIC:
            return "text-yellow-600 bg-yellow-100";
        case UserRole.RECEPTIONIST:
            return "text-green-600 bg-green-100";
        case UserRole.CUSTOMER:
            return "text-blue-600 bg-blue-100";
        default:
            return "text-gray-600 bg-gray-100";
    }
};

export const getRoleIcon = (role?: string) => {
    switch (role) {
        case UserRole.SUPER_ADMIN:
            return Crown;
        case UserRole.ADMIN:
            return Shield;
        case UserRole.MECHANIC:
            return Wrench;
        case UserRole.RECEPTIONIST:
            return UserCheck;
        case UserRole.CUSTOMER:
            return Stethoscope;
        default:
            return User;
    }
};

export const Sidebar = () => {
    const { user } = useAuth()
    const { isSidebarOpen } = useUI();
    const pathname = usePathname();
    const { menu, isLoading } = useDashboardData()
    const UserRoleIcon = useMemo(() => getRoleIcon(user?.role), [user?.role]);
    const userRoleColor = useMemo(() => getRoleColor(user?.role), [user?.role]);
    const userRole = user?.role?.toLowerCase() || 'user';

    let menuContent;

    if (isLoading) {
        // const Loading = "animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite]"
        menuContent = (
            <>
                {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index} className={`flex items-center gap-2 min-w-0 `}>
                        <div className="w-5 h-5 bg-slate-700 rounded shrink-0" />
                        <div className="h-4 bg-slate-700 rounded w-full max-w-[150px]" />
                    </li>

                ))}
            </>
        );
    } else {
        menuContent = (
            <>
                {menu.map((item: { icon: string; path: string; label: string }, index: Key | null | undefined) => {
                    const Icon = getIconComponent(item.icon); // dynamically get icon component
                    const rolePath = `/${userRole}${item.path}`;
                    const isActive = pathname === item.path;
                    return (
                        <li key={index}>
                            <Link
                                href={rolePath}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 ${isActive ? "bg-slate-700 text-white" : "text-gray-300 hover:text-white hover:bg-slate-700"}`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </>
        );
    }

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-700 transition-transform duration-300 z-40 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold text-white">AutoCare360</h1>
                <p className="text-sm text-slate-400">Vehicle Management</p>

                {/* Role Badge */}
                {user?.role && (
                    <div className="mt-3">
                        <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${userRoleColor}`}
                        >
                            <UserRoleIcon className="w-3 h-3 mr-1" />
                            {user.role.toUpperCase()}
                        </div>
                    </div>
                )}
            </div>

            <nav className="flex-1 scrollbar-blue overflow-y-auto p-4">
                <ul className="space-y-2">
                    {menuContent}
                </ul>
            </nav>

            <div className="mt-auto p-4">
                <button className="flex items-center gap-2 text-red-400 hover:text-red-600">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
