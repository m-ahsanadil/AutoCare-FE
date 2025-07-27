import { Car, Clock, DollarSign } from "lucide-react";

export interface Job {
    id: number;
    vehicle: string;
    customer: string;
    service: string;
    estimatedTime: string;
    scheduledTime: string;
    estimatedCost: number;
    status: "waiting" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
}

interface JobCardProps {
    job: Job;
    onStartJob: (id: number) => void;
    onCompleteJob: (id: number) => void;
    onViewDetails: (id: number) => void;
};

export const JobCard = ({ job, onStartJob, onCompleteJob, onViewDetails }: JobCardProps) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${job.priority === 'high'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : job.priority === 'medium'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20'
                        : 'bg-green-50 dark:bg-green-900/20'
                    }`}>
                    <Car className={`h-5 w-5 ${job.priority === 'high'
                        ? 'text-red-600 dark:text-red-400'
                        : job.priority === 'medium'
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-green-600 dark:text-green-400'
                        }`} />
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{job.vehicle}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.customer}</p>
                </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'in-progress'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : job.status === 'waiting'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                {job.status.replace('-', ' ')}
            </span>
        </div>

        <div className="mb-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{job.service}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Est. Time: {job.estimatedTime}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
                <span className="text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {job.scheduledTime}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    ${job.estimatedCost}
                </span>
            </div>
            <div className="flex space-x-2">
                {job.status === 'waiting' && (
                    <button
                        onClick={() => onStartJob(job.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Start
                    </button>
                )}
                {job.status === 'in-progress' && (
                    <button
                        onClick={() => onCompleteJob(job.id)}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                    >
                        Complete
                    </button>
                )}
                <button
                    onClick={() => onViewDetails(job.id)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    Details
                </button>
            </div>
        </div>
    </div>
);
