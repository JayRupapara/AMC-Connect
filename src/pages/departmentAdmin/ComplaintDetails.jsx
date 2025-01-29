import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaUser, FaClock, FaImage } from 'react-icons/fa';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sample complaint data - replace with API call
  const [complaint] = useState({
    id,
    photo: "https://via.placeholder.com/400",
    description: "Water leakage from main pipeline causing water accumulation on the road. This is creating problems for pedestrians and vehicles.",
    area: "Satellite",
    location: "Near City Mall, 380015",
    username: "Raj Patel",
    userphone: "9876543210",
    status: "pending",
    timestamp: new Date(),
    additionalPhotos: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400",
    ],
    updates: [
      {
        id: 1,
        status: "received",
        comment: "Complaint registered",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: 2,
        status: "in-progress",
        comment: "Team dispatched to location",
        timestamp: new Date(),
      }
    ]
  });

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      // Add API call to update status
      console.log('Updating status to:', newStatus);
      setLoading(false);
    } catch (error) {
      console.error('Error updating status:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaArrowLeft className="text-primary" />
        </button>
        <h2 className="text-xl font-bold text-accent">Complaint Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaint Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Complaint Information</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-neutral/70 mb-1">Description</div>
                <p className="text-neutral">{complaint.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>{complaint.location}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-neutral/70 mb-1">Area</div>
                  <p>{complaint.area}</p>
                </div>
                <div>
                  <div className="text-sm text-neutral/70 mb-1">Status</div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    complaint.status === 'pending' ? 'bg-warning/10 text-warning' :
                    complaint.status === 'resolved' ? 'bg-success/10 text-success' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[complaint.photo, ...complaint.additionalPhotos].map((photo, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`Complaint photo ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Updates Timeline</h3>
            <div className="space-y-4">
              {complaint.updates.map((update, index) => (
                <div key={update.id} className="flex items-start space-x-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        update.status === 'received' ? 'bg-primary/10 text-primary' :
                        update.status === 'in-progress' ? 'bg-warning/10 text-warning' :
                        'bg-success/10 text-success'
                      }`}>
                        {update.status}
                      </span>
                      <span className="text-sm text-neutral/70">
                        {new Date(update.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{update.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">User Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaUser className="text-primary" />
                <span>{complaint.username}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span>{complaint.userphone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-primary" />
                <span className="text-sm">
                  Reported: {new Date(complaint.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleStatusUpdate('in-progress')}
                disabled={loading}
                className="w-full px-4 py-2 bg-primary text-base-100 rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleStatusUpdate('resolved')}
                disabled={loading}
                className="w-full px-4 py-2 bg-success text-base-100 rounded-lg hover:bg-success/90 transition-colors duration-200 disabled:opacity-50"
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails; 