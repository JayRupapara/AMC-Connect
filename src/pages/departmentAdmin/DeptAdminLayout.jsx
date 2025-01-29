import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaBars, 
  FaTimes, 
  FaThLarge, 
  FaClipboardList, 
  FaBell,
  FaSignOutAlt 
} from 'react-icons/fa';

const DeptAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/department-admin/login');
  };

  const navLinkClasses = ({ isActive }) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive 
        ? 'bg-primary text-base-100' 
        : 'text-neutral hover:bg-primary/10'
    }`;

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navigation */}
      <nav className="bg-primary text-base-100 py-4 px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl sm:text-2xl p-1"
          >
            {sidebarOpen ? <FaBars /> : <FaBars />}
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">Department Admin</h1>
            <p className="text-xs sm:text-sm opacity-90">{user?.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-secondary rounded-lg">
            <FaBell />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-accent transition-colors duration-200"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:static w-64 bg-white h-[calc(100vh-4rem)] shadow-lg transition-transform duration-300 z-30 md:translate-x-0`}
        >
          <div className="p-4 space-y-2">
            <NavLink to="/department-admin/dashboard" className={navLinkClasses}>
              <FaThLarge />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/department-admin/complaints" className={navLinkClasses}>
              <FaClipboardList />
              <span>All Complaints</span>
            </NavLink>
            <NavLink to="/department-admin/notifications" className={navLinkClasses}>
              <FaBell />
              <span>Notifications</span>
            </NavLink>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DeptAdminLayout; 