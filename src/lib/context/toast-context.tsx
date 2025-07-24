'use client';

import { ToastContainer } from '@/src/components/ui/toast-container';
import { createContext, useContext, useState } from 'react';

export type ToastType = {
    id: string;
    title: string;
    description?: string;
    type?: 'default' | 'success' | 'error' | 'info' | 'warning' | 'loading';
};

type ToastContextType = {
    toasts: ToastType[];
    showToast: (toast: Omit<ToastType, 'id'>) => void;
    removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const showToast = (toast: Omit<ToastType, 'id'>) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { ...toast, id }]);

        setTimeout(() => removeToast(id), 4000); // auto-remove after 4s
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
