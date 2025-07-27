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