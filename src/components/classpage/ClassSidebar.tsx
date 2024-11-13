import React from 'react';

interface ClassSidebarProps {
    onSelect: (section: 'general' | 'assignments') => void; // Thêm hàm onSelect
}

const ClassSidebar: React.FC<ClassSidebarProps> = ({ onSelect }) => {
    return (
        <div className="sidebar bg-light shadow-sm position-fixed" style={{ top: 0, left: 0, width: '250px', height: '100vh', overflowY: 'auto' }}>
            {/* Dòng chữ Quay lại trang chủ với icon */}
            <div className="sidebar-header d-flex align-items-center p-3">
                <i className="bi bi-arrow-left me-2"></i>
                <a href='/' className='text-black text-decoration-none'>
                    <span className="fs-6">Quay lại trang chủ</span>
                </a>
            </div>
            {/* Avatar lớp học */}
            <div className="class-avatar p-3 text-center">
                <img
                    src="https://via.placeholder.com/50"
                    alt="Class Avatar"
                    className="avatar rounded-circle"
                />
            </div>
            {/* Tên lớp học */}
            <div className="class-name text-center mb-3">
                <h5>Tên Lớp Học</h5>
            </div>
            {/* Mục nhỏ */}
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a href="#" className="nav-link sidebar-link text-black" onClick={() => onSelect('general')}>General</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link sidebar-link text-black" onClick={() => onSelect('assignments')}>Assignments</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link sidebar-link text-black">Grades</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link sidebar-link text-black">Notebook</a>
                </li>
            </ul>
        </div>
    );
};

export default ClassSidebar;
