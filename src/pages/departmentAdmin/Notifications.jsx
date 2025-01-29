import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "New Complaint Assigned",
      message: "A new complaint has been assigned to your department",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      title: "Complaint Status Update",
      message: "Complaint #123 has been marked as urgent by the commissioner",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    // Add more notifications as needed
  ]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-accent">Notifications</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                !notification.read ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  !notification.read ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-neutral/70'
                }`}>
                  <FaBell />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${!notification.read ? 'text-primary' : 'text-neutral'}`}>
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral/70">{notification.message}</p>
                  <div className="mt-2 text-xs text-neutral/50">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 