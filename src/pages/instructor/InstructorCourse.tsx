import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import CourseList from '../../components/homepage/CourseList';
import { Link } from 'react-router-dom';
import InstructorLayout from '../../layouts/InstructorLayout';

const InstructorCourses = () => {
  return (
    <InstructorLayout>
      <h1 className="text-3xl font-bold mb-8">Quản lý Khóa học</h1>
      <Link to="/admin/add-course" className="btn btn-primary mb-4">
        <i className="bi bi-plus-circle-fill me-2"></i>Thêm Khóa Học
      </Link>
      <CourseList />
      {/* Thêm các chức năng khác liên quan đến khóa học ở đây */}
    </InstructorLayout>
  );
};

export default InstructorCourses;
