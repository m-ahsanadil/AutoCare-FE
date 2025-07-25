import { useEffect } from "react";
import { UserRole } from "@/src/enum";
import { useToast } from "@/hooks/use-toast";
import { isApiError, isNetworkError } from "@/src/types";
import { useAuth } from "@/src/lib/context/auth-provider";
import { useGetDashboardDataQuery } from "@/src/lib/store/services/dashboardApi";
import { MenuItem } from "../organisms/dashboard/types";


export function useDashboardData() {
  const { toast } = useToast();
  const { user } = useAuth()
  const role = user?.role;
  const { data, error, isLoading, isError, isSuccess } = useGetDashboardDataQuery(role as UserRole, {
    skip: !role,
  });

  let menu: MenuItem[] = [];

  if (data) {
    if ('mechanicData' in data.data) {
      menu = data.data.menu;
    } else if ('systemStats' in data.data) {
      menu = data.data.menu;
    } else if ('customerData' in data.data) {
      menu = data.data.menu;
    } else if ('stats' in data.data) {
      menu = data.data.menu;
    } else if ('receptionData' in data.data) {
      menu = data.data.menu;
    }
  }


  useEffect(() => {
    if (isError && error) {
      if (isApiError(error)) {
        toast({
          title: 'API Error',
          description: error.message,
        })
      } else if (isNetworkError(error)) {
        toast({
          title: 'Network Error',
          description: 'Check your internet connection.',
        })
      } else {
        toast({
          title: 'Unexpected Error',
          description: 'Something went wrong.',
        })
      }
    }
  }, [error, isError])

  useEffect(() => {
    if (isSuccess) {
      console.log(data);

      toast({
        title: 'Dashboard Loaded',
        description: 'Your menu is ready.',
      })
    }
  }, [isSuccess])

  return { isError, menu, isLoading, error, isSuccess };
}
