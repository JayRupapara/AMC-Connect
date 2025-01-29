import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';

const DeptAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5);
  const navigate = useNavigate();

  // Sample data - replace with API call
  const stats = {
    totalComplaints: 150,
    pendingComplaints: 45,
    resolvedComplaints: 105,
    todayComplaints: 12
  };

  const complaints = [
    {
      id: 1,
      photo: "https://via.placeholder.com/100",
      description: "Water leakage from main pipeline",
      area: "Satellite",
      location: "Near City Mall, 380015",
      username: "Raj Patel",
      userphone: "9876543210",
      status: "pending",
      timestamp: new Date(),
    },
    // Add more sample complaints...
  ];

  // Search and Pagination Logic
  const filteredComplaints = complaints.filter(complaint =>
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const handleViewComplaint = (complaintId) => {
    navigate(`/department-admin/complaints/${complaintId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-sm text-neutral/70">Total Complaints</div>
          <div className="text-2xl font-bold text-primary mt-1">{stats.totalComplaints}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-sm text-neutral/70">Pending Complaints</div>
          <div className="text-2xl font-bold text-warning mt-1">{stats.pendingComplaints}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-sm text-neutral/70">Resolved Complaints</div>
          <div className="text-2xl font-bold text-success mt-1">{stats.resolvedComplaints}</div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-sm text-neutral/70">Today's Complaints</div>
          <div className="text-2xl font-bold text-accent mt-1">{stats.todayComplaints}</div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-accent">Today's Complaints</h2>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/50" />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <FaFilter className="text-primary" />
            </button>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Photo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Area</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">User Details</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img 
                      src={complaint.photo} 
                      alt="Complaint" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm line-clamp-2">{complaint.description}</div>
                    <div className="text-xs text-neutral/70 mt-1">
                      {format(complaint.timestamp, 'MMM dd, yyyy HH:mm')}
                    </div>
                  </td>
                  <td className="px-6 py-4">{complaint.area}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm line-clamp-2">{complaint.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{complaint.username}</div>
                    <div className="text-sm text-neutral/70">{complaint.userphone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      onClick={() => handleViewComplaint(complaint.id)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-neutral/70">
            Showing {indexOfFirstComplaint + 1} to {Math.min(indexOfLastComplaint, filteredComplaints.length)} of {filteredComplaints.length} complaints
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-primary text-white'
                    : 'text-neutral hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptAdminDashboard; 