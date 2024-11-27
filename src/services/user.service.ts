// src/services/user.service.ts
import { User } from '../models/user';
import BaseService from './base.service';
import { API_ENDPOINTS, ApiResponse } from '../constants/api/api.config';
import { cookieService } from './cookie.service';

class UserService extends BaseService {
    async getAllUsers(): Promise<ApiResponse<User[]>> {
        const response = await this.get<ApiResponse<User[]>>(
            API_ENDPOINTS.ACCOUNT.GET_ALL
        );
        return response.data;
    }

    async getRecentUsers(): Promise<User[]> {
        const response = await this.get<ApiResponse<User[]>>(API_ENDPOINTS.ACCOUNT.GET_RECENT);
        // Ensure that we return the data as an array of User
        return response.data?.data || []; // Return an empty array if data is undefined
    }

    async getUserById(id: string): Promise<ApiResponse<User>> {
        const response = await this.get<ApiResponse<User>>(
            API_ENDPOINTS.ACCOUNT.GET_BY_ID(id)
        );
        return response.data;
    }

    async createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
        const response = await this.post<ApiResponse<User>>(
            API_ENDPOINTS.ACCOUNT.CREATE, 
            user
        );
        return response.data;
    }

    async updateUser(id: string, user: Partial<User>): Promise<ApiResponse<User>> {
        const response = await this.put<ApiResponse<User>>(
            API_ENDPOINTS.ACCOUNT.UPDATE, 
            { ...user, id }
        );
        return response.data;
    }

    async deleteUser(id: string): Promise<ApiResponse<void>> {
        const response = await this.delete<ApiResponse<void>>(
            API_ENDPOINTS.ACCOUNT.DELETE(id)
        );
        return response.data;
    }

    async updateProfile(userId: string, userData: {
        fullName: string;
        phoneNumber?: string;
        address?: string;
        birthDate?: string;
    }): Promise<ApiResponse<User>> {
        try {
            const token = cookieService.get('authToken');
            console.log('Updating profile for user:', userId);
            console.log('Update data:', userData);

            if (!token) {
                return {
                    success: false,
                    message: 'Không tìm thấy token xác thực'
                };
            }

            const response = await this.put<ApiResponse<User>>(
                API_ENDPOINTS.ACCOUNT.UPDATE,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Update profile response:', response);
            return response.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            
            if (error.response?.status === 401) {
                return {
                    success: false,
                    message: 'Phiên đăng nhập đã hết hạn'
                };
            }
            if (error.response?.status === 403) {
                return {
                    success: false,
                    message: 'Bạn không có quyền cập nhật thông tin này'
                };
            }
            return {
                success: false,
                message: error.response?.data?.message || 'Cập nhật thông tin thất bại'
            };
        }
    }
}

const userService = new UserService();
export default userService;