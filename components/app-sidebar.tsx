"use client"

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
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Car, Calendar, DollarSign, UserCog, Package, Wrench, Settings } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "mechanic", "receptionist"],
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    roles: ["admin", "receptionist"],
  },
  {
    title: "Vehicles",
    url: "/dashboard/vehicles",
    icon: Car,
    roles: ["admin", "mechanic", "receptionist"],
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
    roles: ["admin", "mechanic", "receptionist"],
  },
  {
    title: "Service Records",
    url: "/dashboard/services",
    icon: Wrench,
    roles: ["admin", "mechanic"],
  },
  {
    title: "Billing & Invoices",
    url: "/dashboard/billing",
    icon: DollarSign,
    roles: ["admin", "receptionist"],
  },
  {
    title: "Staff Management",
    url: "/dashboard/staff",
    icon: UserCog,
    roles: ["admin"],
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
    roles: ["admin", "mechanic"],
  },
]

export function AppSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.role || ""))

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
