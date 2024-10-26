import React from 'react';
import { LineChart } from '@mui/x-charts';
import '../styles/App.css';

interface StackedAreaChartProps {
  data: { x: number; y: number }[];
  width: number;
  height: number;
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data, width, height }) => {
  return (
    <LineChart
      xAxis={[{ data: data.map(d => d.x) }]}
      series={[
        {
          data: data.map(d => d.y),
          area: true,  // Ustawienie wykresu obszarowego
          label: 'Wykres obszarowy',
        },
      ]}
      width={width}
      height={height}
    />
  );
};

export default StackedAreaChart;
