import { User } from '../models/user';
import BaseService from './base.service';

class UserService extends BaseService {
    url: String = "/users"

    async getAllUsers(): Promise<User[]> {
        const response = await this.get<User[]>('/getAll');
        return response.data;
    }

    async getUserById(id: number): Promise<User> {
        const response = await this.get<User>(`/get/${id}`);
        return response.data;
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const response = await this.post<User>('/create', user);
        return response.data;
    }

    async updateUser(id: number, user: Partial<User>): Promise<User> {
        const response = await this.put<User>(`/update`, user);
        return response.data;
    }

    async deleteUser(id: number): Promise<void> {
        await this.delete<void>(`/delete/${id}`);
    }
}

// Export an instance of the UserService
const userService = new UserService();
export default userService;
