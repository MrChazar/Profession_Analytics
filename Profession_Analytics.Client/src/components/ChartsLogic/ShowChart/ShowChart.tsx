import React from 'react';


interface FormData {
    chartType: string;
    xAxis: string;
    yAxis: string;
    frequency: string;
}

const ShowChart: React.FC = () => {
    return (
        <div>
            <h1>Show Chart</h1>
            <p>This is where the chart will be displayed.</p>
        </div>
    );
};

export default ShowChart;