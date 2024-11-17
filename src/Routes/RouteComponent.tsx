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

const RouteComponent: React.FC = () => {
    // Lấy thông tin về đường dẫn hiện tại
    const location = useLocation();
    console.log(location);

    // Mảng chứa các đường dẫn cần ẩn Header, Navbar và Footer
    const hiddenRoutes: string[] = [
        "/login",
        "/register",
        "/class-activity",
        "/online-classroom",
    ]; // Thêm các đường dẫn khác nếu cần

    // Kiểm tra nếu đường dẫn hiện tại nằm trong mảng hiddenRoutes
    const hideHeaderFooter: boolean = hiddenRoutes.includes(location.pathname);

    return (
        <>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/course-detail/:id_course" element={<CourseDetail />} />
                <Route path='/profile' element={<ProfileContainer />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/class-activity' element={<ClassroomActivities />} />
                <Route path='/online-classroom' element={<OnlineClassroom />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/payment-guide' element={<PaymentGuide />} />
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default RouteComponent;
