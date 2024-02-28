import React, { useEFfect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../../App.css';


const BarChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      // How do I obtain the data from the database?
      

      // data: {
      //   labels: ['January', 'February', 'March', 'April', 'May'],
      //   datasets: [{
      //     label: 'Sales',
      //     data: [12, 19, 3, 5, 2],
      //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //     borderColor: 'rgba(54, 162, 235, 1)',
      //     borderWidth: 1
      //   }]
      // },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;

