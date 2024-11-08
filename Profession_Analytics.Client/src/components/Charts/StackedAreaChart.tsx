import React from 'react';
import { LineChart, axisClasses } from '@mui/x-charts';
import "./StackedAreaChart.css";


interface StackedAreaChartProps {
  data: { xAxis: string; yAxis: { item1: string; item2: number }[] }[];
  width: number;
  height: number;
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data = [], width, height }) => {
  debugger
  // Obsługa przypadku braku danych
  if (!data.length) {
    return <div>No data available</div>;
  }

  // Wyodrębnienie unikalnych etykiet dla serii
  const seriesLabels = Array.from(
    new Set(data.flatMap(d => (d.yAxis ? d.yAxis.map(item => item.item1) : []))) // Sprawdzenie, czy `d.y` istnieje
  );

  // Transformacja danych dla każdej serii
  const transformedData = seriesLabels.map(label => ({
    label,
    data: data.map(d => {
      const match = d.yAxis ? d.yAxis.find(item => item.item1 === label) : undefined; // Sprawdzenie, czy `y` istnieje
      return match ? match.item2 : 0; // Wartość 0, jeśli brak dopasowania
    }),
  }));


  return (
    <LineChart
      xAxis={[{ data: data.map(d => new Date(d.xAxis)), label: "Daty", scaleType: "time" }]}
      series={transformedData.map(series => ({
        data: series.data,
        stack: 'total',
        stackOffset: 'none',
        area: true,
        label: series.label,
        showMark: false,
      }))}
      width={width}
      height={height}
      slotProps={{
        legend: {
            direction: 'row',
            position: { vertical: 'top', horizontal: 'left' },
            itemGap: 62,
            hidden: true
        },
    }}
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
          },
          '.MuiChart-legendLabel': {
          fill: '#FFFFFF', // Biały kolor dla etykiet serii
        },
        },
      }}
    />
  );
};

export default StackedAreaChart;
