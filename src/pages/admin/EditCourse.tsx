import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useParams, Link } from 'react-router-dom';

const EditCourse = () => {
    const { id } = useParams();

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Chỉnh Sửa Khóa Học {id}</h1>
            {/* Form chỉnh sửa khóa học */}
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
                <button type="submit" className="btn btn-primary">Cập Nhật Khóa Học</button>
                <Link to="/admin/courses" className="btn btn-secondary ml-2">Quay lại</Link>
            </form>
        </AdminLayout>
    );
};

export default EditCourse;