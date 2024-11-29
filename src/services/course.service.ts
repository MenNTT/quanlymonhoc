import axios from './axios.config';
import { Course } from '../models/Course';
import { API_ENDPOINTS } from '../constants/api/api.config';
import { useAuth } from '../contexts/AuthContext';
import {cookieService} from "./cookie.service.ts";

const getAuthHeader = () => {
    const token = cookieService.get('authToken');
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

export const CourseService = {
    getAllCourses: async (): Promise<Course[]> => {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.GET_ALL);
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Không thể tải danh sách khóa học');
        }
    },

    getCourseById: async (id: string): Promise<Course> => {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.GET_BY_ID(id));
            return response.data;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw new Error('Không thể tải thông tin khóa học');
        }
    },

    createCourse: async (courseData: Partial<Course>): Promise<Course> => {
        try {
            const response = await axios.post(API_ENDPOINTS.COURSE.CREATE, courseData, getAuthHeader());
            return response.data.course;
        } catch (error) {
            console.error('Error creating course:', error);
            throw new Error('Không thể tạo khóa học');
        }
    },

    updateCourse: async (courseData: Course): Promise<Course> => {
        try {
            const response = await axios.put(API_ENDPOINTS.COURSE.UPDATE, courseData);
            return response.data.course;
        } catch (error) {
            console.error('Error updating course:', error);
            throw new Error('Không thể cập nhật khóa học');
        }
    },

    deleteCourse: async (id: string): Promise<void> => {
        try {
            await axios.delete(API_ENDPOINTS.COURSE.DELETE(id));
        } catch (error) {
            console.error('Error deleting course:', error);
            throw new Error('Không thể xóa khóa học');
        }
    },

    enrollCourse: async (userId: string, courseId: string) => {
        try {
            const response = await axios.post(API_ENDPOINTS.COURSES.ENROLL, {
                accountId: userId,
                courseId
            },
            {
                headers: {
                    Authorization: `Bearer ${cookieService.get('authToken')}`
                }
            }
            );
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Có lỗi xảy ra khi đăng ký khóa học');
        }
    },

    getTotalRevenue: async (): Promise<number> => {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSE.REVENUE);
            return response.data.totalRevenue;
        } catch (error) {
            console.error('Error fetching total revenue:', error);
            throw new Error('Không thể tải thông tin doanh thu');
        }
    },

    getRecentCourses: async (): Promise<Course[]> => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.COURSE.RECENT,
                getAuthHeader()
            );
            return response.data;
        } catch (error: any) {
            console.error('Error fetching recent courses:', error.response || error);
            throw new Error('Không thể tải danh sách khóa học mới');
        }
    },

    getEnrolledCourses: async (): Promise<Course[]> => {
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
    },

    getMyCourses: async (userId: string) => {
        try {
            const response = await axios.get(API_ENDPOINTS.COURSES.GET_MY_COURSES(userId));
            return response.data;
        } catch (error: any) {
            throw new Error('Không thể tải danh sách khóa học');
        }
    }
}; 