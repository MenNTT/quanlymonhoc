import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/course-detail.css';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/Course';

const CourseDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id_course } = useParams<{ id_course: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const courseData = await CourseService.getCourseById(Number(id_course));
                setCourse(courseData);
            } catch (err) {
                setError('Failed to fetch course details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id_course) {
            fetchCourse();
        }
    }, [id_course]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    const [activeTab, setActiveTab] = useState<string>('lich-khai-giang');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
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
            {course && (
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h2 className="card-title text-center">{course.name}</h2>
                                <div className="course-description mt-3 mb-4">
                                    <p className="text-muted">{course.description}</p>
                                    <p className="text-muted">
                                        Học phí: {formatPrice(course.feeAmount, course.currency)}
                                    </p>
                                </div>
                                
                                {/* ... rest of the tabs and content ... */}
                            </div>
                        </div>
                    </div>
                    
                    {/* ... right section ... */}
                </div>
            )}
        </div>
    );
};

export default CourseDetail;