import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CourseService } from '../../services/course.service';
import { FaClock, FaUsers, FaStar, FaEdit, FaTrash, FaShoppingCart } from 'react-icons/fa';
import '../../styles/course-detail.css';
import { useCart } from '../../contexts/CartContext';
import { Course as CourseType } from '../../models/Course';
import { CartService } from '../../services/cart.service';
import { useAuth } from '../../contexts/AuthContext';

interface CourseDetailProps {
    isAdminView?: boolean;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ isAdminView = false }) => {
    const navigate = useNavigate();
    const { id_course } = useParams<{ id_course: string }>();
    const [course, setCourse] = useState<CourseType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('description');
    const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                if (!id_course) return;
                const courseData = await CourseService.getCourseById(id_course);
                setCourse(courseData);
            } catch (err) {
                setError('Không thể tải thông tin khóa học');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id_course) {
            fetchCourse();
        }
    }, [id_course]);

    const formatPrice = (amount: number, currency: string) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency || 'VND'
        }).format(amount);
    };

    const handleAddToCart = async (course: CourseType) => {
        try {
            if (!user) {
                alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
                return;
            }
            
            await CartService.addToCart(course.id.toString(), user.id);
            await addToCart(course);
            alert('Đã thêm khóa học vào giỏ hàng!');
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };

    const handleEnrollCourse = async () => {
        try {
            setIsEnrolling(true);
            if (!id_course) return;
            navigate(`/payment/${id_course}`);
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
            try {
                if (!id_course) return;
                await CourseService.deleteCourse(id_course);
                alert('Xóa khóa học thành công!');
                navigate('/admin/courses');
            } catch (err) {
                console.error(err);
                alert('Không thể xóa khóa học. Vui lòng thử lại sau.');
            }
        }
    };

    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (error) return <div className="alert alert-danger m-5">{error}</div>;
    if (!course) return <div className="alert alert-warning m-5">Không tìm thấy khóa học</div>;

    return (
        <div className="min-h-screen bg-white text-gray-800 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Course Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                        {course.name}
                    </h1>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4" />
                            <span>Thời lượng: {course.detail?.duration || '8 tuần'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUsers className="w-4 h-4" />
                            <span>Học viên: 120+</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaStar className="w-4 h-4 text-yellow-500" />
                            <span>Đánh giá: 4.8/5</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        <div className="tabs-container bg-white shadow-lg rounded-lg p-1">
                            <div className="tab-list flex space-x-2 border-b">
                                {['description', 'overview', 'curriculum', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`tab-trigger px-4 py-2 rounded-t-md transition-all
                                            ${activeTab === tab 
                                                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                                                : 'text-gray-600 hover:text-blue-600'}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === 'description' && 'Mô tả'}
                                        {tab === 'overview' && 'Tổng quan'}
                                        {tab === 'curriculum' && 'Nội dung khóa học'}
                                        {tab === 'reviews' && 'Đánh giá'}
                                    </button>
                                ))}
                            </div>

                            <div className="tab-content mt-6">
                                {activeTab === 'description' && (
                                    <div className="bg-white p-6">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Giới thiệu</h2>
                                        <div className="space-y-4 text-gray-700">
                                            <p>{course.description}</p>
                                            
                                            <div className="mt-8">
                                                <h3 className="text-lg font-semibold mb-3 text-gray-900">Bạn sẽ học được gì?</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center">
                                                        <span className="text-green-500 mr-2">✓</span>
                                                        Kiến thức nền tảng và chuyên sâu
                                                    </li>
                                                    <li className="flex items-center">
                                                        <span className="text-green-500 mr-2">✓</span>
                                                        Kỹ năng thực hành thực tế
                                                    </li>
                                                    <li className="flex items-center">
                                                        <span className="text-green-500 mr-2">✓</span>
                                                        Chứng chỉ sau khi hoàn thành khóa học
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                {formatPrice(course.feeAmount, course.currency)}
                            </h3>
                            <div className="space-y-4">
                                <button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
                                    onClick={handleEnrollCourse}
                                    disabled={isEnrolling}
                                >
                                    {isEnrolling ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        'Đăng ký khóa học'
                                    )}
                                </button>
                                <button 
                                    className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-all flex items-center justify-center"
                                    onClick={() => handleAddToCart(course)}
                                >
                                    <FaShoppingCart className="mr-2 h-4 w-4" />
                                    Thêm vào giỏ hàng
                                </button>
                                {isAdminView && (
                                    <Link to={`/admin/courses/edit/${id_course}`} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all flex items-center justify-center">
                                        <FaEdit className="mr-2 h-4 w-4" />
                                        Chnh sửa khóa học
                                    </Link>
                                )}
                                {isAdminView && (
                                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center" onClick={handleDelete}>
                                        <FaTrash className="mr-2 h-4 w-4" />
                                        Xóa khóa học
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;