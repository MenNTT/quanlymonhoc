import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Sidebar = () => {
  const menuItems = [
    { title: 'Bảng điều khiển', icon: <DashboardIcon />, path: '/admin' },
    { title: 'Khóa học', icon: <SchoolIcon />, path: '/admin/courses' },
    { title: 'Người dùng', icon: <PeopleIcon />, path: '/admin/users' },
    { title: 'Doanh thu', icon: <MonetizationOnIcon />, path: '/admin/revenue' },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-8 text-white">ITLearn Admin</h1>
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

export default Sidebar; 