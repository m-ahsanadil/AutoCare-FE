import { Activity, Calendar, DollarSign, Users, Wrench } from "lucide-react";
import { JSX } from "react";

export interface ActivityItem {
    id: number;
    action: string;
    user: string;
    time: string;
    type: 'user' | 'service' | 'payment' | 'appointment';
}

interface ActivityItemCardProps {
    activity: ActivityItem;
}


export const ActivityItem = ({ activity }: ActivityItemCardProps) => {
    const getActivityIcon = (type: ActivityItem['type']): JSX.Element => {
        switch (type) {
            case 'user': return <Users className="w-4 h-4 text-blue-600" />;
            case 'service': return <Wrench className="w-4 h-4 text-green-600" />;
            case 'payment': return <DollarSign className="w-4 h-4 text-purple-600" />;
            case 'appointment': return <Calendar className="w-4 h-4 text-orange-600" />;
            default: return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <div className="p-2 bg-gray-100 dark:bg-slate-600 rounded-lg">
                {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.user} • {activity.time}</p>
            </div>
        </div>
    );
};