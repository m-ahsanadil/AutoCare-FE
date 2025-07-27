// AutoCare360 API Endpoints Constants

export const ENDPOINTS = {
    AUTH: {
        GOOGLE_URL: '/auth/google-url',
    },

    USER: {
        REGISTER: '/user/register', // POST
        LOGIN: '/user/login', // POST
        SET_PASSWORD: '/user/set-password', // POST
        LOGOUT: '/user/logout', // POST
        GET_ME: '/user/me', // GET
        UPDATE_ME: '/user/me', // PUT
    },

    DASHBOARD: {
        GET_SUPER_ADMIN: '/dashboard/super-admin',
        GET_ADMIN: '/dashboard/admin',
        GET_RECEPTIONIST: '/dashboard/receptionist',
        GET_MECHANIC: '/dashboard/mechanic',
        GET_CUSTOMER: '/dashboard/customer'
    },
} as const;