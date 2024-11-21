import AdminLayout from '../../layouts/AdminLayout';
import UserList from '../../components/common/UserList';
import { Link } from 'react-router-dom';

const Users = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Quản lý Người dùng</h1>
      <Link to="/admin/manage-instructors" className="btn btn-primary mb-4">Quản Lý Giảng Viên</Link>
      <UserList />
    </AdminLayout>
  );
};

export default Users; 