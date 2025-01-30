import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUsers, FaBuilding, FaBars, FaTimes, FaChartBar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const CommissionerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    // Reset sidebar state on mobile when route changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/commissioner/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinkClasses = ({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
            ? 'bg-primary text-base-100'
            : 'text-neutral hover:bg-primary/10'
        }`;

    return (
        <div className="min-h-screen bg-base-100">
            {/* Top Navigation */}
            <nav className="bg-primary text-base-100 py-4 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-xl sm:text-2xl p-1 hover:bg-primary-focus rounded-lg transition-colors"
                    >
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold">Commissioner Dashboard</h1>
                        <p className="text-xs sm:text-sm opacity-90">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-accent transition-colors duration-200"
                >
                    Logout
                </button>
            </nav>

            <div className="flex relative">
                {/* Sidebar */}
                <aside
                    className={`
                        fixed md:static 
                        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'} 
                        bg-white h-[calc(100vh-4rem)] shadow-lg 
                        transition-all duration-300 ease-in-out z-30
                    `}
                >
                    <div className="p-4 space-y-2">
                        <NavLink
                            to="/commissioner/dashboard"
                            end
                            className={navLinkClasses}
                        >
                            <FaChartBar className="text-xl" />
                            <span className={`transition-opacity duration-200 ${
                                !sidebarOpen && 'md:hidden'
                            }`}>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/commissioner/dashboard/departments"
                            className={navLinkClasses}
                        >
                            <FaBuilding className="text-xl" />
                            <span className={`transition-opacity duration-200 ${
                                !sidebarOpen && 'md:hidden'
                            }`}>Departments</span>
                        </NavLink>

                        <NavLink
                            to="/commissioner/dashboard/admins"
                            className={navLinkClasses}
                        >
                            <FaUsers className="text-xl" />
                            <span className={`transition-opacity duration-200 ${
                                !sidebarOpen && 'md:hidden'
                            }`}>Department Admins</span>
                        </NavLink>
                    </div>
                </aside>

                {/* Main Content - Adjusted padding and margin */}
                <main className={`
                    flex-1 
                    min-h-[calc(100vh-4rem)] 
                    transition-all duration-300 
                    ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}
                    relative
                    bg-base-100
                `}>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </main>

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </div>
        </div>
    );
};

export default CommissionerLayout;
