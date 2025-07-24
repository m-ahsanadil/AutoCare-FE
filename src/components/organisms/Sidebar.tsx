'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/src/lib/context/UIContext";
import { LogOut, UserCheck, User, Stethoscope, Shield, Crown, Wrench, Loader2 } from "lucide-react";
import { Key, useMemo } from "react";
import { useAuth } from "@/src/lib/context/auth-provider";
import { UserRole } from "@/src/enum";
import { getIconComponent } from "@/src/utils/getIconComponent";
import { useDashboardData } from "../hooks/useDashboardData";
import { useToast } from "@/hooks/use-toast";

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
    const pathname = usePathname();
    const { toast } = useToast();
    const { user, logout, isLoggingOut } = useAuth();
    const { isSidebarOpen } = useUI();
    const { menu, isLoading } = useDashboardData()
    const UserRoleIcon = useMemo(() => getRoleIcon(user?.role), [user?.role]);
    const userRoleColor = useMemo(() => getRoleColor(user?.role), [user?.role]);
    const userRole = user?.role?.toLowerCase() || 'user';

    const handleLogout = async () => {
        try {
            await logout();
            toast({
                title: "Logged out successfully",
                description: "You have been signed out.",
            });

        } catch (error) {
            console.error('❌ Sidebar logout error:', error);
            toast({
                title: "Logout failed",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

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

            {/* Logout Button */}
            <div className="mt-auto p-4 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-slate-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoggingOut ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Logging out...
                        </>
                    ) : (
                        <>
                            <LogOut className="w-5 h-5" />
                            Logout
                        </>
                    )}
                </button>

                {/* Optional: User Info */}
                {user && (
                    <div className="mt-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            {user.profileImage ? (
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={user.profileImage}
                                        alt="User Profile"
                                        fill
                                        className="rounded-full object-cover border border-slate-700"
                                    />
                                </div>
                            ) : (
                                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-400" />
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <p className="text-slate-300 truncate font-medium">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
