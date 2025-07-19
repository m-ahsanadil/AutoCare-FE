'use client';
import { useUI } from "@/src/lib/context/UIContext";
import { Bell, Menu, User } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation'


export const Header = () => {
    const pathname = usePathname()
    const { isSidebarOpen, setIsSidebarOpen } = useUI();
    const currentPage = pathname.split("/").pop() || "dashboard"

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            {/* Main Header Row */}
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left Section: Menu + Title */}
                <div className="flex items-center min-w-0 flex-1">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="h-9 hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-slate-600 hover:text-slate-900 p-2"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <h1 className="text-base md:text-lg font-semibold text-slate-900 capitalize truncate">
                        {currentPage
                            .replace(/([A-Z])/g, " $1")
                            .replace(/-/g, " ")
                            .replace(/[-_]/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h1>
                </div>

                {/* Right Section: Action Icons */}
                <div className="flex items-center space-x-1">
                </div>
            </div>
        </header>
    );
}
