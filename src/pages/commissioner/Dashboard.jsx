import { useState } from 'react';
import { FaUsers, FaBuilding, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Sample data - replace with actual data from your backend
  const stats = {
    totalDepartments: 8,
    totalAdmins: 12,
    totalComplaints: 450,
    resolvedComplaints: 380,
    pendingComplaints: 70,
    todayComplaints: 25
  };

  const recentComplaints = [
    {
      id: 1,
      department: 'Water Supply',
      description: 'Water leakage from main pipeline',
      status: 'pending',
      timestamp: new Date(),
    },
    // Add more sample complaints
  ];

  const departmentStats = [
    {
      name: 'Water Supply',
      totalComplaints: 150,
      resolved: 130,
      pending: 20
    },
    // Add more department stats
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral/70">Total Departments</p>
              <p className="text-2xl font-bold text-primary mt-1">{stats.totalDepartments}</p>
            </div>
            <FaBuilding className="text-3xl text-primary/20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral/70">Department Admins</p>
              <p className="text-2xl font-bold text-secondary mt-1">{stats.totalAdmins}</p>
            </div>
            <FaUsers className="text-3xl text-secondary/20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral/70">Total Complaints</p>
              <p className="text-2xl font-bold text-accent mt-1">{stats.totalComplaints}</p>
            </div>
            <FaChartBar className="text-3xl text-accent/20" />
          </div>
        </div>
      </div>

      {/* Complaints Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white rounded-lg border  p-6">
          <h3 className="text-lg font-semibold text-accent mb-4">Department Performance</h3>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-sm text-neutral/70">
                    {dept.resolved} / {dept.totalComplaints} resolved
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary rounded-full h-2.5"
                    style={{ width: `${(dept.resolved / dept.totalComplaints) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg border  p-6">
          <h3 className="text-lg font-semibold text-accent mb-4">Recent Complaints</h3>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{complaint.department}</p>
                    <p className="text-sm text-neutral/70 mt-1">{complaint.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    complaint.status === 'pending' 
                      ? 'bg-warning/10 text-warning' 
                      : 'bg-success/10 text-success'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-xs text-neutral/50 mt-2">
                  {complaint.timestamp.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border ">
          <p className="text-sm text-neutral/70">Resolved Complaints</p>
          <p className="text-2xl font-bold text-success mt-1">{stats.resolvedComplaints}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border ">
          <p className="text-sm text-neutral/70">Pending Complaints</p>
          <p className="text-2xl font-bold text-warning mt-1">{stats.pendingComplaints}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border ">
          <p className="text-sm text-neutral/70">Today's Complaints</p>
          <p className="text-2xl font-bold text-info mt-1">{stats.todayComplaints}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;