"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Car, Users, Calendar, DollarSign, Wrench, TrendingUp, Clock } from "lucide-react"

const monthlyRevenue = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

const frequentRepairs = [
  { service: "Oil Change", count: 145, color: "#3b82f6" },
  { service: "Brake Repair", count: 89, color: "#ef4444" },
  { service: "Tire Service", count: 76, color: "#f59e0b" },
  { service: "Engine Repair", count: 54, color: "#10b981" },
  { service: "AC Service", count: 43, color: "#8b5cf6" },
]

const upcomingAppointments = [
  {
    id: 1,
    customer: "John Smith",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    time: "9:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    vehicle: "2019 Toyota Camry",
    service: "Brake Inspection",
    time: "10:30 AM",
    status: "pending",
  },
  {
    id: 3,
    customer: "Mike Davis",
    vehicle: "2021 Ford F-150",
    service: "Engine Diagnostic",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: 4,
    customer: "Lisa Wilson",
    vehicle: "2018 BMW X3",
    service: "AC Repair",
    time: "3:30 PM",
    status: "confirmed",
  },
]

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         <div className="text-sm text-gray-500">
//           {new Date().toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
//             <Car className="h-4 w-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,247</div>
//             <p className="text-xs text-muted-foreground">
//               <span className="text-green-600">+12%</span> from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$67,000</div>
//             <p className="text-xs text-muted-foreground">
//               <span className="text-green-600">+8%</span> from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
//             <Calendar className="h-4 w-4 text-orange-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">24</div>
//             <p className="text-xs text-muted-foreground">
//               <span className="text-orange-600">4 pending</span> confirmations
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
//             <Users className="h-4 w-4 text-purple-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">892</div>
//             <p className="text-xs text-muted-foreground">
//               <span className="text-green-600">+5%</span> from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Monthly Revenue Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <TrendingUp className="h-5 w-5 text-green-600" />
//               Monthly Revenue Trend
//             </CardTitle>
//             <CardDescription>Revenue performance over the last 6 months</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 revenue: {
//                   label: "Revenue",
//                   color: "hsl(var(--chart-1))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={monthlyRevenue}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         {/* Most Frequent Repairs */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Wrench className="h-5 w-5 text-blue-600" />
//               Most Frequent Repairs
//             </CardTitle>
//             <CardDescription>Top 5 services performed this month</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ChartContainer
//               config={{
//                 count: {
//                   label: "Count",
//                   color: "hsl(var(--chart-2))",
//                 },
//               }}
//               className="h-[300px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={frequentRepairs}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="count"
//                     label={({ service, count }) => `${service}: ${count}`}
//                   >
//                     {frequentRepairs.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Today's Appointments */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Clock className="h-5 w-5 text-orange-600" />
//             Today's Appointments
//           </CardTitle>
//           <CardDescription>Scheduled appointments for today</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {upcomingAppointments.map((appointment) => (
//               <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div className="flex items-center gap-4">
//                   <div className="w-2 h-2 rounded-full bg-blue-600"></div>
//                   <div>
//                     <p className="font-medium">{appointment.customer}</p>
//                     <p className="text-sm text-gray-600">{appointment.vehicle}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="text-right">
//                     <p className="font-medium">{appointment.service}</p>
//                     <p className="text-sm text-gray-600">{appointment.time}</p>
//                   </div>
//                   <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
//                     {appointment.status}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 pt-4 border-t">
//             <Button className="w-full">View All Appointments</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <Users className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <p className="font-medium">Add New Customer</p>
//               <p className="text-sm text-gray-600">Register a new customer</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <Calendar className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <p className="font-medium">Schedule Appointment</p>
//               <p className="text-sm text-gray-600">Book a new service</p>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//               <Car className="w-5 h-5 text-orange-600" />
//             </div>
//             <div>
//               <p className="font-medium">Add Vehicle</p>
//               <p className="text-sm text-gray-600">Register a new vehicle</p>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }


import { useAuth } from "@/src/lib/context/auth-provider";
import DashboardTemplate from "@/src/components/templates/DashboardTemplate";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return;

  return <DashboardTemplate role={user?.role} />;
}