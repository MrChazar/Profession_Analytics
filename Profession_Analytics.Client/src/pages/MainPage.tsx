import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//styles/App.css';
import ChartForm from '..//components/ChartsLogic/ChartForm/ChartForm';
import ShowChart from '..//components/ChartsLogic/ShowChart/ShowChart';

const MainPage: React.FC = () => {
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
            <div id="ChartSelector">
              <h1 className='text-dark'>Witaj na mojej stronie</h1>
              <p>
                Będziesz mógł na niej sprawdzić aktualnie panujące trendy w branży IT na podstawie danych jakie oferuje
                serwis justjoin.pl. Moja strona oferuje następujące narzędzia:
              </p>
            </div>
            <div id="ChartSelector">
              <h2 className='text-dark' >Kreator Wykresów</h2>
              <p>Narzędzie to umożliwi za pomocą wykresów sprawdzenie rynku pod względem różnych parametrów</p>
              <button className="btn btn-dark m-1"><a href='ChartCreator'>Sprawdź narzędzie</a></button>
            </div>
            <div id="ChartSelector">
              <h2 className='text-dark' >Statystyki zawodu</h2>
              <p>Narzędzie to umożliwia sprawdzenia statystyk danych pozycji na rynku IT</p>
              <button className="btn btn-dark m-1"><a href='JobStatistic'>Sprawdź narzędzie</a></button>
            </div>
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