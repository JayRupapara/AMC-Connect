import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { realtimeDb } from '../../config/firebase';
import { get, ref, onValue } from 'firebase/database';

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      const categoriesRef = ref(realtimeDb, 'Categories');
      
      onValue(categoriesRef, (snapshot) => {
        if (snapshot.exists()) {
          // Convert the snapshot to an array of categories
          const categoriesArray = Object.entries(snapshot.val()).map(([name, data]) => ({
            id: name, // Using the category name as ID
            name: name,
            description: `${data.subcategories.length} subcategories`,
            subcategories: data.subcategories,
            // status: 'Active'
          }));
          
          setDepartments(categoriesArray);
        } else {
          setDepartments([]);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Fetching departments...');
    fetchDepartments();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call logic here
    setShowAddModal(false);
  };

  const handleDepartmentClick = (deptId) => {
    navigate(`/commissioner/departments/${deptId}`);
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
              <th className="px-6 py-4">Department Name</th>
              <th className="px-6 py-4">Subcategories</th>
              {/* <th className="px-6 py-4">Status</th> */}
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : departments && departments.length > 0 ? (
              departments.map((department) => (
                <tr 
                  key={department.id} 
                  onClick={() => handleDepartmentClick(department.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">{department.name}</td>
                  <td className="px-6 py-4">
                    <div className="max-h-20 overflow-y-auto">
                      <ul className="list-disc list-inside">
                        {department.subcategories.map((sub, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  {/* <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {department.status}
                    </span>
                  </td> */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add edit handler
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add delete handler
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">No departments found</td>
              </tr>
            )}
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