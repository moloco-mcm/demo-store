import React from 'react';
import { useTheme } from 'styled-components/macro';
import { Doughnut } from 'react-chartjs-2';

import { color } from '@rmp-demo-store/ui/theme-utils';

type Props = {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
};

export const DoughnutChart = (props: Props) => {
  const { labels, data: dataProp, backgroundColor } = props;

  const theme = useTheme();

  const data = {
    labels,
    datasets: [
      {
        data: dataProp,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
    backgroundColor: color('blue.500')({ theme }),
    borderWidth: 0,
  };

  return <Doughnut data={data} options={options} />;
};
