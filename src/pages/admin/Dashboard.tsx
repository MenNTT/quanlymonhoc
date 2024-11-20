import AdminLayout from '../../layouts/AdminLayout';
import StatsCard from '../../components/common/Card';
import CourseList from '../../components/homepage/CourseList';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Bảng điều khiển</h1>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Tổng số học viên"
          value="1,234"
          change="+10% so với tháng trước"
          icon={<PeopleIcon />}
        />
        <StatsCard
          title="Khóa học đang hoạt động"
          value="42"
          change="+2 khóa mới trong tuần này"
          icon={<SchoolIcon />}
        />
        <StatsCard
          title="Doanh thu tháng"
          value="50,000,000đ"
          change="+15% so với tháng trước"
          icon={<PaymentsIcon />}
        />
        <StatsCard
          title="Tỷ lệ hoàn thành"
          value="78%"
          change="+5% so với tháng trước"
          icon={<TrendingUpIcon />}
        />
      </div>

      <CourseList />
    </AdminLayout>
  );
};

export default Dashboard;
