import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserShield, FaPhone, FaEnvelope } from 'react-icons/fa';

const DepartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    id: id,
    name: 'Water Supply',
    description: 'Manages city water supply and maintenance',
    status: 'active',
    adminCount: 3,
    complaintCount: 150,
    resolvedCount: 130,
    admins: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@amc.gov.in',
        phone: '9876543210',
        status: 'active',
        lastActive: '2 hours ago'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@amc.gov.in',
        phone: '9876543211',
        status: 'active',
        lastActive: '1 hour ago'
      }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/commissioner/dashboard/departments')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaArrowLeft className="text-primary" />
        </button>
        <h2 className="text-2xl font-bold text-accent">{department.name}</h2>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border hover:border-primary transition-all duration-200">
          <div className="text-sm text-neutral/70">Total Admins</div>
          <div className="text-2xl font-bold text-primary mt-1">{department.adminCount}</div>
        </div>

        <div className="bg-white p-6 rounded-lg border hover:border-primary transition-all duration-200">
          <div className="text-sm text-neutral/70">Total Complaints</div>
          <div className="text-2xl font-bold text-primary mt-1">{department.complaintCount}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border hover:border-primary transition-all duration-200">
          <div className="text-sm text-neutral/70">Resolved Complaints</div>
          <div className="text-2xl font-bold text-primary mt-1">{department.resolvedCount}</div>
        </div>
      </div>

      {/* Department Info */}
      <div className="bg-white rounded-lg border hover:border-primary transition-all duration-200 p-6">
        <h3 className="text-lg font-semibold text-accent mb-4">Department Information</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-neutral/70">Description</span>
            <p className="mt-1">{department.description}</p>
          </div>
          <div>
            <span className="text-sm text-neutral/70">Status</span>
            <div className="mt-1">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                {department.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Admins */}
      <div className="bg-white rounded-lg border hover:border-primary transition-all duration-200 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-accent">Department Admins</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {department.admins.map((admin) => (
            <div key={admin.id} className="bg-gray-50 rounded-lg p-4 hover:border transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FaUserShield className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{admin.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-neutral/70 mt-1">
                      <span className="px-2 py-0.5 bg-success/10 text-success rounded-full text-xs">
                        {admin.status}
                      </span>
                      <span>•</span>
                      <span>{admin.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <FaEnvelope className="text-neutral/50" />
                  <span>{admin.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FaPhone className="text-neutral/50" />
                  <span>{admin.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails; 