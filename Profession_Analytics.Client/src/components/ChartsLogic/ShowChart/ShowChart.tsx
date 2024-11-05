import './ShowChart.css';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../config/config';
import LineChart from '../../Charts/LineChart';

interface FormDataProps {
    chartType: string;
    xAxis: string;
    yAxis: string;
    frequency: string;
}

const ShowChart: React.FC<FormDataProps> = ({ chartType, xAxis, yAxis, frequency }) => {
    const [lineChartData, setlineChartData] = useState<{ xAxis: string; yAxis: number }[]>([]);

    useEffect(() => {
        if (chartType === 'Lined') {
            axios.get(`${API_URL}/Create`, {
                params: {
                    type: chartType,
                    x: xAxis,
                    y: yAxis,
                    frequency: frequency
                }
            })
            .then(response => {
                setlineChartData(response.data.map((item: { x: string; y: number }) => ({ xAxis: item.x, yAxis: item.y })));
            })
            .catch(error => {
                console.error("Błąd Axios:", error);
            });
        }
    }, [chartType, xAxis, yAxis, frequency]);

    return (
        <div id="carry">
            {lineChartData.length > 0 ? (<LineChart data={lineChartData} width={800} height={400} />) : null}
        </div>
    );
};

export default ShowChart;
