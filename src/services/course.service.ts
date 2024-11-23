import axios from 'axios';
import { Course } from '../models/Course';
import { API_ENDPOINTS } from '../constants/api/api.config';

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
            await axios.post(API_ENDPOINTS.COURSE.ENROLL, {
                courseId,
            });
        } catch (error) {
            console.error('Error enrolling in course:', error);
            throw new Error('Không thể đăng ký khóa học');
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
} 