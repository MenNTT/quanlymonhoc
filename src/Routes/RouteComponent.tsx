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
import About from '../pages/aboutnews/About.tsx'
import New from '../pages/aboutnews/News.tsx'
import ProtectedRoute from './ProtectedRoute';
import InstructorDashboard from '../pages/instructor/InstructorDashboard.tsx';
import InstructorCourses from "../pages/instructor/InstructorCourse.tsx";
import CoursesPage from "../pages/CoursesPage/CoursesPage.tsx";
import AdminCourseDetail from "../pages/admin/CourseDetail";
import Lookup from "../pages/aboutnews/Lockup.tsx";
const RouteComponent: React.FC = () => {
    const location = useLocation();
    console.log('Current location:', location);

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
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/course-detail/:id_course" element={<CourseDetail />} />
                <Route path='/payment-guide' element={<PaymentGuide />} />
                <Route path='/about' element={<About />} />
                <Route path='/news' element={<New />} />
                <Route path='/search' element={<Lookup />} />
                <Route path='/courses' element={<CoursesPage />} />
                

                
                
                {/* Protected user routes */}
                <Route path='/profile' element={
                    <ProtectedRoute>
                        <ProfileContainer />
                    </ProtectedRoute>
                } />
                <Route path='/payment' element={
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                } />
                <Route path='/class-activity' element={
                    <ProtectedRoute>
                        <ClassroomActivities />
                    </ProtectedRoute>
                } />
                <Route path='/online-classroom' element={
                    <ProtectedRoute>
                        <OnlineClassroom />
                    </ProtectedRoute>
                } />
                <Route path='/cart' element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />

                {/* Protected admin routes */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Home />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/users" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Users />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/courses" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Courses />
                        </ProtectedRoute>
                    } 
                />
                 <Route 
                    path="/admin/courses/:id_course" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminCourseDetail />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/courses/edit/:id_course" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <EditCourse />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/revenue" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Revenue />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/profile" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Profile />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/add-course" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddCourse />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/manage-instructors" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ManageInstructors />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/manage-categories" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ManageCategories />
                        </ProtectedRoute>
                    } 
                />
                <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                <Route path="/instructor/courses" element={<InstructorCourses />} />
                <Route 
                    path="/admin/courses/:id_course" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminCourseDetail />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default RouteComponent;
