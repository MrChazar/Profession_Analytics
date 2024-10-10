import React, { useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { setupD3 } from './charts/simple_chart';

const App: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="App">
      {/* Pasek nagłówka */}
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Profession Analytics</span>
          <button className="btn btn-primary">Strona Główna</button>
        </div>
      </nav>

      {/* Wykres */}
      <div className="container my-5">
        <h2 className="text-center">Ilość ofert na przestrzeni czasu</h2>
        
        <div id="chart">
          {<setupD3 />}
        </div>
      </div>

      {/* Stopka */}
      <footer className="bg-light py-3">
        <div className="container text-center">
          <span>Wykonał MrChazar</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
