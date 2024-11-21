import axios from 'axios';
import { Course } from '../models/Course';
import { API_ENDPOINTS } from '../constants/api/api.config';

export class CourseService {
    static async getTotalRevenue(): Promise<number> {
        const response = await axios.get(API_ENDPOINTS.COURSE.REVENUE);
        return response.data.totalRevenue;
    }

    static async getRecentCourses(): Promise<Course[]> {
        const response = await axios.get(API_ENDPOINTS.COURSE.RECENT);
        return response.data;
    }

    static async getAllCourses(): Promise<Course[]> {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.GET_ALL);
            console.log('API Response:', response);
            console.log('Course Data:', response.data);

            if (response.data && Array.isArray(response.data)) {
                return response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Không thể tải danh sách khóa học');
        }
    }

    static async getCourseById(id: string): Promise<Course> {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.GET_BY_ID(id));
            if (!response.data) {
                throw new Error('Không tìm thấy khóa học');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw new Error('Không thể tải thông tin khóa học');
        }
    }
} 