import React from 'react';
import { LineChart, axisClasses } from '@mui/x-charts';

interface LineChartProps {
  data: { xAxis: string; yAxis: number }[];
  width: number;
  height: number;
}

const MuiLineChart: React.FC<LineChartProps> = ({ data, width, height }) => {
  const formattedData = data.map(d => ({
    x: new Date(d.xAxis), 
    y: d.yAxis,
  }));
  

  return (
    <LineChart
      width={width}
      height={height}
      xAxis={[{ data: formattedData.map(d => new Date(d.x)), label: "Daty",scaleType: "time" }]} 
      series={[{ data: formattedData.map(d => d.y), area: true, color: 'steelblue' }]}
      sx={{
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: '#FFFFFF', 
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: '#FFFFFF', 
          },
          [`.${axisClasses.label}`]: {
            fill: '#FFFFFF',
          }
        },
      }}
    />
  );
};

export default MuiLineChart;
