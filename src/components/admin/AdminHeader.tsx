import { FaCalendar, FaUser, FaCog } from 'react-icons/fa';
import '../../styles/AdminHeader.css';

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div className="header-left">
        <h1 className="text-2xl font-bold text-black">ITLearn Admin</h1>
      </div>
      <div className="header-right">
        <button className="header-icon-btn">
          <FaCalendar className="header-icon" />
        </button>
        <button className="header-icon-btn">
          <FaUser className="header-icon" />
        </button>
        <button className="header-icon-btn">
          <FaCog className="header-icon" />
        </button>
      </div>
    </div>
  );
};

export default AdminHeader; 