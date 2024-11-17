import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class BaseService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }
}
