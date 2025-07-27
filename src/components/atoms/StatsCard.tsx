import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  urgent?: boolean;
  trend?: {
    value: string | number;
    label: string;
    positive: boolean;
  };
}

export const StatsCard: FC<StatsCardProps> = ({ title, urgent = false, value, icon: Icon, trend, iconColor = "text-blue-600", iconBgColor = "bg-blue-100" }) => (
  <div className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 ${urgent ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-slate-700'} hover:shadow-md transition-shadow`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="text-sm text-gray-500 dark:text-gray-300 font-medium">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        {trend && (
          <p className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value} {trend.label}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      )}
    </div>
  </div>
);
