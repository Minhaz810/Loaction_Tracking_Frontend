import React, { useState, useEffect } from 'react';
import Map from './Map';
import AdminEarningGraph from './AdminEarnings';
import Navbar from './Navbar';
import TipData from './TipData';

const AdminDashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [coordinates, setCoordinates] = useState([]); 
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [activeDriverCount, setActiveDriverCount] = useState(0);
  const [inactiveDriverCount, setInactiveDriverCount] = useState(0);

  const [statuses, setStatuses] = useState([
    { label: "On Ride", value: "on_ride", count: 0, coordinates: [] },
    { label: "Available", value: "available", count: 0, coordinates: [] },
    { label: "Not Available", value: "not_available", count: 0, coordinates: [] },
    { label: "Way to Pickup", value: "way_to_pickup", count: 0, coordinates: [] },
    { label: "Way to Dropoff", value: "way_to_dropoff", count: 0, coordinates: [] },
    { label: "Reached Pickup", value: "reached_pickup", count: 0, coordinates: [] },
  ]);

  const handleWebSocketMessage = (message) => {
    const data = JSON.parse(message.data);
    const driverStatusData = data.driver_status_data;

    const updatedStatuses = statuses.map(status => ({
      ...status,
      count: driverStatusData[status.value]?.count || 0,
      coordinates: driverStatusData[status.value]?.coordinates || []
    }));
    setStatuses(updatedStatuses);

    const sum = updatedStatuses.reduce((sum, status) => sum + status.count, 0);
    setTotalUserCount(sum);

    const activeStatuses = ["on_ride", "way_to_pickup", "way_to_dropoff", "reached_pickup"];
    const count = updatedStatuses
      .filter(status => activeStatuses.includes(status.value))
      .reduce((sum, status) => sum + status.count, 0);
    setActiveDriverCount(count);

    setInactiveDriverCount(sum-count)
  };

  

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/driver-status/');
    socket.onmessage = handleWebSocketMessage;
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const selected = statuses.find(s => s.value === "available");
    setCoordinates(selected?.coordinates || []);
  }, []);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    const selected = statuses.find(s => s.value === status);
    setCoordinates(selected?.coordinates || []);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar/>
      <div className="flex w-full gap-6 p-10 bg-white rounded-md mt-10">
        <div className="w-1/2 flex flex-col gap-6">
          <div className='font-bold text-2xl'>
            Map View
          </div>
          <div className="flex flex-wrap gap-4">
            {statuses.map((status) => (
              <div
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className={`px-3 py-2 rounded-sm font-semibold transition-colors duration-300 focus:outline-none ${
                  selectedStatus === status.value
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                } cursor-pointer flex flex-col gap-2 items-center justify-center`}
              >
                <div>{status.label}</div>
                <div>{status.count}</div>
              </div>
            ))}
          </div>

          <div className="h-[50vh] bg-white rounded-lg shadow-md overflow-hidden">
            <Map coordinates={coordinates} />
          </div>
          <div className='font-bold text-2xl'>
            Admin Earnings
          </div>
          <div className="h-[50vh] bg-white rounded-lg shadow-md">
            <AdminEarningGraph/>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4 mt-12">
          <div className=" flex gap-3">
            <div className='flex flex-col gap-2 items-center justify-center bg-white rounded-lg shadow-md w-full px-12 py-4'>
              <div className='font-bold text-lg'>User</div>
              <div>{totalUserCount}</div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center bg-white rounded-lg w-full shadow-md px-12 py-4'>
              <div className='font-bold text-lg'>Active Drivers</div>
              <div>{activeDriverCount}</div>
            </div> 
            <div className='flex flex-col gap-2 items-center justify-center bg-white rounded-lg shadow-md w-full px-12 py-4'>
              <div className='font-bold text-lg'>Inactive Drivers</div>
              <div>{inactiveDriverCount}</div>
            </div> 
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className='font-bold text-2xl'>
              Tip statistics
            </div>
            <div className='h-[360px] w-full mt-16'>
            <TipData/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
