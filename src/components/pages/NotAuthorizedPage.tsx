import { LockIcon, ShieldOff, Shield } from "lucide-react";

interface NotAuthorizedPageProps {
    message?: string;
}


export const NotAuthorizedPage: React.FC<NotAuthorizedPageProps> = ({
    message = "You are not authorized to view this page.",
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center py-12">
                <Shield className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Access Restricted</h3>
                <p className="text-slate-600">{message}</p>
            </div>
        </div>
    );
}
