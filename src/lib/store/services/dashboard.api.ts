import { ApiError } from "@/src/types";
import { api } from "./api";
import { DashboardResponse } from "@/src/components/organisms/dashboard/dashboard.types";
import { ENDPOINTS } from "./Endpoints";
import { UserRole } from "@/src/enum";


export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;