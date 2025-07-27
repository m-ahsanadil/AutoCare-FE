import { CheckCircle, Clock, Calendar } from "lucide-react";
import { JSX } from "react";

export interface Appointment {
    id: number;
    customer: string;
    vehicle: string;
    service: string;
    time: string;
    status: 'completed' | 'in-progress' | 'scheduled';
};
export interface AppointmentCardProps {
    appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
    const getStatusColor = (status: Appointment['status']): string => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'scheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status: Appointment['status']): JSX.Element => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'in-progress': return <Clock className="w-4 h-4" />;
            case 'scheduled': return <Calendar className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{appointment.customer}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.vehicle}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{appointment.service}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    {appointment.status}
                </span>
            </div>
        </div>
    );
};