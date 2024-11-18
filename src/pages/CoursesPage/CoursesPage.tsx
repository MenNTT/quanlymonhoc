import React, { useState } from 'react';
import CourseList from '../../components/homepage/CourseList';
import './CoursesPage.css';

const CoursesPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');

    return (
        <div className="courses-page">
            <div className="container py-4">
                {/* Page Header */}
                <div className="text-center mb-5">
                    <h1 className="page-title">Danh sách khóa học</h1>
                    <p className="lead text-muted">
                        Khám phá các khóa học chất lượng cao từ các giảng viên hàng đầu
                    </p>
                </div>

                {/* Filters Section */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <select 
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Tất cả danh mục</option>
                            <option value="programming">Lập trình</option>
                            <option value="design">Thiết kế</option>
                            <option value="business">Kinh doanh</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select 
                            className="form-select"
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                        >
                            <option value="all">Tất cả trình độ</option>
                            <option value="beginner">Cơ bản</option>
                            <option value="intermediate">Trung cấp</option>
                            <option value="advanced">Nâng cao</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select 
                            className="form-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="popular">Phổ biến nhất</option>
                            <option value="price-low">Giá thấp đến cao</option>
                            <option value="price-high">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>

                {/* Course List */}
                <CourseList />
            </div>
        </div>
    );
};

export default CoursesPage; 