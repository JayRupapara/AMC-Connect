import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const CommissionerLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add your authentication API call here
            // For now, we'll simulate a successful login
            const userData = {
                role: 'commissioner',
                email: formData.email,
                // other user data
            };

            login(userData);

            // Redirect to the page they tried to visit or default to dashboard
            const from = location.state?.from?.pathname || "/commissioner/dashboard/departments";
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
            <img src={"../../logos/logo.png"} alt="logo" className="w-52 h-52" />
            <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center">
                        <FaUserShield className="text-primary text-4xl sm:text-5xl" />
                    </div>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-accent">
                        Commissioner Login
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-neutral">
                        Access AMC Connect Super Admin Dashboard
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-error/10 text-error text-sm p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-neutral"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                          text-neutral bg-base-100"
                                placeholder="commissioner@amc.gov.in"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-neutral"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
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

                    {/* Remember Me and Forgot Password */}
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

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-primary text-base-100 rounded-lg hover:bg-secondary transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Contact Support */}
                <div className="text-center text-sm text-neutral">
                    Need technical support?{' '}
                    <a href="#" className="font-medium text-primary hover:text-secondary">
                        Contact IT Department
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CommissionerLogin; 