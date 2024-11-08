import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//styles/App.css';
import ChartForm from '..//components/ChartsLogic/ChartForm/ChartForm';
import ShowChart from '..//components/ChartsLogic/ShowChart/ShowChart';

const MainPage: React.FC = () => {

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
          <span className="navbar-brand mb-0 h1"><a className='text-dark' href='MainPage'>Profession Analytics</a></span> 
          <div>
            <button className="btn btn-dark m-1"><a href='ChartCreator'>Kreator Wykresów</a></button>
            <button className="btn btn-dark m-1"><a href='JobStatistic'>Statystyki zawodu</a></button> 
          </div>
          
        </div>
      </nav>
      
      <div className="container justify-content-center align-items-center" id="content">
            <h1 className='text-light'>Strona Główna</h1>
      </div>

      <footer className="bg-light py-3" id="footer">
        <div className="container text-center text-dark">
          <span>Wykonał MrChazar</span>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;