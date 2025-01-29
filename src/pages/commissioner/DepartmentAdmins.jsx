import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUserShield } from 'react-icons/fa';

const DepartmentAdmins = () => {
  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@amc.gov.in',
      department: 'Water Supply',
      status: 'active',
      phone: '9876543210'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@amc.gov.in',
      department: 'Solid Waste',
      status: 'active',
      phone: '9876543211'
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call logic here
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-accent">Manage Department Admins</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-base-100 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-secondary transition-colors duration-200"
        >
          <FaPlus />
          <span>Add Admin</span>
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-accent  text-base-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="px-6 py-4 flex items-center space-x-2">
                  <FaUserShield className="text-primary" />
                  <span>{admin.name}</span>
                </td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">{admin.department}</td>
                <td className="px-6 py-4">{admin.phone}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-success/10 text-success rounded-full text-sm">
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className="text-primary hover:text-secondary">
                      <FaEdit />
                    </button>
                    <button className="text-error hover:text-error/80">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-accent mb-4">Add New Department Admin</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Solid Waste">Solid Waste</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-neutral hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-base-100 rounded-lg hover:bg-secondary"
                >
                  Add Admin
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