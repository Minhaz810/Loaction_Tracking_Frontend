import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminEarningGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Earning",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin-earnings/');
        const data = await response.json();
        const records = data.records;
        const labels = records.map(record => new Date(record.datetime).toLocaleTimeString());
        const earnings = records.map(record => parseFloat(record.earning));

        setChartData({
          labels,
          datasets: [
            {
              label: "Earning",
              data: earnings,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching admin earnings data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Earning ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-auto w-full p-4 flex gap-12">
      <Line data={chartData} options={options} />
      <div class="flex mt-8 gap-12">
        <div class="bg-green-100 text-green-800 p-6 rounded-lg shadow-lg text-center flex flex-col justify-center">
          <h2 class="text-xl font-bold">Total Earning</h2>
          <p class="text-3xl mt-4 font-semibold">$15,000</p>
        </div>

        <div class="bg-green-100 text-green-800 p-6 rounded-lg shadow-lg text-center flex flex-col justify-center">
          <h2 class="text-xl font-bold">Total Outstanding</h2>
          <p class="text-3xl mt-4 font-semibold">$4,200</p>
        </div>
      </div>
    </div>
  );
};

export default AdminEarningGraph;
