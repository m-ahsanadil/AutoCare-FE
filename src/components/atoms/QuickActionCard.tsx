import { LucideIcon } from "lucide-react";

interface QuickCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    onClick?: () => void;
    color?: string;
}

export const QuickActionCard = ({ title, description, icon: Icon, onClick, color = "blue" }: QuickCardProps) => (
    <div
        onClick={onClick}
        className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer hover:border-${color}-300`}>
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`}>
                <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
            </div>
            <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
    </div>
)