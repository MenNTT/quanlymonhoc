import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Review, mockReviews } from "../../mock_data/mockReviews";
import '../../styles/Reviews.css';  // Thêm import CSS

const chunkArray = (array: Review[], chunkSize: number) => {
    const results: Review[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
};

const Reviews: React.FC = () => {
    // Chia các reviews thành các nhóm nhỏ (4 đánh giá mỗi nhóm)
    const reviewChunks = chunkArray(mockReviews, 4);

    return (
        <div className="container-fluid review-section py-5">
            <h2 className="text-center mb-4 text-white">Cảm nhận của học viên</h2>

            <div id="reviewsCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {reviewChunks.map((chunk, chunkIndex) => (
                        <div className={`carousel-item ${chunkIndex === 0 ? "active" : ""}`} key={chunkIndex}>
                            <div className="d-flex justify-content-center">
                                {chunk.map((review, index) => (
                                    <div key={index} className="review-card">
                                        <div className="review-content">
                                            <div className="review-header">
                                                <div className="review-avatar">
                                                    <img
                                                        src={review.avatar}
                                                        alt={review.name}
                                                    />
                                                </div>
                                                <div className="review-info">
                                                    <h5 className="review-name">{review.name}</h5>
                                                    <p className="review-job">{review.job}</p>
                                                </div>
                                            </div>
                                            <p className="review-text">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#reviewsCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#reviewsCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Reviews;