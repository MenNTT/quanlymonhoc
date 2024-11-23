import React from 'react';
import '../../styles/News.css';

const News: React.FC = () => {
    return (
        <div className="news-container">
            <section className="news-hero">
                <div className="container">
                    <h1>Tin tức & Sự kiện</h1>
                    <p>Cập nhật những tin tức mới nhất về công nghệ và giáo dục</p>
                </div>
            </section>

            <section className="featured-news">
                <div className="container">
                    <div className="featured-article">
                        <div className="featured-image">
                            <img src="/images/news/ai-trends.jpg" alt="AI Trends 2024" />
                        </div>
                        <div className="featured-content">
                            <span className="category">Công nghệ</span>
                            <h2>Xu hướng AI và Machine Learning năm 2024</h2>
                            <p>Khám phá những xu hướng AI mới nhất đang định hình tương lai công nghệ, từ Large Language Models đến AI tạo sinh...</p>
                            <div className="article-meta">
                                <span><i className="far fa-calendar"></i> 15/03/2024</span>
                                <span><i className="far fa-eye"></i> 1,234 lượt xem</span>
                            </div>
                            <a href="#" className="read-more">Đọc tiếp</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="news-grid">
                <div className="container">
                    <div className="news-categories">
                        <button className="category-btn active">Tất cả</button>
                        <button className="category-btn">Công nghệ</button>
                        <button className="category-btn">Giáo dục</button>
                        <button className="category-btn">Sự kiện</button>
                        <button className="category-btn">Tuyển dụng</button>
                    </div>

                    <div className="articles-grid">
                        <article className="news-card">
                            <div className="news-image">
                                <img src="/images/news/web-dev.jpg" alt="Web Development" />
                                <span className="category">Công nghệ</span>
                            </div>
                            <div className="news-content">
                                <h3>Top 10 Framework phát triển web được yêu thích nhất 2024</h3>
                                <p>Đánh giá chi tiết về các framework web development phổ biến và xu hướng sử dụng trong năm 2024...</p>
                                <div className="article-meta">
                                    <span><i className="far fa-calendar"></i> 12/03/2024</span>
                                    <span><i className="far fa-eye"></i> 856 lượt xem</span>
                                </div>
                            </div>
                        </article>

                        <article className="news-card">
                            <div className="news-image">
                                <img src="/images/news/education.jpg" alt="Online Education" />
                                <span className="category">Giáo dục</span>
                            </div>
                            <div className="news-content">
                                <h3>Tương lai của giáo dục trực tuyến: Xu hướng và thách thức</h3>
                                <p>Phân tích về sự phát triển của e-learning và những thách thức cần vượt qua trong tương lai...</p>
                                <div className="article-meta">
                                    <span><i className="far fa-calendar"></i> 10/03/2024</span>
                                    <span><i className="far fa-eye"></i> 723 lượt xem</span>
                                </div>
                            </div>
                        </article>

                        <article className="news-card">
                            <div className="news-image">
                                <img src="/images/news/tech-event.jpg" alt="Tech Event" />
                                <span className="category">Sự kiện</span>
                            </div>
                            <div className="news-content">
                                <h3>ITLearn Tech Conference 2024: Định hình tương lai công nghệ</h3>
                                <p>Sự kiện công nghệ lớn nhất năm với sự tham gia của các chuyên gia hàng đầu trong ngành...</p>
                                <div className="article-meta">
                                    <span><i className="far fa-calendar"></i> 08/03/2024</span>
                                    <span><i className="far fa-eye"></i> 945 lượt xem</span>
                                </div>
                            </div>
                        </article>

                        <article className="news-card">
                            <div className="news-image">
                                <img src="/images/news/career.jpg" alt="IT Career" />
                                <span className="category">Tuyển dụng</span>
                            </div>
                            <div className="news-content">
                                <h3>Cơ hội việc làm IT 2024: Những kỹ năng cần có</h3>
                                <p>Khám phá những kỹ năng quan trọng nhất mà nhà tuyển dụng đang tìm kiếm trong năm 2024...</p>
                                <div className="article-meta">
                                    <span><i className="far fa-calendar"></i> 05/03/2024</span>
                                    <span><i className="far fa-eye"></i> 678 lượt xem</span>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="pagination">
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">4</button>
                        <button className="page-btn">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default News; 