import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CourseDetail from '../coursedetail/CourseDetail';

const AdminCourseDetail = () => {
    return (
        <AdminLayout>
            <CourseDetail isAdminView={true} />
        </AdminLayout>
    );
};

export default AdminCourseDetail; 