import React from 'react';
import CourseList from '../../components/homepage/CourseList';

const Courses = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Danh sách khóa học</h1>
            <CourseList />
        </div>
    );
};

export default Courses; 