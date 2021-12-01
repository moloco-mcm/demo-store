import React from 'react';
import { useTheme } from 'styled-components/macro';
import { Bar } from 'react-chartjs-2';

import { color } from '@rmp-demo-store/ui/theme-utils';

type Props = {
  type?: 'vertical' | 'horizontal';
  labels: string[];
  data: number[];
};

export const BarChart = (props: Props) => {
  const { type = 'vertical', labels, data: dataProp } = props;
  const theme = useTheme();

  const data = {
    labels,
    datasets: [
      {
        data: dataProp,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    barPercentage: 0.6,
    indexAxis: type === 'horizontal' ? 'y' : 'x',
    plugins: {
      legend: {
        display: false,
      },
    },
    backgroundColor: color('blue.500')({ theme }),
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={data} options={options} />;
};
