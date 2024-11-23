import React, { useEffect, useState } from 'react';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

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

    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (error) return <div className="alert alert-danger m-5">{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={course.image || '/default-course-image.jpg'}
                        alt={course.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{course.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: course.currency || 'VND'
                                }).format(course.feeAmount)}
                            </span>
                            
                            <div className="flex gap-2">
                                <Link 
                                    to={isAdminView ? `/admin/courses/${course.id}` : `/course-detail/${course.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                >
                                    Xem chi tiết
                                </Link>
                                
                                {isAdminView && (
                                    <>
                                        <Link 
                                            to={`/admin/courses/edit/${course.id}`}
                                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                                            title="Chỉnh sửa"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                            title="Xóa"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseList;