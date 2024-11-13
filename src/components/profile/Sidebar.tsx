import React, { useState } from 'react';
import '../../styles/Sidebar.css'; // Import file CSS riêng nếu bạn chưa có

// Định nghĩa kiểu cho prop setShowClassList
interface SidebarProps {
    setShowClassList: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setShowClassList }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            {/* Nút mở sidebar cho màn hình nhỏ (chỉ hiện khi sidebar đang đóng) */}
            {!isSidebarOpen && (
                <button
                    className="btn btn-outline-dark d-md-none position-absolute"
                    type="button"
                    onClick={openSidebar}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '5px',
                        top: '20px',
                        left: '20px',
                        marginBottom: '20px',
                        zIndex: 2000,
                        backgroundColor: 'white'
                    }}
                >
                    <i className="bi bi-list"></i>
                </button>
            )}

            {/* Sidebar offcanvas cho màn hình nhỏ và sidebar cố định cho màn hình lớn */}
            <div
                className={`offcanvas offcanvas-start d-md-none bg-light ${isSidebarOpen ? 'show' : ''}`}
                tabIndex={-1}
                id="offcanvasSidebar"
                aria-labelledby="offcanvasSidebarLabel"
                style={{ width: '250px' }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={closeSidebar}
                    ></button>
                </div>
                <div className="offcanvas-body p-3">
                    <SidebarContent setShowClassList={setShowClassList} />
                </div>
            </div>

            {/* Sidebar luôn hiển thị trên màn hình lớn */}
            <div className="d-none d-md-block bg-light p-3" style={{ width: '250px', height: '100vh' }}>
                <SidebarContent setShowClassList={setShowClassList} />
            </div>
        </>
    );
};

// Tách nội dung sidebar thành một component để tái sử dụng
const SidebarContent: React.FC<SidebarProps> = ({ setShowClassList }) => (
    <>
        {/* Section: Trang cá nhân */}
        <div className="mb-4">
            <h5 className="mb-3 text-dark">Trang cá nhân</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-person-fill me-2"></i>Thông tin cá nhân
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-bell-fill me-2"></i>Thông báo
                    </a>
                </li>
            </ul>
        </div>

        <hr />

        {/* Section: Tra cứu thông tin */}
        <div className="mb-4">
            <h5 className="mb-3 text-dark">Tra cứu thông tin</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-calendar3 me-2"></i>Lịch học
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-calendar-check-fill me-2"></i>Lịch thi
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-clipboard-check me-2"></i>Kết quả học tập
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-wallet2 me-2"></i>Tài chính sinh viên
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-receipt me-2"></i>Chi tiết hóa đơn
                    </a>
                </li>
            </ul>
        </div>

        <hr />

        {/* Section: Chức năng trực tuyến */}
        <div className="mb-4">
            <h5 className="mb-3 text-dark">Chức năng trực tuyến</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link" onClick={() => setShowClassList(true)}>
                        <i className="bi bi-activity me-2"></i>Hoạt động học tập
                    </a>
                </li>
                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark sidebar-link">
                        <i className="bi bi-chat-fill me-2"></i>Chat
                    </a>
                </li>
            </ul>
        </div>
    </>
);

export default Sidebar;
