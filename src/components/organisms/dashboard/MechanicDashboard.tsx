import { useToast } from "@/src/lib/context/toast-context";
import { useIsMobile } from "../../hooks/use-mobile";
import { useDashboardData } from "../../hooks/useDashboardData";
import { StatsCard } from "../../atoms/StatsCard";
import { getIconComponent } from "@/src/utils/getIconComponent";
import { useState } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, DollarSign, Timer, Package, Star, AlertTriangle, Settings } from "lucide-react";
import { Job, JobCard } from "../../atoms/JobCard";
import { QuickActionCard } from "../../atoms/QuickActionCard";
import { useAuth } from "@/src/lib/context/auth-provider";

const mockStats = [
  { title: "Today's Jobs", value: "8", icon: Calendar, iconColor: "text-blue-600", iconBgColor: "bg-blue-50", trend: { positive: true, value: "+2", label: "vs yesterday" } },
  { title: "In Progress", value: "3", icon: Clock, iconColor: "text-orange-600", iconBgColor: "bg-orange-50", urgent: true },
  { title: "Completed Today", value: "5", icon: CheckCircle, iconColor: "text-green-600", iconBgColor: "bg-green-50", trend: { positive: true, value: "+25%", label: "efficiency" } },
  { title: "Pending Jobs", value: "12", icon: AlertCircle, iconColor: "text-yellow-600", iconBgColor: "bg-yellow-50" },
  { title: "Revenue Today", value: "$1,250", icon: DollarSign, iconColor: "text-purple-600", iconBgColor: "bg-purple-50", trend: { positive: true, value: "+15%", label: "vs avg" } },
  { title: "Avg Job Time", value: "2.5h", icon: Timer, iconColor: "text-cyan-600", iconBgColor: "bg-cyan-50", trend: { positive: true, value: "-30min", label: "improved" } },
  { title: "Parts Needed", value: "4", icon: Package, iconColor: "text-red-600", iconBgColor: "bg-red-50", urgent: true },
  { title: "Customer Rating", value: "4.8", icon: Star, iconColor: "text-amber-600", iconBgColor: "bg-amber-50" },
];

const mockJobs: Job[] = [
  {
    id: 1,
    vehicle: "Honda Civic 2022",
    customer: "John Smith",
    service: "Oil Change + Filter",
    status: "in-progress",
    priority: "medium",
    scheduledTime: "9:00 AM",
    estimatedTime: "1h",
    estimatedCost: 85
  },
  {
    id: 2,
    vehicle: "Toyota RAV4 2020",
    customer: "Sarah Johnson",
    service: "Brake Pad Replacement",
    status: "waiting",
    priority: "high",
    scheduledTime: "10:30 AM",
    estimatedTime: "2.5h",
    estimatedCost: 320
  },
  {
    id: 3,
    vehicle: "BMW X3 2023",
    customer: "Mike Wilson",
    service: "Annual Inspection",
    status: "waiting",
    priority: "low",
    scheduledTime: "2:00 PM",
    estimatedTime: "1.5h",
    estimatedCost: 150
  }
];

const quickActions = [
  { title: "Check Inventory", description: "View parts availability", icon: Package, color: "blue" },
  { title: "Clock In/Out", description: "Track work hours", icon: Clock, color: "green" },
  { title: "Report Issue", description: "Submit maintenance request", icon: AlertTriangle, color: "red" },
  { title: "View Schedule", description: "See full day schedule", icon: Calendar, color: "purple" },
];

const partsNeeded = [
  { part: "Brake Pads - Honda Civic", vehicle: "HC-2022-001", urgency: "high", eta: "2 hours" },
  { part: "Oil Filter - Toyota", vehicle: "TR-2020-045", urgency: "medium", eta: "Tomorrow" },
  { part: "Air Filter - BMW X3", vehicle: "BM-2023-012", urgency: "low", eta: "3 days" }
];


function OverviewTab() {
  const [activeTab, setActiveTab] = useState('today');
  const { stats } = useDashboardData();
  return (
    <>
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
                trend={stat.trend}
                urgent={stat.urgent}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's Jobs */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('today')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'today'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveTab('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'week'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
              >
                Week
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onStartJob={(id) => console.log('Start job:', id)}
                onCompleteJob={(id) => console.log('Complete job:', id)}
                onViewDetails={(id) => console.log('View details:', id)}
              />
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Parts Needed */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Parts Needed</h3>
            <div className="space-y-3">
              {partsNeeded.map((part, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <Package className={`h-5 w-5 ${part.urgency === 'high' ? 'text-red-600' :
                    part.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{part.part}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{part.vehicle} • ETA: {part.eta}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
              Order Parts
            </button>
          </div>

          {/* Performance Today */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Today</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Jobs Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">5/8</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62.5%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
                <span className="font-semibold text-green-600">+25%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Customer Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900 dark:text-white ml-1">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Equipment */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tools Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Lift #3</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                  Available
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Diagnostic Scanner</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full">
                  In Use
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Tire Changer</span>
                </div>
                <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full">
                  Maintenance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function VehiclesTab() {
  const vehicles = [
    {
      id: 1,
      name: "Honda Civic 2022",
      plate: "HC-2022-001",
      customer: "John Smith",
      status: "In Progress",
      job: "Oil Change",
      assignedDate: "2025-07-25",
    },
    {
      id: 2,
      name: "Toyota RAV4 2020",
      plate: "TR-2020-045",
      customer: "Sarah Johnson",
      status: "Waiting",
      job: "Brake Pad Replacement",
      assignedDate: "2025-07-25",
    },
    {
      id: 3,
      name: "BMW X3 2023",
      plate: "BM-2023-012",
      customer: "Mike Wilson",
      status: "Waiting",
      job: "Inspection",
      assignedDate: "2025-07-24",
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assigned Vehicles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 text-sm">
          <thead className="bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Plate</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Job</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Assigned</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-2 text-gray-900 dark:text-white">{v.name}</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{v.plate}</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{v.customer}</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{v.job}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${v.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : v.status === "Waiting" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    }`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{v.assignedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryTab() { return (<></>) }


export default function MechanicDashboard() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  const { dashboard, stats, isLoading, isError } = useDashboardData()
  const { user } = useAuth();

  return (
    <div className="dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Good morning, {user?.username}! 🔧
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Bay 3 • 8 jobs scheduled today • 3 in progress
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Clock In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Start Next Job
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 dark:border-slate-700 mt-6">
          {["overview", "vehicles", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-500"
                }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab: Overview */}
        {activeTab === "overview" && <OverviewTab />}
        {/* Tab: Vehicles */}
        {activeTab === "vehicles" && <VehiclesTab />}
        {/* Tab: History */}
        {activeTab === "history" && <HistoryTab />}


      </div>
    </div >
  );
}