import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/src/enum";
import { useAuth } from "@/src/lib/context/auth-provider";
import { useGetDashboardMenuQuery } from "@/src/lib/store/services/dashboardApi";
import { isApiError, isNetworkError } from "@/src/types";
import { useEffect } from "react";


export function useDashboardData() {
  const { toast } = useToast();
  const { user } = useAuth()
  const role = user?.role;
  const { data, error, isLoading, isError, isSuccess } = useGetDashboardMenuQuery(role as UserRole, {
    skip: !role, // wait for role to be available
  });

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

      toast({
        title: 'Dashboard Loaded',
        description: 'Your menu is ready.',
      })
    }
  }, [isSuccess])

  return { isError, menu: data || [], isLoading, error, isSuccess };
}
