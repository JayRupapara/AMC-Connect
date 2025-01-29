import { useState } from 'react';
import { FaUsers, FaBuilding, FaBars, FaTimes } from 'react-icons/fa';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navLinkClasses = ({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
            ? 'bg-primary text-base-100'
            : 'text-neutral hover:bg-primary/10'
        }`;
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/commissioner/login');
    };


    return (
        <div className="min-h-screen bg-base-100">
            {/* Top Navigation - Made more responsive */}
            <nav className="bg-primary text-base-100 py-4 px-4 sm:px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-xl sm:text-2xl p-1"
                    >
                        {sidebarOpen ? <FaBars /> : <FaTimes />}
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold truncate">Commissioner Dashboard</h1>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="hidden sm:inline font-medium">Welcome, Commissioner</span>
                    <button onClick={handleLogout} className="bg-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-accent transition-colors duration-200 text-sm sm:text-base">
                        Logout
                    </button>
                </div>

            </nav>

            <div className="flex">
                {/* Sidebar - Improved mobile handling */}
                <aside 
                    className={`${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } fixed md:static w-64 bg-white h-[calc(100vh-4rem)] shadow-lg transition-transform duration-300 z-30 md:translate-x-0`}
                >
                    <div className="p-4 space-y-2">
                        <NavLink to="departments" className={navLinkClasses}>
                            <FaBuilding />
                            <span>Departments</span>
                        </NavLink>
                        <NavLink to="admins" className={navLinkClasses}>
                            <FaUsers />
                            <span>Department Admins</span>
                        </NavLink>
                    </div>
                </aside>

                {/* Main Content - Better padding for mobile */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
                    <Outlet />
                </main>

                {/* Overlay for mobile when sidebar is open */}
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

export default Dashboard; 