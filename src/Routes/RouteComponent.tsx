// RouteComponent.tsx đừng sửa toàn bộ file này
import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage/Homepage.tsx";
import CourseDetail from "../pages/coursedetail/CourseDetail.tsx";
import Login from "../pages/authenpage/Login.tsx";
import Register from "../pages/authenpage/Register.tsx";
import Payment from "../pages/PaymentPage/Payment.tsx";
import ProfileContainer from "../pages/ProfilePage/ProfileContainer.tsx";
import Header from "../components/containers/header/Header.tsx";
import Footer from "../components/containers/footer/Footer.tsx";
import ClassroomActivities from "../components/classpage/ClassroomActivities.tsx";
import OnlineClassroom from "../pages/onlineclassroom/OnlineClassroom.tsx";
import Cart from "../pages/CartPage/Cart.tsx";
import PaymentGuide from "../pages/PaymentGuidePage/PaymentGuide.tsx";
import Home from "../pages/admin/Home.tsx";
import Courses from "../pages/admin/Courses.tsx";
import Users from "../pages/admin/Users.tsx";
import Revenue from "../pages/admin/Revenue.tsx";
import Profile from "../pages/admin/Profile.tsx";
import AddCourse from '../pages/admin/AddCourse.tsx';
import EditCourse from '../pages/admin/EditCourse.tsx';
import ManageInstructors from '../pages/admin/ManageInstructors.tsx';
import ManageCategories from '../pages/admin/ManageCategories.tsx';

const RouteComponent: React.FC = () => {
    const location = useLocation();
    console.log(location);

    const hiddenRoutes: string[] = [
        "/login",
        "/register",
        "/class-activity",
        "/online-classroom",
        "/admin",
    ];

    const isAdminRoute = location.pathname.startsWith('/admin');
    const hideHeaderFooter: boolean = hiddenRoutes.includes(location.pathname) || isAdminRoute;

    return (
        <>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course-detail/:id_course" element={<CourseDetail />} />
                <Route path='/profile' element={<ProfileContainer />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/class-activity' element={<ClassroomActivities />} />
                <Route path='/online-classroom' element={<OnlineClassroom />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/payment-guide' element={<PaymentGuide />} />

                {/* Admin routes */}
                <Route path="/admin" element={<Home />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/courses" element={<Courses />} />
                <Route path="/admin/revenue" element={<Revenue />} />
                <Route path="/admin/profile" element={<Profile />} />
                <Route path="/admin/add-course" element={<AddCourse />} />
                <Route path="/admin/edit-course/:id" element={<EditCourse />} />
                <Route path="/admin/manage-instructors" element={<ManageInstructors />} />
                <Route path="/admin/manage-categories" element={<ManageCategories />} />
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default RouteComponent;
