import React from 'react';
import '../../../styles/ServiceListDropdown.css'; // Tạo file CSS nếu cần

const ServiceListDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const services = [
        { name: 'Dịch vụ A', icon: 'bi-gear' },
        { name: 'Dịch vụ B', icon: 'bi-laptop' },
        { name: 'Dịch vụ C', icon: 'bi-phone' },
        { name: 'Dịch vụ D', icon: 'bi-wifi' },
        { name: 'Dịch vụ E', icon: 'bi-cloud' },
        // Thêm dịch vụ nếu cần
    ];

    return (
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} onMouseLeave={onClose} style={{ width: 'auto', padding: '10px' }}>
            <div className="p-2">
                <h6>Danh Sách Dịch Vụ</h6>
                <hr className="bg-dark" />
                <div className="service-column">
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <i className={`bi ${service.icon}`} style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                            <div className="service-text">
                                <span>{service.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceListDropdown;
