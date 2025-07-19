import { Sidebar } from "@/src/components/organisms/Sidebar";

export default function Loading() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-96 bg-gray-100 rounded" />
            </main>
        </div>
    );
}