"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/src/lib/context/auth-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Car, Calendar, DollarSign, UserCog, Package, Wrench, Settings } from "lucide-react"
import { UserRole } from "@/src/enum"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MECHANIC, UserRole.RECEPTIONIST],
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    roles: [UserRole.ADMIN, UserRole.RECEPTIONIST],
  },
  {
    title: "Vehicles",
    url: "/dashboard/vehicles",
    icon: Car,
    roles: [UserRole.ADMIN, UserRole.MECHANIC, UserRole.RECEPTIONIST],
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
    roles: [UserRole.ADMIN, UserRole.MECHANIC, UserRole.RECEPTIONIST],
  },
  {
    title: "Service Records",
    url: "/dashboard/services",
    icon: Wrench,
    roles: [UserRole.ADMIN, UserRole.MECHANIC, UserRole.CUSTOMER],
  },
  {
    title: "Billing & Invoices",
    url: "/dashboard/billing",
    icon: DollarSign,
    roles: [UserRole.ADMIN, UserRole.RECEPTIONIST],
  },
  {
    title: "Staff Management",
    url: "/dashboard/staff",
    icon: UserCog,
    roles: [UserRole.ADMIN],
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
    roles: [UserRole.ADMIN, UserRole.MECHANIC],
  },
]

export function AppSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const filteredMenuItems = menuItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  )
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Car className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-orange-600 rounded-lg">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">AutoCare360</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
