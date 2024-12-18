import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminSidebar = () => {
  const menuItems = [
    { title: 'Trang Chính', icon: <DashboardIcon />, path: '/admin' },
    { title: 'Thông tin admin', icon: <AccountCircleIcon />, path: '/admin/profile' },
    { title: 'Khóa học', icon: <SchoolIcon />, path: '/admin/courses' },
    { title: 'Người dùng', icon: <PeopleIcon />, path: '/admin/users' },
    { title: 'Doanh thu', icon: <MonetizationOnIcon />, path: '/admin/revenue' },
  ];

  return (
    <aside className="w-64 bg-white-800 p-6 shadow-xl">
      
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

export default AdminSidebar; 