"use client"
import { ReactNode, useEffect } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Header } from "../organisms/Header";
import { useUI } from "@/src/lib/context/UIContext";

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const { isSidebarOpen, setIsSidebarOpen } = useUI();

    return (
        <div className="min-h-screen flex bg-gray-100">
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
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
