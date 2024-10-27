import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import ChartForm from './components/ChartsLogic/ChartForm/ChartForm';
import ShowChart from './components/ChartsLogic/ShowChart/ShowChart';

const App: React.FC = () => {

  const [data, setData] = useState<{ chartType: string; xAxis: string; yAxis: string; frequency: string } | null>(null);

  const handleFormSubmit = (formData: { chartType: string; xAxis: string; yAxis: string; frequency: string }) => 
  {
    setData(formData);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light" id="navbar">
        <div className="container">
          <link rel="icon" type="image/x-icon" href="/img/favicon.ico"></link>
          <span className="navbar-brand mb-0 h1">Profession Analytics</span>
          <button className="btn btn-dark">Strona Główna</button>
        </div>
      </nav>
      
      <div className="container justify-content-center align-items-center" id="content">
          <div id="ChartSelector">
            <ChartForm onSubmit={handleFormSubmit} />
          </div>
          <div id="rightcontainer" className="flex-grow-1 container text-center">
            <h2 className='text-light'>Wykres:</h2>
            {data ? (<ShowChart chartType={data.chartType} xAxis={data.xAxis} yAxis={data.yAxis} frequency={data.frequency} />) : null}
          </div>

      </div>

      <footer className="bg-light py-3" id="footer">
        <div className="container text-center">
          <span>Wykonał MrChazar</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
