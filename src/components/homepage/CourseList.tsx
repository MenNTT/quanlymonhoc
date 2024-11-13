import React, { useState } from 'react';
import '../../styles/CourseList.css';
import { BsCalendar2Event, BsCashStack } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '../../mock_data/mockCourses';
import { mockCurriculums } from '../../mock_data/mockCurriculum';
import GridViewIcon from '@mui/icons-material/GridView';
import SchoolIcon from '@mui/icons-material/School';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import CloudIcon from '@mui/icons-material/Cloud';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import WebIcon from '@mui/icons-material/Web';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import RouterIcon from '@mui/icons-material/Router';
import WorkIcon from '@mui/icons-material/Work';
import BrushIcon from '@mui/icons-material/Brush';
import SecurityIcon from '@mui/icons-material/Security';
import PaletteIcon from '@mui/icons-material/Palette';
import MovieIcon from '@mui/icons-material/Movie';
import CodeIcon from '@mui/icons-material/Code';
import CampaignIcon from '@mui/icons-material/Campaign';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';


const CourseList: React.FC = () => {
    const navigate = useNavigate();
    const [selectedProgram, setSelectedProgram] = useState<string>('Tất cả');
    const [visibleCourses, setVisibleCourses] = useState<number>(8);

    const handleProgramSelect = (programName: string) => {
        setSelectedProgram(programName);
        setVisibleCourses(8);
    };

    const displayedCourses = selectedProgram === 'Tất cả'
        ? mockCourses.slice(0, visibleCourses)
        : mockCourses
            .filter(course => mockCurriculums
                .find(curr => curr.title === selectedProgram)?.id_curriculum === course.idCurriculum)
            .slice(0, visibleCourses);

    const loadMoreCourses = () => {
        setVisibleCourses(prev => Math.min(
            prev + 4,
            selectedProgram === 'Tất cả'
                ? mockCourses.length
                : mockCourses.filter(course => mockCurriculums
                    .find(curr => curr.title === selectedProgram)?.id_curriculum === course.idCurriculum).length
        ));
    };

    const getIcon = (title: string) => {
        const iconMap: { [key: string]: JSX.Element } = {
            'Microsoft Office': <DesktopWindowsIcon className="me-1" />,
            'Google Workspace': <CloudIcon className="me-1" />,
            'Data Science': <DataUsageIcon className="me-1" />,
            'Web Development': <WebIcon className="me-1" />,
            'Software Testing': <BugReportIcon className="me-1" />,
            'DevOps': <StorageIcon className="me-1" />,
            'Networking': <RouterIcon className="me-1" />,
            'Office Skills': <WorkIcon className="me-1" />,
            'Design': <BrushIcon className="me-1" />,
            'IT Certifications': <SecurityIcon className="me-1" />,
            'Digital Art': <PaletteIcon className="me-1" />,
            'Multimedia': <MovieIcon className="me-1" />,
            'Frontend': <CodeIcon className="me-1" />,
            'Digital Marketing': <CampaignIcon className="me-1" />,
            'Mobile Development': <PhoneIphoneIcon className="me-1" />
        };
        return iconMap[title] || <SchoolIcon className="me-1" />;
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center course-list-subject">Chương trình đào tạo</h2>
            <div className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <p>
                    Chương trình học đa dạng và thường xuyên cập nhật công nghệ mới.
                    Hãy để chúng tôi đồng hành cùng bạn trên hành trình chinh phục tri thức - vững vàng bước vào thế
                    giới công nghệ 4.0.
                </p>
            </div>

            <div className="d-flex flex-wrap justify-content-center mb-4">
                <button
                    className={`btn btn-outline-primary m-2 ${selectedProgram === 'Tất cả' ? 'active' : ''}`}
                    onClick={() => handleProgramSelect('Tất cả')}
                >
                    <GridViewIcon className="me-1" /> tất cả
                </button>
                {mockCurriculums.map((curriculum) => (
                    <button
                        key={curriculum.id_curriculum}
                        className={`btn btn-outline-primary m-2 ${selectedProgram === curriculum.title ? 'active' : ''}`}
                        onClick={() => handleProgramSelect(curriculum.title)}
                    >
                        {getIcon(curriculum.title)} {curriculum.title.toLowerCase()}
                    </button>
                ))}
            </div>

            <div className="row">
                {displayedCourses.map((course, index) => (
                    <div key={index} className="col-md-3 col-sm-6 mb-4 d-flex">
                        <div className="card course-card text-center w-100">
                            <img src={course.thumbnail} className="card-img-top" alt={course.title}
                                 style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h6 className="card-title mb-2">{course.title}</h6>
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <BsCalendar2Event className="me-2 text-primary" size={20} />
                                    <span className="text-muted">{course.date}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="text-muted d-flex align-items-center">
                                        <BsCashStack className="me-2 text-success" size={20} />
                                        <del>{course.originalPrice}</del>
                                    </div>
                                    <div className="text-danger d-flex align-items-center">
                                        <BsCashStack className="me-2 text-danger" size={20} />
                                        {course.discountedPrice}
                                    </div>
                                </div>
                                <button className="btn btn-dark text-white w-100 mt-3" onClick={() => navigate('/course-detail')}>Chi tiết</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {displayedCourses.length < (selectedProgram === 'Tất cả' 
                ? mockCourses.length 
                : mockCourses.filter(course => mockCurriculums
                    .find(curr => curr.title === selectedProgram)?.id_curriculum === course.idCurriculum).length) && (
                <div className="text-center">
                    <button className="btn btn-primary" onClick={loadMoreCourses}>Xem thêm</button>
                </div>
            )}
        </div>
    );
};

export default CourseList;