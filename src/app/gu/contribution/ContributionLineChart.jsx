import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

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

const ContributionLineChart = ({ data }) => { // Destructure 'data' from props
  // Process the data to create the chart
  const processedData = groupDataByMonth(data);

  const lineData = {
    labels: processedData.map(d => d.month), // The months for the x-axis
    datasets: [
      {
        label: 'Total Contributions',
        data: processedData.map(d => d.totalAmount), // The total contribution amounts
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)', // Light blue background for the line
        fill: true, // Fill under the line
        tension: 0.4, // Smooth the line
      },
    ],
  };

  return (
    <div >
      <Line data={lineData} />
    </div>
  );
};

export default ContributionLineChart;
