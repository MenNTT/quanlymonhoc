// ClassList.tsx
import React from 'react';
import '../../styles/ClassList.css';
import {useNavigate} from "react-router-dom"; // Add custom CSS file if you don't have it yet

interface ClassItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}

const classList: ClassItem[] = [
    { id: 1, name: 'Math 101', description: 'Basic Algebra', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Physics 202', description: 'Mechanics', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Chemistry 303', description: 'Organic Chemistry', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'History 101', description: 'World History', imageUrl: 'https://via.placeholder.com/150' },
];

const ClassList: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Danh sách lớp học</h3>
            <div className="row justify-content-center">
                {classList.map((classItem) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={classItem.id}>
                        <div className="class-card p-3 shadow-sm">
                            <img
                                src="https://via.placeholder.com/150" /* Placeholder square image */
                                alt="Class Image"
                                className="class-image"
                            />
                            <h5 className="mt-3">Class Name</h5>
                            <p>Class Description</p>
                            <button className="btn btn-primary btn-detail" onClick={() => navigate('/class-activity')}>
                                <i className="bi bi-eye-fill me-2"></i> Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassList;
