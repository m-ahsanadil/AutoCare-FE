import { StatsCard } from "../../atoms/StatsCard";
import { Users, Car, Wrench, DollarSign, Calendar, Settings } from "lucide-react";
import { useDashboardData } from "../../hooks/useDashboardData";
import { getIconComponent } from "@/src/utils/getIconComponent";

const stats = [
    { title: "Total Customers", value: "1,234", icon: Users, iconColor: "text-blue-600", iconBgColor: "bg-blue-100" },
    { title: "Vehicles", value: "567", icon: Car, iconColor: "text-green-600", iconBgColor: "bg-green-100" },
    { title: "Active Services", value: "89", icon: Wrench, iconColor: "text-yellow-600", iconBgColor: "bg-yellow-100" },
    { title: "Revenue", value: "$12,345", icon: DollarSign, iconColor: "text-purple-600", iconBgColor: "bg-purple-100" },
    { title: "Appointments", value: "45", icon: Calendar, iconColor: "text-red-600", iconBgColor: "bg-red-100" },
    { title: "Services", value: "12", icon: Settings, iconColor: "text-indigo-600", iconBgColor: "bg-indigo-100" },
];


export default function SuperAdminDashboard() {
    const { dashboard, stats, isLoading, isError } = useDashboardData()

    return (
        <div className="w-full bg-gray-50 rounded-lg dark:bg-slate-900 p-6">
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
    )
}
