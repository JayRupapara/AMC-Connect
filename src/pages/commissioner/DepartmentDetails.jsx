import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../../config/firebase';
import { FaArrowLeft } from 'react-icons/fa';

const DepartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentDetails = () => {
      const departmentRef = ref(realtimeDb, `Categories/${id}`);
      
      onValue(departmentRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDepartment({
            id: id,
            name: id, // Since the ID is the name in your case
            subcategories: data.subcategories || []
          });
        } else {
          setError('Department not found');
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching department:', error);
        setError('Failed to fetch department details');
        setLoading(false);
      });
    };

    fetchDepartmentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/commissioner/departments')}
          className="flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Departments
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{department.name}</h1>
      </div>

      {/* Department Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Subcategories</h2>
          <div className="grid gap-3">
            {department.subcategories.map((subcategory, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary transition-colors"
              >
                <p className="text-gray-700">{subcategory}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600 mb-1">Total Subcategories</h3>
            <p className="text-2xl font-bold text-blue-700">
              {department.subcategories.length}
            </p>
          </div>
          {/* Add more statistics cards as needed */}
        </div>

        {/* Actions Section */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => {/* Add edit handler */}}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Edit Department
          </button>
          <button
            onClick={() => {/* Add delete handler */}}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails; 