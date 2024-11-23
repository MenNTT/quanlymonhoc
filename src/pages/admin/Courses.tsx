import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CourseList from '../../components/homepage/CourseList';
import { Link } from 'react-router-dom';

const Courses = () => {
    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Quản lý Khóa học</h1>
                    <Link 
                        to="/admin/add-course"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        Thêm Khóa Học
                    </Link>
                </div>
                <CourseList isAdminView={true} />
            </div>
        </AdminLayout>
    );
};

export default Courses;
