import React, { useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LineChart from './components/LineChart';
import axios from 'axios';
import { useState } from 'react';

const App: React.FC = () => {
  

  const url = "https://localhost:7281";
  debugger
  const [result, setResult] = useState<{ date: string; value: number }[]>([]);

  const GetJobTimeSerie = () => {
    axios.get(url + "/Job/JobTimeSeries")
      .then(response => {
        console.log("Odpowiedź z API:", response.data);
        setResult(response.data);
        window.alert("Pobrano pomyślnie");
      })
      .catch(error => {
        console.error("Błąd Axios:", error);
        window.alert("Wystąpił błąd");
      });
  };

  useEffect(() => {
    GetJobTimeSerie();
  }, []); 

   
  

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Profession Analytics</span>
          <button className="btn btn-primary">Strona Główna</button>
        </div>
      </nav>

      <div className="container my-5 text-center">
        <h1 className="text-center text-light">Wykresy:</h1>
        
        <div className="grid">

          <div>
            <h2 className='text-light'>Oferty dodane w czasie</h2>
            <LineChart data={result} width={500} height={400} />
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
