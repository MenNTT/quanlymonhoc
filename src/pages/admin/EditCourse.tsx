import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/Course';

const EditCourse = () => {
    const { id_course } = useParams<{ id_course: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Course>({
        id: '',
        name: '',
        description: '',
        feeAmount: 0,
        currency: 'VND',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (id_course) {
                    const courseData = await CourseService.getCourseById(id_course);
                    setFormData(courseData);
                }
            } catch (error) {
                setError('Không thể tải thông tin khóa học');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id_course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await CourseService.updateCourse(formData);
            navigate('/admin/courses');
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật khóa học');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Chỉnh Sửa Khóa Học</h1>
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên Khóa Học</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
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
                        value={formData.image || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cập Nhật</button>
                <Link to="/admin/courses" className="btn btn-secondary ms-2">Quay lại</Link>
            </form>
        </AdminLayout>
    );
};

export default EditCourse;