import { getIconComponent } from "@/src/utils/getIconComponent";
import { StatsCard } from "../../atoms/StatsCard";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useState } from "react";
import { Bell, Settings, BarChart3, PieChart, Users, Calendar, Car } from "lucide-react";
import { Appointment, AppointmentCard } from "../../atoms/AppointmentCard";
import { ActivityItem } from "../../atoms/ActivityItem";

const recentAppointments: Appointment[] = [
  { id: 1, customer: "John Smith", vehicle: "Toyota Camry 2020", service: "Oil Change", time: "09:00 AM", status: "in-progress" },
  { id: 2, customer: "Sarah Johnson", vehicle: "Honda Civic 2019", service: "Brake Inspection", time: "10:30 AM", status: "scheduled" },
  { id: 3, customer: "Mike Wilson", vehicle: "Ford F-150 2021", service: "Tire Rotation", time: "11:15 AM", status: "completed" },
  { id: 4, customer: "Emily Davis", vehicle: "BMW X5 2022", service: "Engine Diagnostic", time: "02:00 PM", status: "scheduled" },
];

const recentActivity: ActivityItem[] = [
  { id: 1, action: "New customer registration", user: "Alice Cooper", time: "5 min ago", type: "user" },
  { id: 2, action: "Service completed", user: "Mechanic #3", time: "12 min ago", type: "service" },
  { id: 3, action: "Payment received", user: "System", time: "18 min ago", type: "payment" },
  { id: 4, action: "Appointment scheduled", user: "Bob Manager", time: "25 min ago", type: "appointment" },
];


export default function AdminDashboard() {
  const { dashboard, isLoading: dashboardLoading, stats, isError } = useDashboardData()
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 dark:bg-slate-900 p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-slate-700 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="w-full bg-gray-50 rounded-lg dark:bg-slate-900 p-6">
    //   <div className="overflow-x-auto scrollbar-custom scrollbar-slate">
    //     <div className="flex space-x-6 pb-4 w-max">
    //       {stats.map((stat, index) => (
    //         <div key={index} className="w-72 flex-shrink-0">
    // <StatsCard
    //   title={stat.title}
    //   value={stat.value}
    //   icon={getIconComponent(stat.icon)}
    //   iconColor={stat.iconColor}
    //   iconBgColor={stat.iconBgColor}
    // />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="dark:bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              AutoCare360 Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening at your service center.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <div className="overflow-x-auto scrollbar-custom scrollbar-slate">
          <div className="flex space-x-6 pb-4 w-max">
            {stats.map((stat, index) => (
              <div key={index} className="w-72 flex-shrink-0">
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  icon={getIconComponent(stat.icon)}
                  iconColor={stat.iconColor}
                  iconBgColor={stat.iconBgColor}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Today's Appointments */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Appointments
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Overview
              </h2>
              <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Revenue chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Distribution Chart Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Service Distribution
              </h2>
              <PieChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Service distribution chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-30 transition-colors">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Add Customer</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 dark:hover:bg-opacity-30 transition-colors">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
              <span className="text-sm font-medium text-green-900 dark:text-green-300">Schedule Service</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 dark:hover:bg-opacity-30 transition-colors">
              <Car className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Add Vehicle</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900 dark:hover:bg-opacity-30 transition-colors">
              <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
              <span className="text-sm font-medium text-orange-900 dark:text-orange-300">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}