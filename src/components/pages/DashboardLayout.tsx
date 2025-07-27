"use client"
import { ReactNode, useEffect } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Header } from "../organisms/Header";
import { useUI } from "@/src/lib/context/UIContext";
import { UserRole } from "@/src/enum";
import { useAuth } from "@/src/lib/context/auth-provider";

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const { isSidebarOpen, setIsSidebarOpen } = useUI();
    const { user } = useAuth();

    // Get role-specific styling
    const getRoleStyles = (role?: UserRole) => {
        switch (role) {
            case UserRole.SUPER_ADMIN:
                return {
                    bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
                    accentColor: "border-purple-200 dark:border-purple-700"
                };
            case UserRole.ADMIN:
                return {
                    bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                    accentColor: "border-blue-200 dark:border-blue-700"
                };
            case UserRole.MECHANIC:
                return {
                    bgGradient: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
                    accentColor: "border-orange-200 dark:border-orange-700"
                };
            case UserRole.RECEPTIONIST:
                return {
                    bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
                    accentColor: "border-green-200 dark:border-green-700"
                };
            case UserRole.CUSTOMER:
                return {
                    bgGradient: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20",
                    accentColor: "border-slate-200 dark:border-slate-700"
                };
            default:
                return {
                    bgGradient: "bg-gray-100 dark:bg-gray-900",
                    accentColor: "border-gray-200 dark:border-gray-700"
                };
        }
    };

    const roleStyles = getRoleStyles(user?.role);


    return (
        <div className={`min-h-screen flex ${roleStyles.bgGradient}`}>
            <Sidebar />

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            <div
                className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}
            >
                {/* Header */}
                <Header />

                {/* Main Content */}
                {/* <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main> */}
                <main className={`flex-1 p-4 lg:p-6 overflow-y-auto border-t ${roleStyles.accentColor}`}>
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
