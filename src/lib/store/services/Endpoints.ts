// AutoCare360 API Endpoints Constants

export const ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register', // POST
        LOGIN: '/auth/login', // POST
    },

    DASHBOARD: {
        GET_SUPER_ADMIN: '/dashboard/super-admin',
        GET_ADMIN: '/dashboard/admin',
        GET_RECEPTIONIST: '/dashboard/receptionist',
        GET_MECHANIC: '/dashboard/mechanic',
        GET_CUSTOMER: '/dashboard/customer'
    },
} as const;