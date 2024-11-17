import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/course-detail.css';

// Existing course data
const latestCourses = [
    { id: 1, title: 'Khóa học Powerpoint', date: '2024-10-01', image: 'https://i.ytimg.com/vi/QqPSZdFrUCI/maxresdefault.jpg' },
    { id: 2, title: 'Khóa học Python', date: '2024-10-02', image: 'https://1.bp.blogspot.com/-1byRownUDZQ/YNSfcKEBLeI/AAAAAAAAAOQ/0wy0HkjY7CUmtgkB2XfuI5lipFvfuYXdgCPcBGAsYHg/s850/7-ung-dung-tuyet-voi-ma-lap-trinh-python-lam-duoc-1.jpg' },
    { id: 3, title: 'Khóa học Java Spring Boot', date: '2024-10-03', image: 'https://tse2.mm.bing.net/th?id=OIP.JuXosiWTdcCTFwkuzWVYSwHaFH&pid=Api&P=0&h=220' },
    { id: 4, title: 'Khóa học React.js', date: '2024-10-04', image: 'https://tse1.mm.bing.net/th?id=OIP.umXj7kc766dOPpjavaBmLQHaEo&pid=Api&P=0&h=220' },
    { id: 5, title: 'Khóa học Android Development', date: '2024-10-05', image: 'https://www.freecodecamp.org/news/content/images/size/w2000/2020/08/android.png' },
];

