import React, { useEffect, useState } from 'react';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/MyCourses.css';

const MyCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                if (!user?.id) {
                    navigate('/login');
                    return;
                }

                const enrolledCourses = await CourseService.getEnrolledCourses();
                console.log('Enrolled courses:', enrolledCourses);
                
                if (Array.isArray(enrolledCourses)) {
                    setCourses(enrolledCourses);
                } else {
                    setCourses([]);
                }
            } catch (err: any) {
                console.error('Error fetching enrolled courses:', err);
                setError(err.message || 'Không thể tải danh sách khóa học');
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, [user, navigate]);

    const handleContinueLearning = (courseId: string) => {
        navigate(`/learning/${courseId}`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Đang tải khóa học...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="alert alert-danger">
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="retry-button"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="my-courses-container">
            <div className="courses-header">
                <h1 className="courses-title">Khóa học của tôi</h1>
                {(!courses || courses.length === 0) && (
                    <div className="empty-courses">
                        <p>Bạn chưa đăng ký khóa học nào</p>
                        <Link to="/courses" className="browse-courses-btn">
                            Khám phá khóa học
                        </Link>
                    </div>
                )}
            </div>

            {courses && courses.length > 0 && (
                <div className="course-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <div className="course-image-wrapper">
                                <img
                                    src={course.image || '/default-course-image.jpg'}
                                    alt={course.name}
                                    className="course-image"
                                />
                            </div>
                            <div className="course-content">
                                <h3 className="course-title">{course.name}</h3>
                                <p className="course-description">{course.description}</p>
                                <div className="course-footer">
                                    <span className="course-status">Đã đăng ký</span>
                                    <button 
                                        className="continue-learning-btn"
                                        onClick={() => handleContinueLearning(course.id)}
                                    >
                                        Tiếp tục học
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses; 