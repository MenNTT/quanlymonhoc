// mockUsers.ts
export interface User {
    name: string;
    email: string;
    password: string; // Add password attribute
}
export interface AuthResponse {
    token: string;
    user: {
      name: string;
      email: string;
    };
  }
  
export interface LoginData {
    email: string;
    password: string;
  }
  
export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  