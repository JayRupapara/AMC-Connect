import { useState, useEffect } from 'react';
import { ref, push, get, set, remove } from 'firebase/database';
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
  const { user: currentUser } = useAuth();
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

  useEffect(() => {
    fetchAdmins();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
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
        createdAt: new Date().toISOString()
      });

      await signOut(auth);

      // Clear form and close modal
      setFormData({
        name: '',
        email: '',
        password: '',
        department: '',
        phone: ''
      });
      setIsModalOpen(false);
      
      // Refresh admins list
      await fetchAdmins();

      // Show success message
      alert('Department Admin added successfully!');
    } catch (err) {
      console.error('Error adding admin:', err);
      setError(err.message || 'Failed to add department admin');
    } finally {
      setLoading(false);
    }
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
          onClick={() => setIsModalOpen(true)}
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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

      {/* Add Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-accent mb-4">Add Department Admin</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Road">Road</option>
                  <option value="Drainage">Drainage</option>
                  <option value="Garbage">Garbage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-focus disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Admin'}
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