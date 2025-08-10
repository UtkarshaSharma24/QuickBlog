import React, { useEffect, useState } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

 const {axios} = useAppContext()

  const fetchDashboard = async () => {
     try{
      const {data} = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
     }catch (error){
      toast.error(error.message)
     }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      {/* Info cards */}
      <div className='flex flex-wrap gap-4'>
        <DashboardCard
          icon={assets.dashboard_icon_1}
          count={dashboardData.blogs}
          label="Blogs"
        />
        <DashboardCard
          icon={assets.dashboard_icon_2}
          count={dashboardData.comments}
          label="Comments"
        />
        <DashboardCard
          icon={assets.dashboard_icon_3}
          count={dashboardData.drafts}
          label="Drafts"
        />
      </div>

      {/* Latest blogs table */}
      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="Latest Blogs Icon" />
          <p>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th className='px-2 py-4 xl:px-6'>#</th>
                <th className='px-2 py-4'>Blog Title</th>
                <th className='px-2 py-4 max-sm:hidden'>Date</th>
                <th className='px-2 py-4 max-sm:hidden'>Status</th>
                <th className='px-2 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
          {dashboardData.recentBlogs.length === 0 && (
            <p className='text-center py-4 text-gray-400'>No recent blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, count, label }) => (
  <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
    <img src={icon} alt={label} />
    <div>
      <p className='text-xl font-semibold text-gray-600'>{count}</p>
      <p className='text-gray-400 font-light'>{label}</p>
    </div>
  </div>
);

export default Dashboard;
