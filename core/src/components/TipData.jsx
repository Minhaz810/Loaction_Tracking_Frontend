import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const TipData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tips/');
        const data = await response.json();
        
        const statusCounts = data;
        const labels = Object.keys(statusCounts);
        const counts = Object.values(statusCounts);

        setData({
          labels: labels,
          datasets: [
            {
              data: counts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        });
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full h-72">
      <Pie data={data}/>
    </div>
  );
};

export default TipData;