import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';
import { CourseService } from '../../services/course.service';

const AddCourse = () => {
    
    console.log("aaa")
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        feeAmount: '',
        image: '',
        currency: 'VND'
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const courseRequest = {
                ...formData,
                feeAmount: parseFloat(formData.feeAmount)
            };
            
            await CourseService.createCourse(courseRequest);
            navigate('/admin/courses');
        } catch (error) {
            setError('Có lỗi xảy ra khi tạo khóa học');
            console.error('Error:', error);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Thêm Khóa Học</h1>
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên Khóa Học</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nhập tên khóa học"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô Tả</label>
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Nhập mô tả khóa học"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá (VNĐ)</label>
                    <input
                        type="number"
                        name="feeAmount"
                        className="form-control"
                        placeholder="Nhập giá khóa học"
                        value={formData.feeAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL Hình ảnh</label>
                    <input
                        type="url"
                        name="image"
                        className="form-control"
                        placeholder="Nhập URL hình ảnh"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Thêm Khóa Học</button>
                <Link to="/admin/courses" className="btn btn-secondary ml-2">Quay lại</Link>
            </form>
        </AdminLayout>
    );
};

export default AddCourse;