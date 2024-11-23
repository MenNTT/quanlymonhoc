import React from 'react';
import InstructorLayout from '../../layouts/InstructorLayout';

const InstructorDashboard = () => {
    return (
        <InstructorLayout>
            <h1 className="text-3xl font-bold mb-8">Bảng Điều Khiển Giảng Viên</h1>
            <div className="admin-content">
                <p>Chào mừng bạn đến với bảng điều khiển giảng viên!</p>
            </div>
        </InstructorLayout>
    );
};

export default InstructorDashboard;
