import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import axios from 'axios';
import LineChart from './components/Charts/LineChart';
import ChartForm from './components/ChartsLogic/ChartForm/ChartForm';

const App: React.FC = () => {

  const [timeSerie, setTimeSerie] = useState<{ date: string; value: number }[]>([]);

  const handleFormSubmit = (data: { chartType: string; xAxis: string; yAxis: string; frequency: string }) => {
    console.log("Form submitted data:", data);
  };

  const url = "https://localhost:7281";

  const GetJobTimeSerie = () => {
      axios.get(`${url}/Job/JobTimeSeries`)
          .then(response => {
              setTimeSerie(response.data);
          })
          .catch(error => {
              console.error("Błąd Axios:", error);
          });
  };

  useEffect(() => {
      GetJobTimeSerie();
  }, []); 

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
            <>
            ?{timeSerie.length > 0 && <LineChart data={timeSerie} width={800} height={400} />}
            </>
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
