import React from 'react';
import { Bar, Pie } from 'react-chartjs-2'; // Assuming you are using Chart.js
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

const DataVisualization = ({ groupedExpenses }) => {
  // Check if groupedExpenses is valid before accessing its properties
  if (!groupedExpenses) {
    return <div>No data available for visualization</div>;
  }

  // Extract data for visualization (example: category names and total amounts)
  const categoryNames = Object.keys(groupedExpenses).map((categoryId) => groupedExpenses[categoryId].categoryName);
  const totalAmounts = Object.keys(groupedExpenses).map((categoryId) => groupedExpenses[categoryId].totalAmount);

  // Data for Bar Chart
  const barChartData = {
    labels: categoryNames,
    datasets: [
      {
        label: 'Total Amount',
        data: totalAmounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Data for Pie Chart
  const pieChartData = {
    labels: categoryNames,
    datasets: [
      {
        data: totalAmounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          // Add more colors as needed
        ],
      },
    ],
  };

  return (
    <div className="w-50 border border-1 border-success rounded p-4 mb-4 shadow">
      <h2>Bar Chart</h2>
      <Bar data={barChartData} />

      <h2>Pie Chart</h2>
      <Pie data={pieChartData} />
    </div>
  );
};

export default DataVisualization;