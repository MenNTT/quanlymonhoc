import { User, ApiResponse, LoginResponse, LoginData, RegisterData } from '../models/user';
import BaseService from './base.service';
import { cookieService } from './cookie.service';
import { API_ENDPOINTS } from '../constants/api/api.config';

class AuthService extends BaseService {
    constructor() {
        super();
    }

    async login(loginData: LoginData): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await this.post<LoginResponse>(
                API_ENDPOINTS.AUTH.LOGIN, 
                loginData
            );
            
            console.log('Raw response from server:', response);

            if (response.status === 200 && response.data?.token) {
                console.log('Login response data:', {
                    token: response.data.token,
                    user: response.data.user,
                    roles: response.data.user.roles
                });

                cookieService.set('authToken', response.data.token);
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data
                };
            }

            return {
                success: false,
                message: response.data?.message || 'Login failed'
            };
        } catch (error: any) {
            console.error('Login service error:', error);
            throw error;
        }
    }

    async register(registerData: RegisterData): Promise<ApiResponse<User>> {
        try {
            const response = await this.post<ApiResponse<User>>(
                API_ENDPOINTS.AUTH.REGISTER, 
                registerData
            );
            
            return response.data;
        } catch (error: any) {
            console.error('Register error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || 'Đăng ký thất bại'
            };
        }
    }

    async updateProfile(userId: string, userData: Partial<RegisterData>): Promise<ApiResponse<User>> {
        try {
            const response = await this.put<ApiResponse<User>>(
                API_ENDPOINTS.AUTH.UPDATE(userId), 
                userData
            );
            
            return response.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || 'Cập nhật thông tin thất bại'
            };
        }
    }

    logout(): void {
        cookieService.remove('authToken');
        localStorage.removeItem('user');
    }

    isAuthenticated(): boolean {
        return !!cookieService.get('authToken');
    }
}

const authService = new AuthService();
export default authService;
