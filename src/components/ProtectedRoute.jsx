import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Determine login route based on current path
    const loginRoute = location.pathname.includes('department-admin') 
      ? '/department-admin/login' 
      : '/commissioner/login';
    
    return <Navigate to={loginRoute} state={{ from: location }} replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // Redirect based on user role
    const dashboardPath = user.role === 'deptAdmin' 
      ? '/department-admin/dashboard'
      : '/commissioner/dashboard/departments';
      
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
}; 