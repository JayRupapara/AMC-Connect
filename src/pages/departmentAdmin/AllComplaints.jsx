import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaEye, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';

const AllComplaints = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    area: 'all'
  });

  // Sample data - replace with API call
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


    // Add more sample data...
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  // Filter complaints based on search and filters
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'all' || complaint.status === filters.status;
    const matchesArea = filters.area === 'all' || complaint.area === filters.area;

    // Add date range filtering logic here

    return matchesSearch && matchesStatus && matchesArea;
  });

  // Pagination logic
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const handleViewComplaint = (complaintId) => {
    navigate(`/department-admin/complaints/${complaintId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg border">
        {/* Header and Search */}
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-accent">All Complaints</h2>
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
              <button 
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  showFilters ? 'bg-primary text-base-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <FaTimes /> : <FaFilter />}
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <select
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Areas</option>
                <option value="Satellite">Satellite</option>
                <option value="Vastrapur">Vastrapur</option>
                <option value="Navrangpura">Navrangpura</option>
              </select>
            </div>
          )}
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Photo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Area</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral">Status</th>
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
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      complaint.status === 'pending' ? 'bg-warning/10 text-warning' :
                      complaint.status === 'resolved' ? 'bg-success/10 text-success' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {complaint.status}
                    </span>
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
        <div className="p-4 border-t flex justify-between items-center">
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

export default AllComplaints; 