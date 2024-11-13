import React from 'react';
import '../../styles/CarouselHomePage.css';

const CarouselHomePage: React.FC = () => {
    return (
        <>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../../../public/carousel/kiem-thu-phan-mem-co-ban-tu-dong-k299.png"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/lap-trinh-di-dong-da-nen-tang-flutter-k299.png"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/khai-giang-devops-k299.png"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/data-science-machine-learning-certificate-khtn-k293.png"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/computer-vision-deep-learning-k299.png"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/299-thiet-ke-nang-cao.jpg"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/299-canva-capcut.jpg"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/298-data-analysis.jpg"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="../../../public/carousel/298-EXCEL.png"
                             className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon custom-carousel-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}
export default CarouselHomePage;