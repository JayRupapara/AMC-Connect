import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Water Supply', description: 'Manages city water supply', status: 'active' },
    { id: 2, name: 'Solid Waste', description: 'Handles waste management', status: 'active' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call logic here
    setShowAddModal(false);
  };

  const handleDepartmentClick = (deptId) => {
    navigate(`/commissioner/dashboard/departments/${deptId}`);
  };

  return (
    <div>
      {/* Responsive header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-accent">Manage Departments</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-primary text-base-100 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-secondary transition-colors duration-200"
        >
          <FaPlus />
          <span>Add Department</span>
        </button>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-accent text-left text-sm font-semibold border-b text-base-100 border-gray-100">
            <tr>
              <th className="px-6 py-4 ">Name</th>

              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map((dept) => (
              <tr 
                key={dept.id} 
                className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={() => handleDepartmentClick(dept.id)}
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-accent">{dept.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-neutral/70 line-clamp-2">{dept.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                    {dept.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button 
                      className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add edit logic
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="p-2 text-error hover:bg-error/10 rounded-full transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add delete logic
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-accent mb-4">Add New Department</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-1">
                    Department Name
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
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    rows="3"
                    required
                  />
                </div>
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
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments; 