import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/SearchSection.css';

const SearchSection: React.FC = () => {
    return (
        <div className="text-center my-5 mx-5">
            <h2>
                Tổng khai giảng khóa 1 từ ngày <span className="highlight-text">01/11/2024</span> đến ngày <span className="highlight-text">23/11/2024</span>
            </h2>
            <h2>
                Ưu đãi học phí lên đến <span className="highlight-text">100%</span>
            </h2>
            <button className="btn btn-orange my-3 rounded-pill px-4 py-2">Đăng ký ngay</button>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card bg-dark text-black">
                        <img src="https://thsp.edu.vn/sites/default/files/styles/media_thumbnail_370x220/public/media/image/2020-05/40aba2e9a30b5955001a2.jpg?h=4f3c45b6&itok=RJ0i8-6N" className="card-img" alt="Search for exam scores" />
                        <div className="card-img-overlay d-flex flex-column justify-content-center">
                            <h3 className="card-title"><b>Search for exam scores</b></h3>
                            <p className="card-text text-black">Description for searching exam scores.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-dark text-white">
                        <img src="https://thsp.edu.vn/sites/default/files/styles/media_thumbnail_370x220/public/media/image/2018-06/thong_bao_tin_tuc-01.png?h=59060ff4&itok=L4OkXb3B" className="card-img" alt="National IT certification exam schedule" />
                        <div className="card-img-overlay d-flex flex-column justify-content-center">
                            <h3 className="card-title"><b>National IT certification exam schedule</b></h3>
                            <p className="card-text text-black">Description for the exam schedule.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-dark text-black">
                        <img src="https://thsp.edu.vn/sites/default/files/styles/media_thumbnail_370x220/public/media/image/2020-05/87c1ff9efe7c04225d6d3.jpg?h=4f3c45b6&itok=55l0iTMG" className="card-img" alt="Certificate Lookup" />
                        <div className="card-img-overlay d-flex flex-column justify-content-center">
                            <h3 className="card-title"><b>Certificate Lookup</b></h3>
                            <p className="card-text text-black">Description for certificate lookup.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;