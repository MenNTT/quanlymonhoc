import React, { useState, useRef } from 'react';
import '../../../styles/TrainingProgramsDropdown.css'; // Tùy chỉnh CSS nếu cần

const TrainingProgramsDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const coursesByProgram: { [key: string]: string[] } = {
        'Data Analysis - Microsoft Platform': ['Microsoft Excel', 'Power BI', 'SQL Server'],
        'Data Analysis - Google Platform': ['Google Sheets', 'Google Data Studio', 'BigQuery'],
        'Chuyên đề Data Science & Machine Learning': ['Python', 'Machine Learning', 'Data Science'],
        'Lập trình ứng dụng': ['JavaScript', 'React', 'Node.js'],
        'Kiểm thử phần mềm': ['Manual Testing', 'Automation Testing', 'Selenium'],
        'Master DevOps Engineer': ['Docker', 'Kubernetes', 'CI/CD'],
        'Mạng máy tính': ['Networking Basics', 'Network Security', 'Cisco Certification'],
        'Tin học văn phòng': ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
        'Đồ họa đa truyền thông': ['Photoshop', 'Illustrator', 'After Effects'],
        'Tin học quốc tế': ['IC3 Certification', 'MOS Certification', 'IT Fundamentals'],
        'Digital Painting': ['Digital Art Fundamentals', 'Advanced Painting Techniques', 'Character Design'],
        '3D & Xử lý phim': ['3D Modeling', 'Video Editing', 'Post-production'],
        'Thiết kế website': ['HTML/CSS', 'JavaScript', 'Responsive Design'],
        'Internet Marketing': ['SEO', 'Google Analytics', 'Social Media Marketing'],
        'Lập trình di động': ['Flutter', 'React Native', 'iOS Development']
    };

    const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Tạo ref cho dropdown

    const handleMouseLeaveDropdown = (event: React.MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
            setHoveredProgram(null); // Đặt hoveredProgram về null khi chuột ra ngoài
            onClose(); // Gọi onClose
        }
    };

    const handleMouseEnterTitle = () => {
        setHoveredProgram(null); // Đặt hoveredProgram về null khi hover vào tiêu đề
    };

    return (
        <div
            className={`dropdown-menu ${isOpen ? 'show' : ''}`}
            onMouseLeave={handleMouseLeaveDropdown}
            style={{ minWidth: '600px' }}
            ref={dropdownRef}
        >
            <div className="d-flex p-3">
                {/* Phần bên trái */}
                <div className="me-4 flex-fill">
                    <h6 onMouseEnter={handleMouseEnterTitle}>Chương trình đào tạo</h6>
                    <hr className="bg-dark" />
                    <ul className="list-unstyled">
                        {Object.keys(coursesByProgram).map((program, index) => (
                            <li
                                key={index}
                                className="d-flex align-items-center mb-2"
                                onMouseEnter={() => setHoveredProgram(program)}
                            >
                                <i className="bi bi-book" style={{ fontSize: '1rem', marginRight: '10px' }}></i>
                                <a className="text-black text-decoration-none" href="">
                                    <span className="me-auto pe-2">{program}</span>
                                </a>
                                <i className="bi bi-chevron-right"></i>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Phần bên phải */}
                <div className="flex-fill">
                    {hoveredProgram ? (
                        <>
                            <h6>Khóa học của {hoveredProgram}</h6>
                            <hr className="bg-dark" />
                            <ul className="list-unstyled">
                                {coursesByProgram[hoveredProgram].map((course, index) => (
                                    <li key={index} className="d-flex align-items-center mb-2">
                                        <i className="bi bi-journal-code" style={{ fontSize: '1rem', marginRight: '10px' }}></i>
                                        <a className="text-black text-decoration-none" href="">
                                            <span className="me-auto">{course}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <>
                            <h6>Khóa học nổi bật</h6>
                            <hr className="bg-dark" />
                            <ul className="list-unstyled">
                                {Object.keys(coursesByProgram).map((program, index) => (
                                    <li key={index} className="d-flex align-items-center mb-2">
                                        <i className="bi bi-star" style={{ fontSize: '1rem', marginRight: '10px' }}></i>
                                        <a className="text-black text-decoration-none" href="">
                                            <span className="me-auto">{program}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainingProgramsDropdown;
