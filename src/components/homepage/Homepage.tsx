import React from 'react'
import CarouselHomePage from "./CarouselHomePage.tsx";
import PostList from "./PostList.tsx";
import CourseList from "./CourseList.tsx";
import SearchSection from "./SearchSection.tsx";
import Reviews from "./Reviews.tsx";
import '../../styles/Homepage.css';

const HomePage: React.FC = () => {
    return (
        <div>
            <CarouselHomePage />
            <div className="section-divider"></div>
            <PostList />
            <div className="section-divider"></div>
            <CourseList />
            <div className="section-divider"></div>
            <SearchSection />
            <div className="section-divider"></div>
            <Reviews />
        </div>
    )
}

export default HomePage;