import { getIconComponent } from "@/src/utils/getIconComponent";
import { StatsCard } from "../../atoms/StatsCard";
import { useToast } from "@/src/lib/context/toast-context";
import { useIsMobile } from "../../hooks/use-mobile";
import { useDashboardData } from "../../hooks/useDashboardData";
import { Calendar, Car, Phone, CheckCircle, Users, DollarSign } from "lucide-react";

// Sample appointment data
const todayAppointments = [
  { id: 1, time: "09:00 AM", customer: "John Smith", service: "Oil Change", status: "confirmed" },
  { id: 2, time: "10:30 AM", customer: "Sarah Johnson", service: "Brake Inspection", status: "in-progress" },
  { id: 3, time: "12:00 PM", customer: "Mike Davis", service: "Tire Rotation", status: "pending" },
  { id: 4, time: "02:00 PM", customer: "Lisa Wilson", service: "Engine Diagnostic", status: "confirmed" },
  { id: 5, time: "03:30 PM", customer: "Robert Brown", service: "AC Repair", status: "pending" }
];

// Sample queue data
const serviceQueue = [
  { id: 1, customer: "Emily Chen", vehicle: "Honda Civic 2020", service: "Brake Pads", mechanic: "Alex Thompson", status: "in-progress", estimatedTime: "45 min" },
  { id: 2, customer: "David Kim", vehicle: "Toyota Camry 2019", service: "Oil Change", mechanic: "Maria Garcia", status: "waiting", estimatedTime: "30 min" },
  { id: 3, customer: "Anna Martinez", vehicle: "Ford F-150 2021", service: "Transmission", mechanic: "James Wilson", status: "in-progress", estimatedTime: "2 hours" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'pending': return 'bg-gray-100 text-gray-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'waiting': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ReceptionistDashboard() {
  const { showToast } = useToast();
  const isMobile = useIsMobile();
  const { dashboard, stats, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50 rounded-lg dark:bg-slate-900 p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-900 space-y-6">
      {/* Stats Cards Section */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Appointments - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Today's Appointments
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                  Add Appointment
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-100 dark:border-slate-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex-1 space-y-1 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100 min-w-[80px]">
                          {appointment.time}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {appointment.customer}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {appointment.service}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Queue - Takes 1 column */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Car className="h-5 w-5 text-purple-600" />
                Service Queue
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {serviceQueue.map((item, index) => (
                <div key={item.id} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {item.customer}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.vehicle}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Service:</span> {item.service}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Mechanic:</span> {item.mechanic}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Est. Time:</span> {item.estimatedTime}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500">Queue #{index + 1}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile optimized */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <button className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">New Appointment</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Users className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">Walk-in Check-in</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <Car className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Vehicle Check-in</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <Phone className="h-6 w-6 text-orange-600 mb-2" />
            <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Call Customer</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
            <CheckCircle className="h-6 w-6 text-emerald-600 mb-2" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Mark Complete</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            <DollarSign className="h-6 w-6 text-yellow-600 mb-2" />
            <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Generate Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}