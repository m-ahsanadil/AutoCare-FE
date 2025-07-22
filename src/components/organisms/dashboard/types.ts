// Common types used across all interfaces
export interface MenuItem {
    label: string;
    icon: string;
    path: string;
}

export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

// Mechanic Dashboard Types
export interface MechanicPerformanceStats {
    completionRate: number;
    averageTime: string;
    customerRating: number;
}

export interface MechanicData {
    todayTasks: number;
    completedTasks: number;
    pendingTasks: number;
    todayAppointments: any[]; // You can define a specific type for appointments if needed
    currentVehicles: any[]; // You can define a specific type for vehicles if needed
    performanceStats: MechanicPerformanceStats;
}

export interface MechanicDashboardData {
    menu: MenuItem[];
    mechanicData: MechanicData;
}

export type MechanicDashboardResponse = BaseResponse<MechanicDashboardData>;

// Super Admin Dashboard Types
export interface SystemStats {
    totalAdmins: number;
    totalUsers: number;
    systemHealth: string;
    serverUptime: string;
    totalRevenue: number;
    monthlyGrowth: number;
}

export interface SuperAdminData {
    menu: MenuItem[];
    systemStats: SystemStats;
    adminActivity: any[]; // You can define a specific type for admin activity if needed
    systemAlerts: any[]; // You can define a specific type for system alerts if needed
}

export type SuperAdminDashboardResponse = BaseResponse<SuperAdminData>;

// Customer Dashboard Types
export interface UpcomingAppointment {
    date: string;
    service: string;
    mechanic: string;
    status: string;
}

export interface CustomerData {
    upcomingAppointment: UpcomingAppointment;
    vehicleStatus: string;
    membershipStatus: string;
    recentServices: any[]; // You can define a specific type for recent services if needed
    pendingPayments: number;
    loyaltyPoints: number;
}

export interface CustomerDashboardData {
    menu: MenuItem[];
    customerData: CustomerData;
}

export type CustomerDashboardResponse = BaseResponse<CustomerDashboardData>;

// Admin Dashboard Types
export interface AdminStats {
    totalCustomers: number;
    totalMechanics: number;
    totalReceptionists: number;
    todayAppointments: number;
    pendingAppointments: number;
    completedAppointments: number;
    totalRevenue: number;
    monthlyRevenue: number;
}

export interface AdminData {
    menu: MenuItem[];
    stats: AdminStats;
    recentActivity: any[]; // You can define a specific type for recent activity if needed
    upcomingAppointments: any[]; // You can define a specific type for appointments if needed
    lowStockServices: any[]; // You can define a specific type for services if needed
}

export type AdminDashboardResponse = BaseResponse<AdminData>;

// Receptionist Dashboard Types
export interface ReceptionData {
    todayAppointments: any[]; // You can define a specific type for appointments if needed
    walkInCustomers: number;
    vehiclesInService: number;
    availableMechanics: number;
    pendingCheckIns: any[]; // You can define a specific type for check-ins if needed
    completedCheckOuts: number;
}

export interface ReceptionistDashboardData {
    menu: MenuItem[];
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