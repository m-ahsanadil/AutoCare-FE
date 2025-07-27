"use client";
import { useToast } from "@/src/lib/context/toast-context";
import { useIsMobile } from "../../hooks/use-mobile";
import { useDashboardData } from "../../hooks/useDashboardData";
import { getIconComponent } from "@/src/utils/getIconComponent";
import { StatsCard } from "../../atoms/StatsCard";
import { useState } from "react";
import { AlertTriangle, Calendar, Car, CheckCircle, FileText, MapPin, Shield, Wrench } from "lucide-react";
import { Vehicle, VehicleCard } from "../../atoms/VehicleCard";
import { QuickActionCard } from "../../atoms/QuickActionCard";
import { useAuth } from "@/src/lib/context/auth-provider";

const mockVehicles: Vehicle[] = [
  { name: "Honda Civic", model: "2022 Sedan", status: "Good", mileage: "45,230 mi", nextService: "Jan 15" },
  { name: "Toyota RAV4", model: "2020 SUV", status: "Due Soon", mileage: "62,140 mi", nextService: "Dec 28" },
  { name: "BMW X3", model: "2023 SUV", status: "Overdue", mileage: "28,450 mi", nextService: "Dec 20" },
];

const quickActions = [
  { title: "Schedule Service", description: "Book your next appointment", icon: Calendar, color: "blue" },
  { title: "Add Vehicle", description: "Register a new vehicle", icon: Car, color: "green" },
  { title: "View Service History", description: "Check past maintenance", icon: FileText, color: "purple" },
  { title: "Find Service Center", description: "Locate nearby centers", icon: MapPin, color: "orange" },
];


export default function CustomerDashboard() {
  const { showToast } = useToast();
  const isMobile = useIsMobile();
  const { dashboard, stats, isLoading, isError } = useDashboardData()
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth()

  return (
    // <div className="w-full rounded-lg dark:bg-slate-900 p-6">
    //   <div className="overflow-x-auto scrollbar-custom scrollbar-slate">
    //     <div className="flex space-x-6 pb-4 w-max">
    //       {stats.map((stat, index) => (
    //         <div key={index} className="w-72 flex-shrink-0">
    //           <StatsCard
    //             title={stat.title}
    //             value={stat.value}
    //             icon={getIconComponent(stat.icon)}
    //             iconColor={stat.iconColor}
    //             iconBgColor={stat.iconBgColor}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className=" dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's what's happening with your vehicles today
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Schedule Service
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4 min-w-max">
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

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                onClick={() => console.log(`Clicked: ${action.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* My Vehicles */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Vehicles</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {mockVehicles.map((vehicle, index) => (
                <VehicleCard key={index} vehicle={vehicle} />
              ))}
            </div>
          </div>

          {/* Upcoming Services & Reminders */}
          <div className="space-y-6">
            {/* Upcoming Services */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Services</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Wrench className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Oil Change</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Honda Civic - Dec 28</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Tire Rotation</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toyota RAV4 - Jan 5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Reminders */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reminders</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Brake Inspection Overdue</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">BMW X3 - 5 days overdue</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Warranty Expiring</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Honda Civic - 30 days left</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Service History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Vehicle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Honda Civic</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Oil Change + Filter</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Dec 15, 2024</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$85</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-700/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Toyota RAV4</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Brake Pad Replacement</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Dec 10, 2024</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$320</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">BMW X3</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Annual Inspection</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Nov 28, 2024</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">$45</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}