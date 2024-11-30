import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CourseService } from '../../services/course.service';
import { FaClock, FaUsers, FaStar, FaEdit, FaTrash, FaShoppingCart, FaMapMarkerAlt, FaBook, FaLanguage } from 'react-icons/fa';
import '../../styles/course-detail.css';
import { useCart } from '../../contexts/CartContext';
import { Course as CourseType } from '../../models/Course';
import { CartService } from '../../services/cart.service';
import { useAuth } from '../../contexts/AuthContext';

interface CourseDetailProps {
    isAdminView?: boolean;
}

interface ClassSession {
    id: string;
    startDate: string;
    endDate: string;
    schedule: string;
    availableSeats: number;
    location: string;
    instructor: string;
    classroom: string;
    totalHours: number;
    duration: string;
    address: string;
    instructorTitle: string;
    instructorExp: number;
    maxStudents: number;
    studyMode: string;
    language: string;
    registrationDeadline?: string;
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
    const [classes, setClasses] = useState<ClassSession[]>([
        {
            id: '1',
            startDate: '2024-04-01',
            endDate: '2024-05-30',
            schedule: 'Thứ 2, 4, 6 (19:00 - 21:00)',
            availableSeats: 20,
            location: 'Cơ sở Hà Nội',
            instructor: 'ThS. Nguyễn Văn A',
            classroom: 'Phòng 301',
            totalHours: 12,
            duration: '8 tuần',
            address: 'Địa chỉ Hà Nội',
            instructorTitle: 'ThS.',
            instructorExp: 5,
            maxStudents: 30,
            studyMode: 'Online',
            language: 'Tiếng Anh'
        },
        {
            id: '2',
            startDate: '2024-04-15',
            endDate: '2024-06-15',
            schedule: 'Thứ 3, 5, 7 (18:30 - 20:30)',
            availableSeats: 15,
            location: 'Cơ sở Hồ Chí Minh',
            instructor: 'TS. Trần Thị B',
            classroom: 'Phòng 205',
            totalHours: 18,
            duration: '8 tuần',
            address: 'Địa chỉ Hồ Chí Minh',
            instructorTitle: 'TS.',
            instructorExp: 7,
            maxStudents: 25,
            studyMode: 'Offline',
            language: 'Tiếng Việt'
        }
    ]);

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
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Course Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.name}</h1>
                    <div className="flex items-center space-x-6 text-gray-600">
                        <div className="flex items-center">
                            <FaClock className="w-5 h-5 mr-2" />
                            <span>Thời lượng: {course.detail?.duration || '8 tuần'}</span>
                        </div>
                        <div className="flex items-center">
                            <FaUsers className="w-5 h-5 mr-2" />
                            <span>Học viên: 120+</span>
                        </div>
                        <div className="flex items-center">
                            <FaStar className="w-5 h-5 mr-2 text-yellow-400" />
                            <span>Đánh giá: 4.8/5</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Content - Course Details */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="bg-white rounded-xl shadow-sm">
                            {/* Tabs Navigation */}
                            <div className="border-b">
                                <div className="flex space-x-8 px-6">
                                    {['description', 'overview', 'curriculum', 'classes', 'reviews'].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`py-4 px-2 relative
                                                ${activeTab === tab 
                                                    ? 'text-purple-600 font-medium border-b-2 border-purple-600' 
                                                    : 'text-gray-500 hover:text-gray-700'}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab === 'description' && 'Mô tả'}
                                            {tab === 'overview' && 'Tổng quan'}
                                            {tab === 'curriculum' && 'Nội dung khóa học'}
                                            {tab === 'classes' && 'Lớp học'}
                                            {tab === 'reviews' && 'Đánh giá'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
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
                                {activeTab === 'classes' && (
                                    <div className="bg-white p-6">
                                        <h2 className="text-2xl font-bold mb-6 text-center">Lịch khai giảng</h2>
                                        
                                        <div className="overflow-x-auto custom-scrollbar" style={{ maxHeight: '600px' }}>
                                            <table className="min-w-full bg-gray-50 rounded-lg">
                                                <thead>
                                                    <tr className="bg-gray-100 border-b">
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                                            Lịch học
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                                            Thời gian
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                                            Địa điểm
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                                            Giảng viên
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                                            Thông tin thêm
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                                            Số chỗ còn lại
                                                        </th>
                                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                                            Đăng ký
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {classes.map((classSession) => (
                                                        <tr key={classSession.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="text-purple-600 font-medium">
                                                                    {classSession.schedule}
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    {classSession.totalHours} giờ học
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center text-sm">
                                                                        <span className="text-gray-500 min-w-[70px]">Bắt đầu:</span>
                                                                        <span className="font-medium ml-2">
                                                                            {new Date(classSession.startDate).toLocaleDateString('vi-VN')}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center text-sm">
                                                                        <span className="text-gray-500 min-w-[70px]">Kết thúc:</span>
                                                                        <span className="font-medium ml-2">
                                                                            {new Date(classSession.endDate).toLocaleDateString('vi-VN')}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 mt-1">
                                                                        <span className="font-medium">Thời lượng:</span> {classSession.duration || '8 tuần'}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div>
                                                                    <div className="font-medium text-gray-900">{classSession.location}</div>
                                                                    <div className="text-sm text-gray-500 mt-1">{classSession.classroom}</div>
                                                                    <div className="text-xs text-gray-500 mt-2">
                                                                        <div className="flex items-center">
                                                                            <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                                                                            {classSession.address}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="space-y-2">
                                                                    <div className="font-medium text-gray-900">{classSession.instructor}</div>
                                                                    <div className="text-sm text-gray-500">{classSession.instructorTitle}</div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {classSession.instructorExp} năm kinh nghiệm
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="space-y-2 text-sm">
                                                                    <div className="flex items-center text-gray-600">
                                                                        <FaUsers className="w-4 h-4 mr-2" />
                                                                        <span>Sĩ số tối đa: {classSession.maxStudents} học viên</span>
                                                                    </div>
                                                                    <div className="flex items-center text-gray-600">
                                                                        <FaBook className="w-4 h-4 mr-2" />
                                                                        <span>Hình thức: {classSession.studyMode}</span>
                                                                    </div>
                                                                    <div className="flex items-center text-gray-600">
                                                                        <FaLanguage className="w-4 h-4 mr-2" />
                                                                        <span>Ngôn ngữ: {classSession.language}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="text-center">
                                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm
                                                                        ${classSession.availableSeats > 10 
                                                                            ? 'bg-green-100 text-green-800' 
                                                                            : classSession.availableSeats > 5
                                                                            ? 'bg-yellow-100 text-yellow-800'
                                                                            : 'bg-red-100 text-red-800'}`}>
                                                                        {classSession.availableSeats} chỗ
                                                                    </span>
                                                                    <div className="text-xs text-gray-500 mt-2">
                                                                        Đã đăng ký: {classSession.maxStudents - classSession.availableSeats}/{classSession.maxStudents}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <button
                                                                    onClick={() => handleEnrollCourse()}
                                                                    className="inline-flex justify-center px-4 py-2 bg-purple-600 
                                                                        text-white text-sm font-medium rounded-lg hover:bg-purple-700 
                                                                        transition-colors duration-300"
                                                                >
                                                                    Đăng ký ngay
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Mobile View */}
                                        <div className="md:hidden space-y-4 mt-4">
                                            {classes.map((classSession) => (
                                                <div key={classSession.id} className="bg-white border rounded-lg p-4">
                                                    <div className="space-y-3">
                                                        <div className="text-purple-600 font-medium">
                                                            {classSession.schedule}
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                                            <div className="text-gray-500">Thời gian:</div>
                                                            <div>
                                                                <div>Bắt đầu: {new Date(classSession.startDate).toLocaleDateString('vi-VN')}</div>
                                                                <div>Kết thúc: {new Date(classSession.endDate).toLocaleDateString('vi-VN')}</div>
                                                            </div>
                                                            
                                                            <div className="text-gray-500">Địa điểm:</div>
                                                            <div>
                                                                <div>{classSession.location}</div>
                                                                <div className="text-gray-500">{classSession.classroom}</div>
                                                            </div>
                                                            
                                                            <div className="text-gray-500">Giảng viên:</div>
                                                            <div>{classSession.instructor}</div>
                                                            
                                                            <div className="text-gray-500">Số chỗ:</div>
                                                            <div>{classSession.availableSeats} chỗ</div>
                                                        </div>

                                                        <button
                                                            onClick={() => handleEnrollCourse()}
                                                            className="w-full mt-2 px-4 py-2 bg-purple-600 text-white 
                                                                text-sm font-medium rounded-lg hover:bg-purple-700 
                                                                transition-colors duration-300"
                                                        >
                                                            Đăng ký ngay
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Course Actions */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                    {formatPrice(course.feeAmount, course.currency)}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button 
                                    onClick={handleEnrollCourse}
                                    disabled={isEnrolling}
                                    className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 
                                        text-white font-medium rounded-lg transition-colors duration-300"
                                >
                                    {isEnrolling ? 'Đang xử lý...' : 'Đăng ký khóa học'}
                                </button>

                                <button 
                                    onClick={() => handleAddToCart(course)}
                                    className="w-full py-3 px-4 border border-gray-300 text-gray-700 
                                        font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300
                                        flex items-center justify-center"
                                >
                                    <FaShoppingCart className="w-5 h-5 mr-2" />
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;