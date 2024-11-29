import axios from 'axios';
import { Course } from '../models/Course';
import { API_ENDPOINTS } from '../constants/api/api.config';
import { useAuth } from '../contexts/AuthContext';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Vui lòng đăng nhập để tiếp tục');
    }
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export class CourseService {
    static async getAllCourses(): Promise<Course[]> {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.GET_ALL);
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Không thể tải danh sách khóa học');
        }
    }

    static async getCourseById(id: string): Promise<Course> {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.GET_BY_ID(id));
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw new Error('Không thể tải thông tin khóa học');
        }
    }

    static async createCourse(courseData: Partial<Course>): Promise<Course> {
        try {
            const response = await axios.post(API_ENDPOINTS.COURSE.CREATE, courseData);
            return response.data.course;
        } catch (error) {
            console.error('Error creating course:', error);
            throw new Error('Không thể tạo khóa học');
        }
    }

    static async updateCourse(courseData: Course): Promise<Course> {
        try {
            const response = await axios.put(API_ENDPOINTS.COURSE.UPDATE, courseData);
            return response.data.course;
        } catch (error) {
            console.error('Error updating course:', error);
            throw new Error('Không thể cập nhật khóa học');
        }
    }

    static async deleteCourse(id: string): Promise<void> {
        try {
            await axios.delete(API_ENDPOINTS.COURSE.DELETE(id));
        } catch (error) {
            console.error('Error deleting course:', error);
            throw new Error('Không thể xóa khóa học');
        }
    }

    static async enrollCourse(courseId: string): Promise<void> {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!user.id) {
                throw new Error('Vui lòng đăng nhập để đăng ký khóa học');
            }

            const response = await axios.post(
                API_ENDPOINTS.ENROLLMENT.ENROLL,
                {
                    userId: user.id,
                    courseId
                },
                getAuthHeader()
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Không thể đăng ký khóa học');
            }

            return response.data;
        } catch (error: any) {
            console.error('Enrollment error:', error);
            if (error.response?.status === 401) {
                throw new Error('Vui lòng đăng nhập để tiếp tục');
            }
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký khóa học');
        }
    }

    static async getTotalRevenue(): Promise<number> {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.REVENUE);
            return response.data.totalRevenue;
        } catch (error) {
            console.error('Error fetching total revenue:', error);
            throw new Error('Không thể tải thông tin doanh thu');
        }
    }

    static async getRecentCourses(): Promise<Course[]> {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.RECENT);
            return response.data;
        } catch (error) {
            console.error('Error fetching recent courses:', error);
            throw new Error('Không thể tải danh sách khóa học mới');
        }
    }

    static async getEnrolledCourses(): Promise<Course[]> {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const accountId = user.email;

            if (!accountId) {
                throw new Error('Vui lòng đăng nhập để xem khóa học');
            }

            const response = await axios.get(`${API_ENDPOINTS.ENROLLMENT.GET_BY_USER}/${accountId}`);
            return response.data;
        } catch (error: any) {
            console.error('Get enrolled courses error:', error);
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách khóa học');
        }
    }
} 