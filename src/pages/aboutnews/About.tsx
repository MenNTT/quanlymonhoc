import React from 'react';
import '../../styles/About.css';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <section className="hero-section">
                <h1>Về ITLearn</h1>
                <p className="subtitle">Định hình tương lai công nghệ Việt Nam</p>
            </section>

            <section className="vision-mission-section">
                <div className="container">
                    <div className="vision-mission-grid">
                        <div className="vision-box">
                            <h2>Tầm nhìn</h2>
                            <p>Trở thành nền tảng đào tạo CNTT hàng đầu Đông Nam Á, góp phần đưa Việt Nam trở thành trung tâm công nghệ của khu vực vào năm 2030.</p>
                        </div>
                        <div className="mission-box">
                            <h2>Sứ mệnh</h2>
                            <p>Cung cấp nền tảng giáo dục công nghệ chất lượng cao, giúp người học phát triển sự nghiệp bền vững trong kỷ nguyên số.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-choose-section">
                <div className="container">
                    <h2>Tại sao chọn ITLearn?</h2>
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

            <section className="programs-section">
                <div className="container">
                    <h2>Chương trình đào tạo</h2>
                    <div className="programs-grid">
                        <div className="program-card">
                            <h3>Lập trình Front-end</h3>
                            <ul>
                                <li>HTML5, CSS3, JavaScript</li>
                                <li>React.js, Vue.js, Angular</li>
                                <li>UI/UX Design</li>
                                <li>Performance Optimization</li>
                            </ul>
                        </div>
                        <div className="program-card">
                            <h3>Lập trình Back-end</h3>
                            <ul>
                                <li>Node.js, Python, Java</li>
                                <li>Database Management</li>
                                <li>API Development</li>
                                <li>Cloud Services (AWS, GCP)</li>
                            </ul>
                        </div>
                        <div className="program-card">
                            <h3>DevOps & Cloud</h3>
                            <ul>
                                <li>Docker, Kubernetes</li>
                                <li>CI/CD Pipeline</li>
                                <li>Cloud Architecture</li>
                                <li>System Administration</li>
                            </ul>
                        </div>
                        <div className="program-card">
                            <h3>Data Science & AI</h3>
                            <ul>
                                <li>Machine Learning</li>
                                <li>Deep Learning</li>
                                <li>Big Data Analytics</li>
                                <li>Computer Vision & NLP</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="achievements-section">
                <div className="container">
                    <h2>Thành tựu của chúng tôi</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>100,000+</h3>
                            <p>Học viên tốt nghiệp</p>
                        </div>
                        <div className="stat-item">
                            <h3>92%</h3>
                            <p>Tỷ lệ học viên có việc làm</p>
                        </div>
                        <div className="stat-item">
                            <h3>300+</h3>
                            <p>Đối tác doanh nghiệp</p>
                        </div>
                        <div className="stat-item">
                            <h3>15+</h3>
                            <p>Năm kinh nghiệm</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="partners-section">
                <div className="container">
                    <h2>Đối tác của chúng tôi</h2>
                    <div className="partners-grid">
                        <div className="partner-category">
                            <h3>Đối tác Công nghệ</h3>
                            <p>Google, Microsoft, AWS, IBM, Oracle</p>
                        </div>
                        <div className="partner-category">
                            <h3>Đối tác Giáo dục</h3>
                            <p>Stanford Online, Coursera, edX</p>
                        </div>
                        <div className="partner-category">
                            <h3>Đối tác Doanh nghiệp</h3>
                            <p>FPT, VNG, Viettel, VNPAY, Tiki</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="container">
                    <h2>Liên hệ</h2>
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>Trụ sở chính</h4>
                                    <p>Tòa nhà Innovation, 123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone-alt"></i>
                                <div>
                                    <h4>Hotline</h4>
                                    <p>1800 6816 (24/7)</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <h4>Email</h4>
                                    <p>contact@itlearn.edu.vn</p>
                                    <p>support@itlearn.edu.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 