import { User } from '../models/user';
import BaseService from './base.service';
import { API_ENDPOINTS, ApiResponse } from '../constants/api/api.config';

class UserService extends BaseService {
    async getAllUsers(): Promise<ApiResponse<User[]>> {
        const response = await this.get<ApiResponse<User[]>>(
            API_ENDPOINTS.ACCOUNT.GET_ALL
        );
        return response.data;
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
}

const userService = new UserService();
export default userService;
