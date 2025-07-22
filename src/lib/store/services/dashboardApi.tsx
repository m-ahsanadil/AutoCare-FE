import { UserRole } from "@/src/enum";
import { api } from "./api";
import { ENDPOINTS } from "./Endpoints";
import { ApiError, ApiResponse } from "@/src/types";
import { AdminDashboardResponse, CustomerDashboardResponse, DashboardResponse, MechanicDashboardResponse, MenuItem, ReceptionistDashboardResponse, SuperAdminDashboardResponse } from "@/src/components/organisms/dashboard/types";


// Type guard functions to determine dashboard type
const isMechanicDashboard = (response: any): response is MechanicDashboardResponse => {
  return response.data && 'mechanicData' in response.data;
};

const isSuperAdminDashboard = (response: any): response is SuperAdminDashboardResponse => {
  return response.data && 'systemStats' in response.data;
};

const isCustomerDashboard = (response: any): response is CustomerDashboardResponse => {
  return response.data && 'customerData' in response.data;
};

const isAdminDashboard = (response: any): response is AdminDashboardResponse => {
  return response.data && 'stats' in response.data;
};

const isReceptionistDashboard = (response: any): response is ReceptionistDashboardResponse => {
  return response.data && 'receptionData' in response.data;
};

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard menu only
    getDashboardMenu: builder.query<MenuItem[], UserRole>({
      query: (role) => {
        let path = "";
        switch (role) {
          case UserRole.SUPER_ADMIN:
            path = ENDPOINTS.DASHBOARD.GET_SUPER_ADMIN;
            break;
          case UserRole.ADMIN:
            path = ENDPOINTS.DASHBOARD.GET_ADMIN;
            break;
          case UserRole.RECEPTIONIST:
            path = ENDPOINTS.DASHBOARD.GET_RECEPTIONIST;
            break;
          case UserRole.MECHANIC:
            path = ENDPOINTS.DASHBOARD.GET_MECHANIC;
            break;
          case UserRole.CUSTOMER:
            path = ENDPOINTS.DASHBOARD.GET_CUSTOMER;
            break;
          default:
            throw new Error(`Invalid user role: ${role}`);
        }

        return {
          url: path,
          method: "GET",
        };
      },

      transformResponse: (response: DashboardResponse): MenuItem[] => {
        if ('success' in response && response.success) {
          return response.data.menu;
        } else {
          throw response as unknown as ApiError;
        }
      },

      transformErrorResponse: (baseQueryReturnValue): ApiError => {
        return baseQueryReturnValue.data as ApiError;
      },
    }),

    // Get complete dashboard data
    getDashboardData: builder.query<DashboardResponse, UserRole>({
      query: (role) => {
        let path = "";
        switch (role) {
          case UserRole.SUPER_ADMIN:
            path = ENDPOINTS.DASHBOARD.GET_SUPER_ADMIN;
            break;
          case UserRole.ADMIN:
            path = ENDPOINTS.DASHBOARD.GET_ADMIN;
            break;
          case UserRole.RECEPTIONIST:
            path = ENDPOINTS.DASHBOARD.GET_RECEPTIONIST;
            break;
          case UserRole.MECHANIC:
            path = ENDPOINTS.DASHBOARD.GET_MECHANIC;
            break;
          case UserRole.CUSTOMER:
            path = ENDPOINTS.DASHBOARD.GET_CUSTOMER;
            break;
          default:
            throw new Error(`Invalid user role: ${role}`);
        }

        return {
          url: path,
          method: "GET",
        };
      },

      transformResponse: (response: DashboardResponse): DashboardResponse => {
        if ('success' in response && response.success) {
          return response;
        } else {
          throw response as unknown as ApiError;
        }
      },

      transformErrorResponse: (baseQueryReturnValue): ApiError => {
        return baseQueryReturnValue.data as ApiError;
      },
    }),

    // Type-specific queries for better type safety
    getMechanicDashboard: builder.query<MechanicDashboardResponse, void>({
      query: () => ({
        url: ENDPOINTS.DASHBOARD.GET_MECHANIC,
        method: "GET",
      }),
    }),

    getSuperAdminDashboard: builder.query<SuperAdminDashboardResponse, void>({
      query: () => ({
        url: ENDPOINTS.DASHBOARD.GET_SUPER_ADMIN,
        method: "GET",
      }),
    }),

    getCustomerDashboard: builder.query<CustomerDashboardResponse, void>({
      query: () => ({
        url: ENDPOINTS.DASHBOARD.GET_CUSTOMER,
        method: "GET",
      }),
    }),

    getAdminDashboard: builder.query<AdminDashboardResponse, void>({
      query: () => ({
        url: ENDPOINTS.DASHBOARD.GET_ADMIN,
        method: "GET",
      }),
    }),

    getReceptionistDashboard: builder.query<ReceptionistDashboardResponse, void>({
      query: () => ({
        url: ENDPOINTS.DASHBOARD.GET_RECEPTIONIST,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardMenuQuery,
  useGetDashboardDataQuery,
  useGetMechanicDashboardQuery,
  useGetSuperAdminDashboardQuery,
  useGetCustomerDashboardQuery,
  useGetAdminDashboardQuery,
  useGetReceptionistDashboardQuery,
} = dashboardApi;