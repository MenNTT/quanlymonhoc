import { AuthResponse, LoginData, RegisterData } from '../models/user';
import BaseService from './base.service';
import { cookieService } from './cookie.service';

class AuthService extends BaseService {
    url: String = "/auth"

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(`${this.url}/login`, loginData);
    return response.data;
  }

  /**
   * Register a new user.
   * @param registerData - User's registration details.
   * @returns The registered user data.
   */
  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>(`${this.url}/register`, registerData);
    return response.data;
  }

  /**
   * Log out the user by removing the token from cookies.
   */
  logout(): void {
    cookieService.remove('authToken');
  }

  /**
   * Check if a user is authenticated by verifying the presence of a token.
   * @returns A boolean indicating if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!cookieService.get('authToken');
  }
}

// Export an instance of AuthService
const authService = new AuthService();
export const { login, register } = authService;
