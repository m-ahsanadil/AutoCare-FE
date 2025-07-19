// "use client"

// import type React from "react"
// import { useAuth } from "@/src/lib/context/auth-provider"
// import { AppSidebar } from "@/components/app-sidebar"
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"
// import { LogOut, User, Settings } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import Image from "next/image"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { user, token, logout, isLoading } = useAuth()
//   const router = useRouter()
//   const [isLoggingOut, setIsLoggingOut] = useState(false)

//   useEffect(() => {
//     if (!isLoading && !user && !token) {
//       router.push("/login")
//     }
//   }, [user, token, isLoading, router])

//   const handleLogout = async () => {
//     if (isLoggingOut) return // Prevent multiple clicks

//     setIsLoggingOut(true)

//     try {
//       await logout()
//       router.push("/login")
//     } catch (error) {
//       console.error('Logout error:', error)
//       // Still redirect to login even if logout fails
//       router.push("/login")
//     } finally {
//       setIsLoggingOut(false)
//     }
//   }

//   // Show loading state while checking auth
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   // Don't render if not authenticated
//   if (!user || !token) {
//     return null
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="flex-1 flex flex-col">
//         <header className="flex items-center justify-between p-4 border-b bg-white">
//           <div className="flex items-center gap-4">
//             <SidebarTrigger />
//             <h1 className="text-xl font-semibold">AutoCare360</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               {user?.profileImage ? (
//                 <Image
//                   src={`${user.profileImage}`}
//                   alt="Profile"
//                   width={32}
//                   height={32}
//                   className="rounded-full object-cover border border-gray-300"
//                 />
//               ) : (
//                 <User className="w-6 h-6 text-gray-500" />
//               )}
//               <span className="text-sm font-medium">{user?.name}</span>
//               <span className="text-xs text-gray-500 capitalize">({user?.role})</span>
//             </div>

//             {/* Logout options dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="sm" disabled={isLoggingOut}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   {isLoggingOut ? "Logging out..." : "Logout"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>
//         <div className="flex-1 p-6 bg-gray-50">{children}</div>
//       </main>
//     </SidebarProvider>
//   )
// }


"use client"
import {  type ReactNode } from "react";
import DashboardLayout from "@/src/components/pages/DashboardLayout"

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}