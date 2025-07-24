'use client';

import { ToastType } from '@/src/lib/context/toast-context';
import { X } from 'lucide-react';

export const ToastContainer = ({
    toasts,
    removeToast,
}: {
    toasts: ToastType[];
    removeToast: (id: string) => void;
}) => {
    return (
        <div className="fixed inset-x-4 sm:inset-x-auto top-4 right-4 sm:right-5 space-y-4 z-[9999] max-w-sm w-full mx-auto sm:mx-0">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`animate-slide-in-up w-full bg-white shadow-lg rounded-lg p-4 border-l-4 transition-all 
                        ${toast.type === 'success'
                            ? 'border-green-500'
                            : toast.type === 'error'
                                ? 'border-red-500'
                                : toast.type === 'warning'
                                    ? 'border-yellow-500'
                                    : toast.type === 'info'
                                        ? 'border-blue-500'
                                        : toast.type === 'loading'
                                            ? 'border-gray-400'
                                            : 'border-indigo-500' // fallback for 'custom' or unknown
                        }`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{toast.title}</p>
                            {toast.description && (
                                <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 text-gray-400 hover:text-gray-700"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