const CourseDetail: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('lich-khai-giang');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Left section: Course information */}
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img src="https://nanado.edu.vn/uploads/images/blog/admin/2024/01/17/lap-trinh-net-la-gi-va-nhung-ky-nang-can-co-1705440293.webp" className="card-img-top" alt="Course" />
                        <div className="card-body">
                            <h2 className="card-title text-center">KHOÁ HỌC LẬP TRÌNH .NET</h2>
                            <div className="course-description mt-3 mb-4">
                                <p className="text-muted">
                                    Khóa học Lập trình .NET từ cơ bản đến nâng cao giúp bạn thành thạo các kỹ năng:
                                </p>
                                <ul className="list-unstyled">
                                    <li>✓ Lập trình C# và .NET Core Framework</li>
                                    <li>✓ Phát triển ứng dụng Web với ASP.NET Core MVC</li>
                                    <li>✓ Xây dựng REST API với ASP.NET Core Web API</li>
                                    <li>✓ Làm việc với Entity Framework Core và SQL Server</li>
                                    <li>✓ Triển khai ứng dụng theo mô hình Design Pattern</li>
                                </ul>
                                <p className="text-muted">
                                    Thời lượng: 156 giờ (25 tuần) | Học phí: 8.000.000đ
                                </p>
                            </div>
                            <ul className="nav nav-tabs justify-content-center mt-4">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link fw-bold btn-outline-primary ${activeTab === 'lich-khai-giang' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('lich-khai-giang')}
                                    >
                                        Lịch khai giảng
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link fw-bold btn-outline-primary ${activeTab === 'thong-tin' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('thong-tin')}
                                    >
                                        Thông tin
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link fw-bold btn-outline-primary ${activeTab === 'noi-dung' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('noi-dung')}
                                    >
                                        Nội dung
                                    </button>
                                </li>
                            </ul>

                            {/* Tab content */}
                            {activeTab === 'lich-khai-giang' && (
                                <div className="mt-4">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="bg-primary text-white">Ca học</th>
                                                <th className="bg-primary text-white">Thời gian</th>
                                                <th className="bg-primary text-white">Ngày khai giảng</th>
                                                <th className="bg-primary text-white">Địa điểm</th>
                                                <th className="bg-primary text-white"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Ca 1</td>
                                                <td>08:00 - 10:00</td>
                                                <td>2024-11-01</td>
                                                <td>TP. Hồ Chí Minh</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn btn-success btn-sm"
                                                                onClick={() => navigate('/payment')}>
                                                            Đăng ký
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ca 2</td>
                                                <td>14:00 - 16:00</td>
                                                <td>2024-11-05</td>
                                                <td>Hà Nội</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn btn-success btn-sm"
                                                                onClick={() => navigate('/payment')}>
                                                            Đăng ký
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ca 3</td>
                                                <td>18:00 - 20:00</td>
                                                <td>2024-11-10</td>
                                                <td>Đà Nẵng</td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn btn-success btn-sm"
                                                                onClick={() => navigate('/payment')}>
                                                            Đăng ký
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'noi-dung' && (
                                <div className="mt-4">
                                    <h3 className="text-center mb-4">Khung Đề Cương Lập Trình Viên .NET</h3>
                                    <p className="text-center text-muted">Tổng thời lượng: 156 giờ - 5 Nhóm chuyên đề (Module)</p>
                                    
                                    <div className="accordion" id="courseContent">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#module1">
                                                    Module 1: Nền tảng lập trình C# (36 giờ)
                                                </button>
                                            </h2>
                                            <div id="module1" className="accordion-collapse collapse show">
                                                <div className="accordion-body">
                                                    <ul>
                                                        <li>Giới thiệu về C# và .NET Framework</li>
                                                        <li>Cú pháp cơ bản và kiểu dữ liệu</li>
                                                        <li>Cấu trúc điều khiển và vòng lặp</li>
                                                        <li>Mảng và Collections</li>
                                                        <li>Lập trình hướng đối tượng với C#</li>
                                                        <li>Xử lý ngoại lệ và Debug</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#module2">
                                                    Module 2: ASP.NET Core MVC (40 giờ)
                                                </button>
                                            </h2>
                                            <div id="module2" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <ul>
                                                        <li>Kiến trúc MVC và Routing</li>
                                                        <li>Controllers và Actions</li>
                                                        <li>Razor Views và Layout</li>
                                                        <li>Model Binding và Validation</li>
                                                        <li>Entity Framework Core</li>
                                                        <li>Authentication và Authorization</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#module3">
                                                    Module 3: Web API và Microservices (30 giờ)
                                                </button>
                                            </h2>
                                            <div id="module3" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <ul>
                                                        <li>RESTful API Design</li>
                                                        <li>API Documentation với Swagger</li>
                                                        <li>JWT Authentication</li>
                                                        <li>Microservices Architecture</li>
                                                        <li>Docker và Containerization</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'thong-tin' && (
                                <div className="mt-4">
                                    <h3 className="text-center mb-4">Thông Tin Khóa Học</h3>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">📚 Đối tượng học viên</h5>
                                                    <ul className="list-unstyled">
                                                        <li>✓ Sinh viên CNTT các trường Đại học, Cao đẳng</li>
                                                        <li>✓ Người đi làm muốn chuyển nghề sang lập tr��nh</li>
                                                        <li>✓ Lập trình viên muốn nâng cao kỹ năng .NET</li>
                                                        <li>✓ Người mới bắt đầu học lập trình (có định hướng .NET)</li>
                                                        <li>✓ Người đã có kiến thức lập trình cơ bản</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">🎯 Mục tiêu đào tạo</h5>
                                                    <ul className="list-unstyled">
                                                        <li>✓ Nắm vững nền tảng lập trình C# và .NET Core</li>
                                                        <li>✓ Thành thạo ASP.NET Core MVC và Web API</li>
                                                        <li>✓ Hiểu sâu về Entity Framework Core và LINQ</li>
                                                        <li>✓ Biết cách xây dựng ứng dụng theo kiến trúc Microservices</li>
                                                        <li>✓ Thực hành với các dự án thực tế trong doanh nghiệp</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right section: Latest courses */}
                <div className="col-md-4">
                    <h4 className="text-center mb-4">Khóa học mới nhất</h4>
                    <hr className='text-black'></hr>
                    {latestCourses.map(course => (
                        <div key={course.id} className="card mb-3">
                            <img src={course.image} className="card-img-top" alt={course.title} />
                            <div className="card-body d-flex flex-column text-center">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">Ngày đăng: {course.date}</p>
                                <button className="btn btn-primary w-100 mt-auto">Chi tiết</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;