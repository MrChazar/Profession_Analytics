import React, { useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LineChart from './components/LineChart';
import StackedAreaChart from './components/StackedAreaChart'; 
import axios from 'axios';
import { useState } from 'react';

const App: React.FC = () => {
  

  const url = "https://localhost:7281";
  const [timeSerie, setTimeSerie] = useState<{ date: string; value: number }[]>([]);
  const [earningSerie, setEarningSerie] = useState<{ date: string; value: number }[]>([]);

  const GetJobTimeSerie = () => {
    axios.get(url + "/Job/JobTimeSeries")
      .then(response => {
        setTimeSerie(response.data);
      })
      .catch(error => {
        console.error("Błąd Axios:", error);
      });
  };

  const GetAverageTimeSerie = () => {
    axios.get(url + "/Job/DailyAverageEarning")
      .then(response => {
        console.log(response.data);
        setEarningSerie(response.data);
      })
      .catch(error => {
        console.error("Błąd Axios:", error);
      });
  };

  interface DataPoint {
    date: string;
    [key: string]: number | string; 
  }

  const sampleData: DataPoint[] = [
    { date: '2023-01-01', categoryA: 30, categoryB: 20, categoryC: 50 },
    { date: '2023-02-01', categoryA: 20, categoryB: 30, categoryC: 40 },
    { date: '2023-03-01', categoryA: 40, categoryB: 10, categoryC: 60 },
    { date: '2023-04-01', categoryA: 50, categoryB: 40, categoryC: 70 },
    { date: '2023-05-01', categoryA: 60, categoryB: 50, categoryC: 80 },
    { date: '2023-06-01', categoryA: 70, categoryB: 60, categoryC: 90 }
  ];
  

  useEffect(() => {
    GetJobTimeSerie();
    GetAverageTimeSerie();
  }, []); 

   
  

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <link rel="icon" type="image/x-icon" href="/img/favicon.ico"></link>
          <span className="navbar-brand mb-0 h1">Profession Analytics</span>
          <button className="btn btn-primary">Strona Główna</button>
        </div>
      </nav>
      
      <div className="container justify-content-center align-items-center">

        <div id="ChartSelector">
          <h1 className='text-dark'>Kreator Wykresów</h1>
          <form>
            <div className="form-group d-flex">
              <label>Typy Wykresów zawód:</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Liniowy</option>
                <option>Kołowy</option>
                <option>Powierzchniowy</option>
                <option></option>
              </select>

              <label >Pole x:</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Data</option>
                <option>Wartość</option>
              </select>

              <label >Pole y:</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Data</option>
                <option>Wartość</option>
              </select>

              <label >Częstotliwość:</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Dzienna</option>
                <option>Miesięczna</option>
                <option>Roczna</option>
              </select>
            </div>

            <button id='submit' type="submit" className="btn btn-dark">Wybierz</button>

          </form>
        </div>

        <div id="rightcontainer" className="flex-grow-1 container my-5 text-center">

          <div>
            <h2 className='text-light'>Oferty dodane w czasie</h2>
            <LineChart data={timeSerie} width={1200} height={500} />
          </div>

          <div>
            <h2 className='text-light'>Średnie zarobki dodanych ofert</h2>
            <LineChart data={earningSerie} width={1200} height={500} />
          </div>

          <div>
            <h2 className='text-light'>Doświadczenie dodanych prac</h2>
            <StackedAreaChart data={sampleData} width={1200} height={500} />
          </div>

        </div>

      </div>

      

      <footer className="bg-light py-3">
        <div className="container text-center">
          <span>Wykonał MrChazar</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
