import React, { useState, useEffect } from 'react';
import '../../styles/CourseList.css';
import { BsCalendar2Event, BsCashStack } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/Course';
import SchoolIcon from '@mui/icons-material/School';

const CourseList: React.FC = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [visibleCourses, setVisibleCourses] = useState<number>(8);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const coursesData = await CourseService.getAllCourses();
                console.log('Fetched courses:', coursesData); // For debugging
                setCourses(coursesData);
            } catch (err) {
                setError('Không thể tải danh sách khóa học');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Make sure displayedCourses is always an array
    const displayedCourses = Array.isArray(courses) ? courses.slice(0, visibleCourses) : [];

    const loadMoreCourses = () => {
        setVisibleCourses(prev => Math.min(prev + 4, courses.length));
    };

    const formatDate = (dateString: string | Date | undefined) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const formatPrice = (amount: number, currency: string) => {
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center course-list-subject">Danh sách khóa học</h2>
            <div className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <p>
                    Chương trình học đa dạng và thường xuyên cập nhật công nghệ mới.
                    Hãy để chúng tôi đồng hành cùng bạn trên hành trình chinh phục tri thức.
                </p>
            </div>

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            
            {!loading && !error && courses.length === 0 && (
                <div className="alert alert-info text-center" role="alert">
                    Chưa có khóa học nào được thêm vào.
                </div>
            )}
            
            {!loading && !error && courses.length > 0 && (
                <>
                    <div className="row">
                        {courses.slice(0, visibleCourses).map((course) => (
                            <div key={course.id} className="col-md-3 col-sm-6 mb-4">
                                <div className="card course-card h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title mb-2">{course.name}</h6>
                                        <p className="card-text text-muted mb-3">
                                            {course.description.length > 100 
                                                ? `${course.description.substring(0, 100)}...` 
                                                : course.description}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="text-muted small">
                                                    <BsCalendar2Event className="me-1" />
                                                    {new Date(course.createdAt).toLocaleDateString('vi-VN')}
                                                </div>
                                                <div className="text-success">
                                                    <BsCashStack className="me-1" />
                                                    {formatPrice(course.feeAmount, course.currency)}
                                                </div>
                                            </div>
                                            <button 
                                                className="btn btn-primary w-100" 
                                                onClick={() => navigate(`/course-detail/${course.id}`)}
                                            >
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {courses.length > visibleCourses && (
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-primary px-4"
                                onClick={() => setVisibleCourses(prev => prev + 4)}
                            >
                                Xem thêm
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CourseList;