import { Car } from "lucide-react";

export interface Vehicle {
    name: string;
    model: string;
    mileage: string;
    nextService: string;
    status: "Good" | "Due Soon" | "Overdue" | "Needs Attention";
}

export interface VehicleCardProps {
    vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.model}</p>
                </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${vehicle.status === 'Good'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : vehicle.status === 'Due Soon'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                {vehicle.status}
            </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                <span className="text-gray-500 dark:text-gray-400">Mileage:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">{vehicle.mileage}</span>
            </div>
            <div>
                <span className="text-gray-500 dark:text-gray-400">Next Service:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">{vehicle.nextService}</span>
            </div>
        </div>
    </div>
);