import { UserRole } from "@/src/enum";
import { api } from "./api";
import { ENDPOINTS } from "./Endpoints";
import { ApiError, ApiResponse } from "@/src/types";

export interface MenuItem {
    label: string;
    icon: string;
    path: string;
}

export interface AdminDashboardResponse {
    success: boolean;
    message: string;
    data: MenuItem[];
    timestamp: string
}

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardMenu: builder.query<any, string>({
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
                        path = ""; // Or throw an error
                }

                return {
                    url: path,
                    method: "GET",
                };
            },

            transformResponse: (response: ApiResponse<MenuItem[]>): MenuItem[] => {
                if ('success' in response && response.success) {
                    return response.data;
                } else {
                    // TypeScript knows response is ApiError
                    throw response as ApiError;
                }
            },

            // Optional: capture raw error from server
            transformErrorResponse: (baseQueryReturnValue): ApiError => {
                return baseQueryReturnValue.data as ApiError;
            },
        }),
    }),
});

export const { useGetDashboardMenuQuery } = dashboardApi;
