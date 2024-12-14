import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

// Function to format the date to yyyy-mm
const formatDate = (date) => {
  const [year, month] = date.split('-');
  return `${year}-${month}`;
};

// Group data by month (yyyy-mm)
const groupDataByMonth = (data) => {
  const grouped = {};

  data.forEach(({ date, amount }) => {
    const month = formatDate(date);
    if (!grouped[month]) {
      grouped[month] = 0;
    }
    grouped[month] += amount;
  });

  return Object.entries(grouped).map(([month, totalAmount]) => ({
    month,
    totalAmount,
  }));
};

const ContributionPieChart = ({ data }) => {
  const processedData = groupDataByMonth(data);

  const rainbowColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F',
    '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F',
  ];

  const pieData = {
    labels: processedData.map(d => d.month), // These are only for tooltips
    datasets: [
      {
        data: processedData.map(d => d.totalAmount),
        backgroundColor: rainbowColors.slice(0, processedData.length),
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = processedData.reduce((sum, d) => sum + d.totalAmount, 0);
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            const month = tooltipItem.label;

            return `${month}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div >
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
};

export default ContributionPieChart;
