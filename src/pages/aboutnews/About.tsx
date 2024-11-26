import React from 'react';
import '../../styles/About.css';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="highlight">Về</span> ITLearn
                    </h1>
                    <p className="hero-subtitle">
                        <i className="fas fa-rocket subtitle-icon"></i>
                        Định hình tương lai công nghệ Việt Nam
                    </p>
                    <div className="hero-decoration">
                        <div className="decoration-line"></div>
                        <i className="fas fa-code decoration-icon"></i>
                        <div className="decoration-line"></div>
                    </div>
                </div>
            </section>

            <section className="vision-mission-section">
                <div className="container">
                    <div className="vision-mission-grid">
                        <div className="vision-box">
                            <div className="title-wrapper">
                                <div className="icon-circle">
                                    <i className="fas fa-bullseye"></i>
                                </div>
                                <h2>TẦM NHÌN</h2>
                            </div>
                            <div className="content-box">
                                <p>Trở thành nền tảng đào tạo CNTT hàng đầu Đông Nam Á, góp phần đưa Việt Nam trở thành trung tâm công nghệ của khu vực vào năm 2030.</p>
                            </div>
                        </div>
                        <div className="mission-box">
                            <div className="title-wrapper">
                                <div className="icon-circle">
                                    <i className="fas fa-crown"></i>
                                </div>
                                <h2>SỨ MỆNH</h2>
                            </div>
                            <div className="content-box">
                                <p>Cung cấp nền tảng giáo dục công nghệ chất lượng cao, giúp người học phát triển sự nghiệp bền vững trong kỷ nguyên số.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-choose-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Tại sao chọn ITLearn?</h2>
                        <p className="section-subtitle">
                            Khám phá những giá trị độc đáo mà chúng tôi mang lại cho hành trình học tập của bạn
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-graduation-cap"></i>
                            <h3>Lộ trình chuẩn quốc tế</h3>
                            <p>Chương trình học được thiết kế theo chuẩn quốc tế, cập nhật liên tục theo xu hướng công nghệ mới nhất.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-users-cog"></i>
                            <h3>Đội ngũ chuyên gia</h3>
                            <p>Giảng viên là các chuyên gia từ Google, Microsoft, AWS với trên 10 năm kinh nghiệm trong ngành.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-tools"></i>
                            <h3>Thực hành thực tế</h3>
                            <p>85% thời gian học tập trung vào thực hành, xây dựng portfolio với các dự án thực tế.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-certificate"></i>
                            <h3>Chứng chỉ có giá trị</h3>
                            <p>Chứng chỉ được công nhận bởi hơn 300+ doanh nghiệp công nghệ hàng đầu.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            <section className="programs-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Chương trình đào tạo</h2>
                        <p className="section-subtitle">
                            Các khóa học được thiết kế chuyên biệt, đáp ứng nhu cầu thực tế của ngành công nghệ
                        </p>
                    </div>
                    <div className="programs-grid">
                        <div className="program-card">
                            <div className="program-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <h3>Lộ trình chuẩn quốc tế</h3>
                            <p className="program-description">
                                Chương trình học được thiết kế theo chuẩn quốc tế, cập nhật liên tục theo xu hướng công nghệ mới nhất.
                            </p>
                        </div>

                        <div className="program-card">
                            <div className="program-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3>Đội ngũ chuyên gia</h3>
                            <p className="program-description">
                                Giảng viên là các chuyên gia từ Google, Microsoft, AWS với trên 10 năm kinh nghiệm trong ngành.
                            </p>
                        </div>

                        <div className="program-card">
                            <div className="program-icon">
                                <i className="fas fa-laptop-code"></i>
                            </div>
                            <h3>Thực hành thực tế</h3>
                            <p className="program-description">
                                85% thời gian học tập trung vào thực hành, xây dựng portfolio với các dự án thực tế.
                            </p>
                        </div>

                        <div className="program-card">
                            <div className="program-icon">
                                <i className="fas fa-certificate"></i>
                            </div>
                            <h3>Chứng chỉ có giá trị</h3>
                            <p className="program-description">
                                Chứng chỉ được công nhận bởi hơn 300+ doanh nghiệp công nghệ hàng đầu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="achievements-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="achievement-title">
                            <i className="fas fa-trophy achievement-title-icon"></i>
                            THÀNH TỰU CỦA CHÚNG TÔI
                        </h2>
                        <p className="section-subtitle">
                            Những con số ấn tượng đánh dấu chặng đường phát triển của chúng tôi
                        </p>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                            <h3>100,000+</h3>
                            <p>Học viên tốt nghiệp</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <h3>92%</h3>
                            <p>Tỷ lệ học viên có việc làm</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-handshake"></i>
                            </div>
                            <h3>300+</h3>
                            <p>Đối tác doanh nghiệp</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3>15+</h3>
                            <p>Năm kinh nghiệm</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            <section className="partners-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="partners-title">ĐỐI TÁC CỦA CHÚNG TÔI</h2>
                        <p className="section-subtitle">
                            Hợp tác cùng các tổ chức hàng đầu trong lĩnh vực công nghệ và giáo dục
                        </p>
                    </div>
                    <div className="partners-grid">
                        <div className="partner-category">
                            <div className="partner-icon">
                                <i className="fas fa-laptop-code"></i>
                            </div>
                            <h3>Đối tác Công nghệ</h3>
                            <div className="partner-list">
                                <p>Google, Microsoft, AWS, IBM, Oracle</p>
                            </div>
                        </div>
                        <div className="partner-category">
                            <div className="partner-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <h3>Đối tác Giáo dục</h3>
                            <div className="partner-list">
                                <p>Stanford Online, Coursera, edX</p>
                            </div>
                        </div>
                        <div className="partner-category">
                            <div className="partner-icon">
                                <i className="fas fa-building"></i>
                            </div>
                            <h3>Đối tác Doanh nghiệp</h3>
                            <div className="partner-list">
                                <p>FPT, VNG, Viettel, VNPAY, Tiki</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="container">
                    <div className="contact-content">
                        <div className="map-box">
                            <div className="map-container">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6505970936482!2d106.67959617365517!3d10.761388459473778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b8a072901%3A0x2fb4502ebd044212!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIFRow6BuaCBQaOG7kSBI4buTIENow60gTWluaCAtIEhDTVVF!5e0!3m2!1svi!2s!4v1732538324917!5m2!1svi!2s"
                                    width="100%" 
                                    //cái này nó ăn gian, nó chỉ định code link tới hình ảnh tại vị trí đó é
                                    height="450" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 