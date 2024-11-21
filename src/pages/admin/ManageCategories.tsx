import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const ManageCategories = () => {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Quản Lý Danh Mục Khóa Học</h1>
            {/* Danh sách danh mục */}
            <ul>
                <li>Danh mục 1</li>
                <li>Danh mục 2</li>
                <li>Danh mục 3</li>
            </ul>
            <button className="btn btn-primary">Thêm Danh Mục</button>
        </AdminLayout>
    );
};

export default ManageCategories;