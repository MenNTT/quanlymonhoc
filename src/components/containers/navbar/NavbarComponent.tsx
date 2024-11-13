import React, { useState } from 'react';
import '../../../styles/NavbarComponent.css';
import TrainingProgramsDropdown from "../training_program_dropdown/TrainingProgramsDropdown.tsx";
import EnrollmentDatesDropdown from "../enrollmentdate_dropdown/EnrollmentDatesDropdown.tsx";
import ServiceListDropdown from "../service_list_dropdown/ServiceListDropdown.tsx";
import NewsDropdown from "../news_dropdown/NewsDropdown.tsx";
import { Home as HomeIcon, CalendarMonth as CalendarMonthIcon, School as SchoolIcon, 
  MiscellaneousServices as MiscellaneousServicesIcon, Newspaper as NewspaperIcon, 
  Payment as PaymentIcon, ContactPhone as ContactPhoneIcon } from '@mui/icons-material';

const NavbarComponent: React.FC = () => {
    const [CoursesIsDropdownOpen, CoursesSetDropdownOpen] = useState(false);
    const [enrollIsDropdownOpen, enrollSetDropdownOpen] = useState(false);
    const [serviceIsDropdownOpen, serviceSetDropdownOpen] = useState(false);
    const [newsIsDropdownOpen, newsSetDropdownOpen] = useState(false);

    const handleMouseCourseEnter = () => { CoursesSetDropdownOpen(true); };
    const handleMouseCourseLeave = () => { CoursesSetDropdownOpen(false); };

    const handleMouseEnrollEnter = () => { enrollSetDropdownOpen(true); };
    const handleMouseEnrollLeave = () => { enrollSetDropdownOpen(false); };

    const handleMouseServiceEnter = () => { serviceSetDropdownOpen(true); };
    const handleMouseServiceLeave = () => { serviceSetDropdownOpen(false); };

    const handleMouseNewsEnter = () => { newsSetDropdownOpen(true); };
    const handleMouseNewsLeave = () => { newsSetDropdownOpen(false); };

    return (
        <nav className="navbar navbar-expand-md navbar-component">
            <div className="container d-flex align-items-center">
                <button
                    className="navbar-toggler custom-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex justify-content-center w-100 gap-3">
                        <li className="nav-item">
                            <a href="/" className="nav-link text-white">
                                <HomeIcon className="nav-icon" />
                                <span className="nav-text">Trang chủ</span>
                            </a>
                        </li>
                        <li className="nav-item" onMouseEnter={handleMouseEnrollEnter} onMouseLeave={handleMouseEnrollLeave}>
                            <a href="/lich-su-khai-giang" className="nav-link text-white">
                                <CalendarMonthIcon className="nav-icon" />
                                <span className="nav-text">Lịch khai giảng</span>
                            </a>
                            <EnrollmentDatesDropdown isOpen={enrollIsDropdownOpen} onClose={handleMouseEnrollLeave} />
                        </li>
                        <li className="nav-item" onMouseEnter={handleMouseCourseEnter} onMouseLeave={handleMouseCourseLeave}>
                            <a href="/chuong-trinh-dao-tao" className="nav-link text-white">
                                <SchoolIcon className="nav-icon" />
                                <span className="nav-text">Chương trình đào tạo</span>
                            </a>
                            <TrainingProgramsDropdown isOpen={CoursesIsDropdownOpen} onClose={handleMouseCourseLeave} />
                        </li>
                        <li className="nav-item" onMouseEnter={handleMouseServiceEnter} onMouseLeave={handleMouseServiceLeave}>
                            <a href="/dich-vu" className="nav-link text-white">
                                <MiscellaneousServicesIcon className="nav-icon" />
                                <span className="nav-text">Dịch vụ</span>
                            </a>
                            <ServiceListDropdown isOpen={serviceIsDropdownOpen} onClose={handleMouseServiceLeave} />
                        </li>
                        <li className="nav-item" onMouseEnter={handleMouseNewsEnter} onMouseLeave={handleMouseNewsLeave}>
                            <a href="/tin-tuc" className="nav-link text-white">
                                <NewspaperIcon className="nav-icon" />
                                <span className="nav-text">Tin tức</span>
                            </a>
                            <NewsDropdown isOpen={newsIsDropdownOpen} onClose={handleMouseNewsLeave} />
                        </li>
                        <li className="nav-item">
                            <a href="/payment-guide" className="nav-link text-white">
                                <PaymentIcon className="nav-icon" />
                                <span className="nav-text">Hướng dẫn thanh toán</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/lien-he" className="nav-link text-white">
                                <ContactPhoneIcon className="nav-icon" />
                                <span className="nav-text">Liên hệ</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
