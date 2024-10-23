import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface LineChartProps {
  data: { date: string; value: number }[];
  width: number;
  height: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width, height }) => {
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
    debugger
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    debugger
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
      .range([0, chartWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([chartHeight, 0]);

    const line = d3.line<{ date: string; value: number }>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value));

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    return () => {
      svg.selectAll('*').remove(); // Czyści wykres przed każdą aktualizacją
    };
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
