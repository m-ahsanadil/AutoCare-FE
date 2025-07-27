import { useEffect } from "react";
import { UserRole } from "@/src/enum";
import { isApiError, isNetworkError } from "@/src/types";
import { useAuth } from "@/src/lib/context/auth-provider";
import { useGetDashboardDataQuery } from "@/src/lib/store/services/dashboard.api";
import { AdminData, CustomerData, MechanicData, MenuItem, ReceptionData, StatCard, SuperAdminData } from "../organisms/dashboard/dashboard.types";
import { useToast } from "@/src/lib/context/toast-context";

interface UseDashboardDataProps {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export function useDashboardData({ showSuccessToast = false, showErrorToast = false, }: UseDashboardDataProps = {}) {
  const { showToast } = useToast();
  const { user } = useAuth()
  const role = user?.role;
  const { data, error, isLoading, isError, isSuccess } = useGetDashboardDataQuery(role as UserRole, {
    skip: !role,
  });

  let menu: MenuItem[] = [];
  let stats: StatCard[] = [];
  let dashboard: AdminData | CustomerData | SuperAdminData | MechanicData | ReceptionData | undefined = undefined;
  if (data) {
    if ('mechanicData' in data.data) {
      menu = data.data.menu;
      stats = data.data.stats;
      dashboard = data.data.mechanicData
    } else if ('superAdminData' in data.data) {
      menu = data.data.menu;
      stats = data.data.stats;
      dashboard = data.data.superAdminData
    } else if ('customerData' in data.data) {
      menu = data.data.menu;
      stats = data.data.stats;
      dashboard = data.data.customerData
    } else if ('adminData' in data.data) {
      menu = data.data.menu;
      stats = data.data.stats;
      dashboard = data.data.adminData
    } else if ('receptionData' in data.data) {
      menu = data.data.menu;
      stats = data.data.stats;
      dashboard = data.data.receptionData
    }
  }


  useEffect(() => {
    if (isError && error && showErrorToast) {
      if (isApiError(error)) {
        showToast({
          title: 'API Error',
          description: error.message,
          type: 'error',
        });
      } else if (isNetworkError(error)) {
        showToast({
          title: 'Network Error',
          description: 'Check your internet connection.',
          type: 'warning',
        });
      } else {
        showToast({
          title: 'Unexpected Error',
          description: 'Something went wrong.',
          type: 'error',
        });
      }
    }
  }, [error, isError])

  useEffect(() => {
    if (isSuccess && showSuccessToast) {
      showToast({
        title: 'Dashboard Loaded',
        description: 'Your menu is ready.',
        type: 'success',
      });
    }
  }, [isSuccess, showSuccessToast]);

  return { isError, dashboard, stats, menu, isLoading, error, isSuccess };
}
