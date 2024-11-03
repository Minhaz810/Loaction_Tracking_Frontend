import React, { useState } from 'react';
import Map from './Map';

const AdminDashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("available");

  const statuses = [
    { label: "Available", value: "available" },
    { label: "Not Available", value: "notAvailable" },
    { label: "Way to Pickup", value: "wayToPickup" },
    { label: "Way to Dropoff", value: "wayToDropoff" },
    { label: "Reached Pickup", value: "reachedPickup" },
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 focus:outline-none ${
              selectedStatus === status.value
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Map Section */}
      <div className="w-full max-w-6xl h-[70vh] bg-gray-200 rounded-lg shadow-md overflow-hidden">
        <Map />
      </div>
    </div>
  );
};

export default AdminDashboard;
