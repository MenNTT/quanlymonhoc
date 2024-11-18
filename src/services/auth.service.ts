import { AuthResponse, ApiAuthResponse, LoginData, RegisterData } from '../models/user';
import BaseService from './base.service';
import { cookieService } from './cookie.service';
import { API_ENDPOINTS } from '../constants/api/api.config';

class AuthService extends BaseService {
    constructor() {
        super();
    }

    async login(loginData: LoginData): Promise<ApiAuthResponse> {
        try {
            const response = await this.post<ApiAuthResponse>(
                API_ENDPOINTS.AUTH.LOGIN, 
                loginData
            );
            
            if (response.data.success && response.data.data) {
                const token = response.data.data.token;
                if (token) {
                    cookieService.set('authToken', token);
                }
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(registerData: RegisterData): Promise<ApiAuthResponse> {
        try {
            const response = await this.post<ApiAuthResponse>(
                API_ENDPOINTS.AUTH.REGISTER, 
                registerData
            );
            console.log('Register response:', response);
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    async updateProfile(userId: string, userData: Partial<RegisterData>): Promise<ApiAuthResponse> {
        try {
            const response = await this.put<ApiAuthResponse>(
                API_ENDPOINTS.AUTH.UPDATE(userId), 
                userData
            );
            return response.data;
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    }

    logout(): void {
        cookieService.remove('authToken');
    }

    isAuthenticated(): boolean {
        return !!cookieService.get('authToken');
    }
}

// Export instance của AuthService
const authService = new AuthService();
export default authService;
