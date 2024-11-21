import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="admin-container">
                <h1>Bảng điều khiển</h1>
                <div className="admin-content">
                    <div>Tổng quan nội dung</div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
