export const BASE_URL = 'http://localhost:5000';
export const API_VERSION = 'v1';
export const BASE_PATH = `/api/${API_VERSION}`;

export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: `${BASE_PATH}/auth/login`,
        REGISTER: `${BASE_PATH}/auth/register`,
    },

    // Account endpoints
    ACCOUNT: {
        GET_ALL: `${BASE_PATH}/account/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/account/get/${id}`,
        CREATE: `${BASE_PATH}/account/create`,
        UPDATE: `${BASE_PATH}/account/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/account/delete/${id}`,
    },

    // Course endpoints
    COURSE: {
        GET_ALL: `${BASE_PATH}/course/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/course/get/${id}`,
        CREATE: `${BASE_PATH}/course/create`,
        UPDATE: `${BASE_PATH}/course/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/course/delete/${id}`,
    },

    // Lesson endpoints
    LESSON: {
        GET_ALL: `${BASE_PATH}/lesson/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/lesson/get/${id}`,
        CREATE: `${BASE_PATH}/lesson/create`,
        UPDATE: `${BASE_PATH}/lesson/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/lesson/delete/${id}`,
    },

    // Subject endpoints
    SUBJECT: {
        GET_ALL: `${BASE_PATH}/subject/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/subject/get/${id}`,
        CREATE: `${BASE_PATH}/subject/create`,
        UPDATE: `${BASE_PATH}/subject/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/subject/delete/${id}`,
    },

    // Enrollment endpoints
    ENROLLMENT: {
        GET_ALL: `${BASE_PATH}/enrollment/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/enrollment/get/${id}`,
        CREATE: `${BASE_PATH}/enrollment/create`,
        UPDATE: `${BASE_PATH}/enrollment/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/enrollment/delete/${id}`,
    },

    // Assignment endpoints
    ASSIGNMENT: {
        GET_ALL: `${BASE_PATH}/assignment/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/assignment/get/${id}`,
        CREATE: `${BASE_PATH}/assignment/create`,
        UPDATE: `${BASE_PATH}/assignment/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/assignment/delete/${id}`,
    },

    // Grade endpoints
    GRADE: {
        GET_ALL: `${BASE_PATH}/grade/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/grade/get/${id}`,
        CREATE: `${BASE_PATH}/grade/create`,
        UPDATE: `${BASE_PATH}/grade/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/grade/delete/${id}`,
    },

    // Notification endpoints
    NOTIFICATION: {
        GET_ALL: `${BASE_PATH}/notification/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/notification/get/${id}`,
        CREATE: `${BASE_PATH}/notification/create`,
        UPDATE: `${BASE_PATH}/notification/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/notification/delete/${id}`,
    },

    // Payment endpoints
    PAYMENT: {
        GET_ALL: `${BASE_PATH}/payment/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/payment/get/${id}`,
        CREATE: `${BASE_PATH}/payment/create`,
        UPDATE: `${BASE_PATH}/payment/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/payment/delete/${id}`,
    },

    // Rating endpoints
    RATING: {
        GET_ALL: `${BASE_PATH}/rating/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/rating/get/${id}`,
        CREATE: `${BASE_PATH}/rating/create`,
        UPDATE: `${BASE_PATH}/rating/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/rating/delete/${id}`,
    },

    // Role endpoints
    ROLE: {
        GET_ALL: `${BASE_PATH}/role/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/role/get/${id}`,
        CREATE: `${BASE_PATH}/role/create`,
        UPDATE: `${BASE_PATH}/role/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/role/delete/${id}`,
    },

    // Permission endpoints
    PERMISSION: {
        GET_ALL: `${BASE_PATH}/permission/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/permission/get/${id}`,
        CREATE: `${BASE_PATH}/permission/create`,
        UPDATE: `${BASE_PATH}/permission/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/permission/delete/${id}`,
    },

    // Tag endpoints
    TAG: {
        GET_ALL: `${BASE_PATH}/tag/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/tag/get/${id}`,
        CREATE: `${BASE_PATH}/tag/create`,
        UPDATE: `${BASE_PATH}/tag/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/tag/delete/${id}`,
    },

    // Coupon endpoints
    COUPON: {
        GET_ALL: `${BASE_PATH}/coupon/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/coupon/get/${id}`,
        CREATE: `${BASE_PATH}/coupon/create`,
        UPDATE: `${BASE_PATH}/coupon/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/coupon/delete/${id}`,
    },

    // Log endpoints
    LOG: {
        GET_ALL: `${BASE_PATH}/log/getAll`,
        GET_BY_ID: (id: string | number) => `${BASE_PATH}/log/get/${id}`,
        CREATE: `${BASE_PATH}/log/create`,
        UPDATE: `${BASE_PATH}/log/update`,
        DELETE: (id: string | number) => `${BASE_PATH}/log/delete/${id}`,
    },
} as const;

// Type for API response
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}