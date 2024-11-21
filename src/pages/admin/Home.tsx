// src/pages/admin/Home.tsx
import { CourseService } from '../../services/course.service';
import AdminLayout from '../../layouts/AdminLayout';
import UserService from '../../services/user.service';
import { useState, useEffect } from 'react';
import { User } from '../../models/user'; // Import model User
import { Course } from '../../models/Course'; // Import model Course

const Home = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [newCourses, setNewCourses] = useState<Course[]>([]);
    const [newUsers, setNewUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const revenue = await CourseService.getTotalRevenue();
                const courses = await CourseService.getAllCourses();
                const usersResponse = await UserService.getAllUsers();
                const recentCourses = await CourseService.getRecentCourses();
                const recentUsers = await UserService.getRecentUsers();

                setTotalRevenue(revenue);
                setTotalCourses(courses.length);
                setTotalUsers(usersResponse.data ? usersResponse.data.length : 0);
                setNewCourses(recentCourses);
                setNewUsers(recentUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Trang Chính</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tổng Doanh Thu</h5>
                            <p className="card-text">{totalRevenue} VNĐ</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Số Lượng Khóa Học</h5>
                            <p className="card-text">{totalCourses}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Số Lượng Người Dùng</h5>
                            <p className="card-text">{totalUsers}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="mt-4">Khóa Học Mới</h2>
            <ul>
                {newCourses.map(course => (
                    <li key={course.id}>{course.name}</li>
                ))}
            </ul>
            <h2 className="mt-4">Người Dùng Mới</h2>
            <ul>
                {newUsers.map(user => (
                    <li key={user.id}>{user.fullName}</li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default Home;