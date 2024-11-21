import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const ManageInstructors = () => {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Quản Lý Giảng Viên</h1>
            {/* Danh sách giảng viên */}
            <ul>
                <li>Giảng viên 1</li>
                <li>Giảng viên 2</li>
                <li>Giảng viên 3</li>
            </ul>
            <button className="btn btn-primary">Thêm Giảng Viên</button>
        </AdminLayout>
    );
};

export default ManageInstructors;