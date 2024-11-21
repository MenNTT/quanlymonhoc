// mockUsers.ts
export interface User {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    birthDate?: string;
    roles: string[];
}
export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        phoneNumber?: string;
        address?: string;
        roles: string[];
    }
}

export interface ApiResponse<T> {
    success?: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: {
        email: string;
        fullName: string;
        phoneNumber?: string;
        address?: string;
        roles: string[];
    }
}
  
export interface LoginData {
    email: string;
    password: string;
  }
  
export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
    address?: string;
    phoneNumber?: string;
    birthDate?: string;
  }
  