import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//styles/App.css';
import axios from 'axios';
import { API_URL } from '../config/config';
import LineChart from '../components/Charts/LineChart';
import StackedAreaChart from '../components/Charts/StackedAreaChart';

const JobStatistic: React.FC = () => {
  const [jobRespone, SetJobResponse] = useState<{ x: string; addedOffers: number, averageSalary: number, cities: [string, number][], company: [string, number][], jobLinks: string }[]>([]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title') as string,
      skill: formData.get('skill') as string,
      experienceLevel: (formData.getAll('experienceLevel') as string[]).join(','),
      type: (formData.getAll('type') as string[]).join(','),
      workingTime: (formData.getAll('workingTime') as string[]).join(','),
      workplaceType: (formData.getAll('workplaceType') as string[]).join(','),
      frequency: formData.get('frequency') as string,
    };

    if (!data.title || !data.experienceLevel || !data.type || !data.workingTime || !data.workplaceType || !data.frequency) {
      window.alert("Wypełnij wszystkie pola");
      return;
    }
    
    axios.get(`${API_URL}/Job/CreateStatistic`, {
      params: {
          title: data.title,
          skill: data.skill,
          experienceLevel: data.experienceLevel,
          type: data.type,
          workingTime: data.workingTime,
          workplaceType: data.workplaceType,
          frequency: data.frequency
      }
    })
    .then(response => {
      SetJobResponse(response.data);
      console.log(response.data);
    })
    .catch(error => {
        console.error("Błąd Axios:", error);
    });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light" id="navbar">
        <div className="container">
          <link rel="icon" type="image/x-icon" href="/img/favicon.ico"></link>
          <span className="navbar-brand mb-0 h1"><a className='text-dark' href='MainPage'>Profession Analytics</a></span> 
          <div>
            <a href='ChartCreator'><button className="btn btn-dark m-1">Kreator Wykresów</button></a>
            <a href='JobStatistic'><button className="btn btn-dark m-1">Statystyki zawodu</button></a>
          </div>
        </div>
      </nav>
      
      <div className="container justify-content-center align-items-center" id="content">
        <div id="ChartSelector">
          <h1 className='text-dark'>Statystyki zawodu</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col m-1">
                <label htmlFor="title" className="form-label">Pozycja</label>
                <input name="title" type='text' className="form-select form-select-sm bg-dark text-light" />
              </div>

              <div className="col m-1">
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

              <div className="col m-1">
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
            </div>
            <div className="row">
              <div className="col m-1">
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

            <div className="col m-1">
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

            <div className="col m-1">
              <label htmlFor="skill" className="form-label">Umiejętności</label>
              <input name="skill" type='text' className="form-select form-select-sm bg-dark text-light" />
            </div>

            <div className="col m-1">
              <label htmlFor="frequency" className="form-label">Frekwencja</label>
              <select
              name="frequency"
              className="form-select form-select-sm bg-dark text-light"
              >
                <option value="yyyy-MM-dd">Dzienna</option>
                <option value="yyyy-MM">Miesięczna</option>
                <option value="yyyy">Roczna</option>
            </select>
            </div>

            </div>
            <div className="text-center my-3">
              <button id="submit" type="submit" className="btn btn-dark m-1">
                Wybierz
              </button>
            </div>
          </form>
      </div>    
      </div>

      <div id="rightcontainer" className="flex-grow-1 container text-center">
          {jobRespone.length > 0 ? (<>
          <h2 className='text-light'>Wykres Dodanych Ofert</h2>
          <LineChart 
          data={jobRespone.map(item => ({
            xAxis: item.x,
            yAxis: item.addedOffers
          }))}
          width={800}
          height={400}
          /></>
          ) : null}
      </div>

      <div id="rightcontainer" className="flex-grow-1 container text-center">
        {jobRespone.length > 0 ? (<>
            <h2 className='text-light'>Wykres Średnich Zarobków</h2>
            <LineChart 
            data={jobRespone.map(item => ({
              xAxis: item.x,
              yAxis: item.averageSalary
            }))}
            width={800}
            height={400}
            />
            </>) : null}
      </div>

      <div id="rightcontainer" className="flex-grow-1 container text-center">
        {jobRespone.length > 0 ? (<>
            <h2 className='text-light'>Linki Ofert</h2>
              {jobRespone.map(item => (
                <a className='m-1' target="_blank" rel="noopener noreferrer" href={item.jobLinks}>{item.jobLinks}</a>
              ))}
            </>) : null}
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