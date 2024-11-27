import AdminLayout from '../../layouts/AdminLayout';
import Profile from '../../components/profile/Profile';

const AdminProfile = () => {
  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-8">Thông tin cá nhân</h1>
        <Profile />
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;