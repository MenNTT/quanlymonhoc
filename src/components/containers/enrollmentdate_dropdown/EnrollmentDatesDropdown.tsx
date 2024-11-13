import React from 'react';
import '../../../styles/EnrollmentDatesDropdown.css'; // Tạo file CSS nếu cần

const EnrollmentDatesDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const enrollmentDates = [
        { date: '01/01/2024', course: 'Khóa học A rất dài và dài hơn bình thường' },
        { date: '01/02/2024', course: 'Khóa học B' },
        { date: '01/03/2024', course: 'Khóa học C' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        { date: '01/04/2024', course: 'Khóa học D' },
        // Thêm ngày khai giảng nếu cần
    ];

    // Tạo các nhóm 10 ngày
    const groupedDates = [];
    for (let i = 0; i < enrollmentDates.length; i += 10) {
        groupedDates.push(enrollmentDates.slice(i, i + 10));
    }

    return (
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} onMouseLeave={onClose} style={{ width: 'auto', padding: '10px' }}>
            <div className="p-2">
                <h6>Lịch Khai Giảng</h6>
                <hr className="bg-dark" />
                <div className="row">
                    {/* Tự động tạo cột dựa trên số lượng nhóm */}
                    {groupedDates.map((group, groupIndex) => (
                        <div key={groupIndex} className="col mb-2 enrollment-date-column">
                            {group.map((entry, index) => (
                                <div key={index} className="enrollment-date-item">
                                    <i className="bi bi-book" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                                    <div className="enrollment-date-text">
                                        <small className="d-block">{entry.date}</small>
                                        <span><b>{entry.course}</b></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnrollmentDatesDropdown;
