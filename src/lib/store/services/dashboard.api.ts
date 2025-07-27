import { ApiError } from "@/src/types";
import { api } from "./api";
import { DashboardResponse } from "@/src/components/organisms/dashboard/dashboard.types";
import { ENDPOINTS } from "./Endpoints";
import { UserRole } from "@/src/enum";

const getDashboardEndpoint = (role: UserRole): string => {
  const roleEndpointMap: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: ENDPOINTS.DASHBOARD.GET_SUPER_ADMIN,
    [UserRole.ADMIN]: ENDPOINTS.DASHBOARD.GET_ADMIN,
    [UserRole.RECEPTIONIST]: ENDPOINTS.DASHBOARD.GET_RECEPTIONIST,
    [UserRole.MECHANIC]: ENDPOINTS.DASHBOARD.GET_MECHANIC,
    [UserRole.CUSTOMER]: ENDPOINTS.DASHBOARD.GET_CUSTOMER,
  };

  const endpoint = roleEndpointMap[role];
  if (!endpoint) {
    throw new Error(`Invalid user role: ${role}`);
  }

  return endpoint;
};

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardResponse, UserRole>({
      query: (role) => ({
        url: getDashboardEndpoint(role),
        method: "GET",
      }),

      transformResponse: (response: DashboardResponse): DashboardResponse => {
        // More explicit success check
        if (response && typeof response === 'object' && 'success' in response && response.success) {
          return response;
        }
        throw new Error('Invalid response format or unsuccessful response');
      },

      transformErrorResponse: (baseQueryReturnValue): ApiError => {
        // Better error handling with fallback
        if (baseQueryReturnValue?.data) {
          return baseQueryReturnValue.data as ApiError;
        }

        // Fallback error structure
        return {
          success: false,
          message: (baseQueryReturnValue?.data as any)?.message || 'An unknown error occurred',
          statusCode: baseQueryReturnValue?.status || 500,
        } as ApiError;
      },

      // Add caching and invalidation
      providesTags: (result, error, role) => [
        { type: 'Dashboard', id: role },
        'Dashboard'
      ],

      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;