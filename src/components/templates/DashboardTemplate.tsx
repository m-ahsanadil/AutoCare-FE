import { UserRole } from "@/src/enum";
import AdminDashboard from "../organisms/dashboard/AdminDashboard";
import CustomerDashboard from "../organisms/dashboard/CustomerDashboard";
import MechanicDashboard from "../organisms/dashboard/MechanicDashboard";
import ReceptionistDashboard from "../organisms/dashboard/ReceptionistDashboard";
import SuperAdminDashboard from "../organisms/dashboard/SuperAdminDashboard";


interface Props {
    role: UserRole;
}

export default function DashboardTemplate({ role }: Props) {
    switch (role) {
        case UserRole.SUPER_ADMIN:
            return <SuperAdminDashboard />;
        case UserRole.ADMIN:
            return <AdminDashboard />;
        case UserRole.MECHANIC:
            return <MechanicDashboard />;
        case UserRole.RECEPTIONIST:
            return <ReceptionistDashboard />;
        case UserRole.CUSTOMER:
            return <CustomerDashboard />;
        default:
            return <div>Unauthorized or Unknown Role</div>;
    }
}