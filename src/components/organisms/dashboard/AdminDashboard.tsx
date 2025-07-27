import { getIconComponent } from "@/src/utils/getIconComponent";
import { StatsCard } from "../../atoms/StatsCard";
import { useDashboardData } from "../../hooks/useDashboardData";

export default function AdminDashboard() {
  const { dashboard, isLoading, stats, isError } = useDashboardData()

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