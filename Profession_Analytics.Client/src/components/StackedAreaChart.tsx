import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface StackedAreaChartProps {
  data: DataPoint[]; 
  width: number;
  height: number;
}

interface DataPoint {
  date: string;
  [key: string]: number | string; 
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f4f4f4')
      .style('margin', 'auto')
      .style('display', 'block');

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const keys = Object.keys(data[0]).filter(key => key !== 'date'); 

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
      .range([0, chartWidth]);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).ticks(5));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.sum(keys, key => d[key] as number))!]) 
      .range([chartHeight, 0]);

    g.append('g')
      .call(d3.axisLeft(y));

    // Kolory dla każdej grupy
    const color = d3.scaleOrdinal<string>()
      .domain(keys)
      .range(d3.schemeCategory10); 

    const stackedData = d3.stack()
      .keys(keys)
      (data as any); 

    const area = d3.area<any>()
      .x(d => x(new Date(d.data.date))) 
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    g.selectAll('layers')
      .data(stackedData)
      .enter()
      .append('path')
      .attr('fill', d => color(d.key)!)
      .attr('d', area);

      const legend = svg.append('g')
      .attr('transform', `translate(${margin.left},${height + 20})`); // Umieszczenie poniżej wykresu

    legend.selectAll('rect')
      .data(keys)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 120) // Odstęp między legendami
      .attr('y', 0)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', d => color(d));

    legend.selectAll('text')
      .data(keys)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 120 + 24)
      .attr('y', 13)
      .text(d => d)
      .style('font-size', '14px')
      .attr('alignment-baseline', 'middle');

    return () => {
      svg.selectAll('*').remove();
    };
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default StackedAreaChart;
