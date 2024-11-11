import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//styles/App.css';
import axios from 'axios';
import { API_URL } from '../config/config';

const JobStatistic: React.FC = () => {
  
  const [data, setData] = useState<{ title: string; experienceLevel: string[]; type: string[]; workingTime: string[]; workplaceType: string[]  } | null>(null);
  const [statistics, setStatistics] = useState<{ x: string; y: number }[]>([]); 

    axios.get(`${API_URL}/Create`, {
      params: {
          title: data?.title,
          experienceLevel: data?.experienceLevel,
          type: data?.type,
          workingTime: data?.workingTime,
          workplaceType: data?.workplaceType
      }
  })
  .then(response => {
    setStatistics(response.data.map((item: { x: string; y: number }) => ({ x: item.x, y: item.y })));
  })
  .catch(error => {
      console.error("Błąd Axios:", error);
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title') as string,
      experienceLevel: formData.getAll('experienceLevel') as string[],
      type: formData.getAll('type') as string[],
      workingTime: formData.getAll('workingTime') as string[],
      workplaceType: formData.getAll('workplaceType') as string[],
    };
    setData(data);
    console.log(data);
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
        <div id="ChartSelector">
          <h1 className='text-dark'>Statystyki zawodu</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <label htmlFor="title" className="form-label">Pozycja</label>
                <input name="title" type='text' className="form-select form-select-sm bg-dark text-light" />
              </div>

              <div className="col-md-3">
                <label htmlFor="experienceLevel" className="form-label">Doświadczenie</label>
                <select
                  name="experienceLevel"
                  className="form-select form-select-sm bg-dark text-light"
                  multiple
                >
                  <option value="junior">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                  <option value="c_level">C_level</option>
                </select>
              </div>

              <div className="col-md-3">
                <label htmlFor="type" className="form-label">Umowa:</label>
                <select
                  name="type"
                  className="form-select form-select-sm bg-dark text-light"
                  multiple
                >
                  <option value="b2b">B2B</option>
                  <option value="permanent">Umowa na czas nieokreślony</option>
                  <option value="contract">Umowa na czas określony</option>
                  <option value="internship">Staż</option>
                  <option value="mandate_contract">Umowa zlecenie</option>  
                </select>
              </div>

              <div className="col-md-3">
                <label htmlFor="workingTime" className="form-label">Wymiar Godzinowy</label>
                <select
                  name="workingTime"
                  className="form-select form-select-sm bg-dark text-light"
                  multiple
                >
                  <option value="full_time">Pełny etat</option>
                  <option value="part_time">Niepełny etat</option>
                  <option value="internship">Staż</option>
                  <option value="freelance">Freelance</option>
                  <option value="undetermined">Nieokreślone</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
                <label htmlFor="workplaceType" className="form-label">Forma zatrudnienia</label>
                <select
                  name="workplaceType"
                  className="form-select form-select-sm bg-dark text-light"
                  multiple
                >
                  <option value="remote">Zdalnie</option>
                  <option value="office">Biuro</option>
                  <option value="hybrid">Hybryda</option>
                </select>
              </div>

            <div className="text-center my-3">
              <button id="submit" type="submit" className="btn btn-dark m-1">
                Wybierz
              </button>
            </div>
          </form>
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

export default JobStatistic;