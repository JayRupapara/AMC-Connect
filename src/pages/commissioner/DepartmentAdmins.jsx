import { useState, useEffect } from 'react';
import { ref, push, get, set, remove, onValue, off } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth, realtimeDb } from '../../config/firebase';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const DepartmentAdmins = () => {
  const { user, login, password } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    phone: ''
  });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAdmins();
    fetchCategories();
  }, []);

  const fetchAdmins = async () => {
    try {
      const adminsRef = ref(realtimeDb, 'Admins/SubAdmins');
      const snapshot = await get(adminsRef);

      if (snapshot.exists()) {
        const adminsData = [];
        snapshot.forEach((childSnapshot) => {
          adminsData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        setAdmins(adminsData);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError('Failed to load department admins');
      setLoading(false);
    }
  };

  const fetchCategories = () => {
    const categoriesRef = ref(realtimeDb, 'Categories');
    onValue(categoriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const categoriesData = Object.keys(snapshot.val()).map(name => ({
          id: name,
          name: name
        }));
        setCategories(categoriesData);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (selectedAdmin) {
        // Update existing admin
        const adminRef = ref(realtimeDb, `Admins/SubAdmins/${selectedAdmin.id}`);
        await set(adminRef, {
          name: formData.name,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
        });
      } else {
        // Create new department admin
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Add user data to realtime database
        const adminRef = ref(realtimeDb, `Admins/SubAdmins/${userCredential.user.uid}`);
        await set(adminRef, {
          name: formData.name,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString()
        });

        // Sign out the newly created admin
        await signOut(auth);

        // Set persistence and re-login commissioner
        await setPersistence(auth, browserSessionPersistence);
        const role = await login(user?.email, password);

        if (role !== 'commissioner') {
          throw new Error('Unauthorized access');
        }

        // Redirect to department admin dashboard
        const from = location.state?.from?.pathname || "/commissioner/admins";
        navigate(from, { replace: true });
      }

      // Clear form and close modal
      resetForm();
      await fetchAdmins();

      // Show success message
      alert('Department Admin added/updated successfully!');
    } catch (err) {
      console.error('Error adding/updating admin:', err);
      setError(err.message || 'Failed to add/update department admin');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      department: admin.department,
      phone: admin.phone,
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await remove(ref(realtimeDb, `Admins/SubAdmins/${adminId}`));
        await fetchAdmins();
      } catch (err) {
        console.error('Error deleting admin:', err);
        setError('Failed to delete admin');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      department: '',
      phone: ''
    });
    setSelectedAdmin(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-accent">Department Admins</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-focus transition-colors"
        >
          <FaPlus />
          <span>Add Admin</span>
        </button>
      </div>

      {error && (
        <div className="bg-error/10 text-error p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-error hover:text-error-focus transition-colors"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedAdmin ? 'Edit Department Admin' : 'Add Department Admin'}</h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="Enter admin's full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="Enter admin's email"
                  required
                />
              </div>

              {/* Password Field (only for new admins) */}
              {!selectedAdmin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Enter secure password"
                    required
                  />
                </div>
              )}

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none bg-white"
                    required
                  >
                    <option value="">Select Department</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm py-2">
                  {error}
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                >
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    selectedAdmin ? 'Save Changes' : 'Add Admin'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentAdmins; 