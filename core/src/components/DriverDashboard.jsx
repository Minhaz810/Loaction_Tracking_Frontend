import React, { useEffect, useState } from 'react';
import { connectWebSocket, sendMessage } from '../api/websocket';

const DriverDashboard = () => {
  const [isPickedUpDisabled, setPickedUpDisabled] = useState(true);
  const [isDropOffDisabled, setDropOffDisabled] = useState(true);
  const [status, setStatus] = useState("available");

  const generateRandomLatLong = () => {
    let latitude = 23.805300
    let longitude = 90.364900
    const randomLat = latitude + (Math.random() - 0.5) * 0.01;
    const randomLng = longitude + (Math.random() - 0.5) * 0.01;
    return { lat: randomLat, lng: randomLng };
  };

  useEffect(() => {
    connectWebSocket(handleMessageReceived);
  }, []);

  const handleMessageReceived = (data) => {
    console.log("Message from server:", data);
  };

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    const { lat, lng } = generateRandomLatLong();
    const message = {
      driver_id: 1,
      status: newStatus,
      latitude: lat,
      longitude: lng,
    };

    sendMessage(message);
  };

  const handlePickUpRequest = () => {
    updateStatus("on_ride");
    setPickedUpDisabled(false);
  };

  const handlePickedUp = () => {
    updateStatus("way_to_dropoff");
    setDropOffDisabled(false);
    setPickedUpDisabled(true);
  };

  const handleDropOff = () => {
    updateStatus("available");
    setPickedUpDisabled(true);
    setDropOffDisabled(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Driver Dashboard</h2>

        <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-700 p-5 rounded-lg shadow mb-8">
          <div>
            <p className="text-lg font-semibold">Status: <span className="text-green-600 capitalize">{status.replace('_', ' ')}</span></p>
            <p className="text-sm mt-1">You're ready to accept requests.</p>
          </div>
          <svg className="h-10 w-10 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" />
          </svg>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePickUpRequest}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Accept Request
          </button>
          <button
            className="w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Set Status as Unavailable
          </button>
          <button
            onClick={handlePickedUp}
            disabled={isPickedUpDisabled}
            className={`w-full font-semibold py-3 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 ${
              isPickedUpDisabled
                ? 'bg-yellow-300 text-gray-200 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            Picked Up
          </button>
          <button
            onClick={handleDropOff}
            disabled={isDropOffDisabled}
            className={`w-full font-semibold py-3 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
              isDropOffDisabled
                ? 'bg-green-300 text-gray-200 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Drop Off
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
