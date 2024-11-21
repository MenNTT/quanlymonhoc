import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

const AddCourse = () => {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Thêm Khóa Học</h1>
            {/* Form thêm khóa học */}
            <form>
                <div className="mb-3">
                    <label className="form-label">Tên Khóa Học</label>
                    <input type="text" className="form-control" placeholder="Nhập tên khóa học" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô Tả</label>
                    <textarea className="form-control" placeholder="Nhập mô tả khóa học"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input type="number" className="form-control" placeholder="Nhập giá khóa học" />
                </div>
                <button type="submit" className="btn btn-primary">Thêm Khóa Học</button>
                <Link to="/admin/courses" className="btn btn-secondary ml-2">Quay lại</Link>
            </form>
        </AdminLayout>
    );
};

export default AddCourse;