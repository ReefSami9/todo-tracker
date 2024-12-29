'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ completed, pending }: { completed: number; pending: number }) => {
      const data = {
            labels: ['Completed', 'Pending'],
            datasets: [
                  {
                        label: 'Todos Progress',
                        data: [completed, pending],
                        backgroundColor: ['#C3E9D7', '#DFCDC5'],
                        hoverBackgroundColor: ['#ACDEC8', '#C2A499'],
                  },
            ],
      };

      const chartOptions = {
            cutout: '70%',
            plugins: {
                  legend: {
                        display: true,
                        position: 'top' as const,
                  },
                  tooltip: {
                        enabled: true,
                  },
            },
      };

      return (
            <div style={{ width: '300px', margin: '0 auto' }}>
                  <Doughnut data={data} options={chartOptions} />
            </div>
      );
};

export default DonutChart;
