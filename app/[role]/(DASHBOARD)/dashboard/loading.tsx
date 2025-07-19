// // app/dashboard/loading.tsx
// export default function DashboardLoading() {
//   return (
//     <div className="p-4">
//       <div className="animate-pulse space-y-4">
//         <div className="h-6 bg-gray-300 rounded w-1/3" />
//         <div className="h-4 bg-gray-200 rounded w-2/3" />
//         <div className="h-96 bg-gray-100 rounded" />
//       </div>
//     </div>
//   );

import { Skeleton } from "@/src/components/ui/Skeleton";


export default function Loading() {
    return (
        <div className="space-y-4 p-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    );
}