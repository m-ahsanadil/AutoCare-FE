// Common types used across all interfaces
export interface MenuItem {
    label: string;
    icon: string;
    path: string;
}

export interface StatCard {
    title: string;
    value: number | string;
    icon: string;
    iconColor: string;
    iconBgColor: string;
    urgent?: boolean;
    trend?: {
        value: string | number;
        label: string;
        positive: boolean;
    };
}

export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

// Admin Dashboard Types
export interface RecentActivity {
    type: string;
    description: string;
    timestamp: string;
}

export interface Appointment {
    id: string;
    customerName: string;
    mechanicName: string;
    time: string;
}

export interface LowStockService {
    serviceName: string;
    availableQuantity: number;
    threshold: number;
}

export interface AdminData {
    recentActivity: RecentActivity[];
    upcomingAppointments: Appointment[];
    lowStockServices: LowStockService[];
}

export interface AdminDashboardData {
    menu: MenuItem[];
    stats: StatCard[];
    adminData: AdminData;
}

export type AdminDashboardResponse = BaseResponse<AdminDashboardData>;

// Mechanic Dashboard Types
export interface MechanicData {
    todayAppointments: any[]; // You can define a specific type for appointments if needed
    currentVehicles: any[]; // You can define a specific type for vehicles if needed
}

export interface MechanicDashboardData {
    menu: MenuItem[];
    stats: StatCard[];
    mechanicData: MechanicData;
}

export type MechanicDashboardResponse = BaseResponse<MechanicDashboardData>;

// Super Admin Dashboard Types
export interface AdminActivity {
    adminId: string;
    action: string;
    timestamp: string;
}

export interface SystemAlert {
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    createdAt: string;
}

export interface SuperAdminData {
    adminActivity: AdminActivity[];
    systemAlerts: SystemAlert[];
};

export interface SuperAdminDashboardData {
    menu: MenuItem[];
    stats: StatCard[];
    superAdminData: SuperAdminData;
}

export type SuperAdminDashboardResponse = BaseResponse<SuperAdminDashboardData>;

// Customer Dashboard Types
export interface UpcomingAppointment {
    date: string;
    service: string;
    mechanic: string;
    status: string;
}

export interface CustomerData {
    upcomingAppointment: UpcomingAppointment;
    recentServices: any[];
}

export interface CustomerDashboardData {
    menu: MenuItem[];
    stats: StatCard[];
    customerData: CustomerData;
}

export type CustomerDashboardResponse = BaseResponse<CustomerDashboardData>;


// Receptionist Dashboard Types
export interface ReceptionData {
    todayAppointments: any[]; // You can define a specific type for appointments if needed
    walkInCustomers: any[];
    vehiclesInService: any[];
    pendingCheckIns: any[]; // You can define a specific type for check-ins if needed
}

export interface ReceptionistDashboardData {
    menu: MenuItem[];
    stats: StatCard[];
    receptionData: ReceptionData;
}

export type ReceptionistDashboardResponse = BaseResponse<ReceptionistDashboardData>;


// Union type for all dashboard responses
export type DashboardResponse =
    | MechanicDashboardResponse
    | SuperAdminDashboardResponse
    | CustomerDashboardResponse
    | AdminDashboardResponse
    | ReceptionistDashboardResponse;