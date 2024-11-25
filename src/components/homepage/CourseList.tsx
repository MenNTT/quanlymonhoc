import React, { useEffect, useState } from 'react';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../styles/CourseList.css';
interface CourseListProps {
    isAdminView?: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ isAdminView = false }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await CourseService.getAllCourses();
                setCourses(data);
            } catch (err) {
                setError('Không thể tải danh sách khóa học');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
            try {
                await CourseService.deleteCourse(id);
                setCourses(courses.filter(course => course.id !== id));
                alert('Xóa khóa học thành công!');
            } catch (err) {
                console.error(err);
                alert('Không thể xóa khóa học. Vui lòng thử lại sau.');
            }
        }
    };

    const formatPrice = (amount: number, currency: string) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency || 'VND'
        }).format(amount);
    };

    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (error) return <div className="alert alert-danger m-5">{error}</div>;

    return (
        <div className="course-container">
            <div className="course-grid">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <Link to={isAdminView ? `/admin/courses/${course.id}` : `/course-detail/${course.id}`}>
                            <div className="course-image-wrapper">
                                <img
                                    src={course.image || '/default-course-image.jpg'}
                                    alt={course.name}
                                    className="course-image"
                                />
                            </div>
                            <div className="course-content">
                                <h3 className="course-title">{course.name}</h3>
                                <div className="course-date">
                                    Ngày đăng: {new Date(course.createdAt).toLocaleDateString('vi-VN')}
                                </div>
                                <div className="course-price">
                                    {formatPrice(course.feeAmount, course.currency)}
                                </div>
                            </div>
                        </Link>
                        {isAdminView && (
                            <div className="admin-actions">
                                <Link to={`/admin/courses/edit/${course.id}`}>
                                    <FaEdit />
                                </Link>
                                <button onClick={() => handleDelete(course.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;