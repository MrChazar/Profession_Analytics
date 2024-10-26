import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import axios from 'axios';
import LineChart from './components/LineChart';

const App: React.FC = () => {
  const [timeSerie, setTimeSerie] = useState<{ date: string; value: number }[]>([]);
  const [earningSerie, setEarningSerie] = useState<{ date: string; value: number }[]>([]);

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

  const GetAverageTimeSerie = () => {
      axios.get(`${url}/Job/DailyAverageEarning`)
          .then(response => {
              setEarningSerie(response.data);
          })
          .catch(error => {
              console.error("Błąd Axios:", error);
          });
  };

  useEffect(() => {
      GetJobTimeSerie();
      GetAverageTimeSerie();
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
              <h1 className='text-dark'>Kreator Wykresów</h1>
              <form >
                  <div className="form-group d-flex">
                      <label>Typy Wykresów:</label>
                      <select className="form-control" onChange={(e) => {/* Handle chart type change */}}>
                          <option>Liniowy</option>
                          <option>Kołowy</option>
                          <option>Powierzchniowy</option>
                      </select>

                      <label>Oś x:</label>
                      <select className="form-control" >
                          <option>Data</option>
                          <option>Wartość</option>
                      </select>

                      <label>Oś y:</label>
                      <select className="form-control">
                          <option>Data</option>
                          <option>Wartość</option>
                      </select>

                      <label>Częstotliwość:</label>
                      <select className="form-control">
                          <option>Dzienna</option>
                          <option>Miesięczna</option>
                          <option>Roczna</option>
                      </select>
                  </div>
                  <button id='submit' type="submit" className="btn btn-dark">Wybierz</button>
              </form>
          </div>

          <div id="rightcontainer" className="flex-grow-1 container text-center">
            <h2 className='text-light'>Wykres:</h2>
            <LineChart data={timeSerie} width={800} height={400} /> {/* Używamy danych do wykresu */}
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
