import React from 'react'
import CarouselHomePage from "../../components/homepage/CarouselHomePage.tsx";
import PostList from "../../components/homepage/PostList.tsx";
import CourseList from "../../components/homepage/CourseList.tsx";
import SearchSection from "../../components/homepage/SearchSection.tsx";
import Reviews from "../../components/homepage/Reviews.tsx";
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