import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';

const InstructorSidebar = () => {
  const menuItems = [
    { title: 'Bảng Điều Khiển', icon: <DashboardIcon />, path: '/instructor/dashboard' },
    { title: 'Khóa Học', icon: <SchoolIcon />, path: '/instructor/courses' },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-8 text-white">Giảng Viên</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="text-gray-400">{item.icon}</span>
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default InstructorSidebar; 