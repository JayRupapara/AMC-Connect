import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const DeptAdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const role = await login(formData.email, formData.password);
      
      if (role !== 'deptAdmin') {
        throw new Error('Unauthorized access');
      }

      // Redirect to department admin dashboard
      const from = location.state?.from?.pathname || "/department-admin/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials or unauthorized access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
      <img src={"../../logos/logo.png"} alt="logo" className="w-52 h-52" />
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl border ">
        <div className="text-center">
          <div className="flex justify-center">
            <FaUserTie className="text-primary text-4xl sm:text-5xl" />
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-accent">
            Department Admin Login
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral">
            Access your department's complaint management dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-error/10 text-error text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                          text-neutral bg-base-100"
                placeholder="admin@department.amc.gov.in"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                          text-neutral bg-base-100"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-secondary">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                      shadow-sm text-sm font-medium text-base-100 bg-primary hover:bg-secondary
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                      transition duration-300"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeptAdminLogin; 