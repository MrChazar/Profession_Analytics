import './ShowChart.css';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL} from '../../../config/config';
import LineChart from '../../Charts/LineChart';
import { Console } from 'console';

interface FormDataProps {
  chartType: string;
  xAxis: string;
  yAxis: string;
  frequency: string;
}

const ShowChart: React.FC<FormDataProps> = ({ chartType, xAxis, yAxis, frequency }) => {
    debugger
    

    const [lineChartData, setlineChartData] = useState<{ xAxis: string; yAxis: number }[]>([]);

    const GetLineChartData = () => {
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
    };

    switch(chartType) 
    {
        case 'Liniowy':
            GetLineChartData();
            chartType = '';
            break;
        default:
            break;
    }

    return (
        <>
        <div id="carry">
            {lineChartData ? (<LineChart data={lineChartData} width={800} height={400} />) : null}
        </div>
        </>
    );
};

export default ShowChart;
