import React, { useState } from 'react';
import './ChartForm.css';

interface FormData {
  chartType: string;
  xAxis: string;
  yAxis: string;
  frequency: string;
}

interface FormComponentProps {
  onSubmit: (data: FormData) => void;
}

const ChartForm: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    chartType: '',
    xAxis: '',
    yAxis: '',
    frequency: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return formData.chartType !== '' && formData.xAxis !== '' && formData.yAxis !== '' && formData.frequency !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Wypełnij wszystkie pola');
      return;
    }
    onSubmit(formData);
    setFormData({ chartType: '', xAxis: '', yAxis: '', frequency: '' });
  };

  return (
    <>
      <h1 className="text-dark">Kreator Wykresów</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group d-flex">

          <label htmlFor="chartType">Typy Wykresów:</label>
          <select name="chartType" value={formData.chartType} onChange={handleChange} className="form-control">
            <option value="">Wybierz:</option>
            <option value="Liniowy">Liniowy</option>
            <option value="Kołowy">Kołowy</option>
            <option value="Powierzchniowy">Powierzchniowy</option>
          </select>
          
          <label htmlFor="xAxis">Oś x:</label>
          <select name="xAxis" value={formData.xAxis} onChange={handleChange} className="form-control">
            <option value="">Wybierz:</option>
            
            {(formData.chartType === 'Liniowy' || formData.chartType === 'Powierzchniowy')  && 
            <option value="Data">Data</option>
            
            }

          </select>

          <label htmlFor="yAxis">Oś y:</label>
          <select name="yAxis" value={formData.yAxis} onChange={handleChange} className="form-control">
            <option value="">Wybierz:</option>

            {formData.chartType === 'Liniowy' && (
              <>
              <option value="Dodane Oferty">Dodane Oferty</option>
              <option value="Zarobki">Zarobki</option>
              </>
            )}

            {formData.chartType === 'powierzchniowy' &&
              <>
              <option value="Doświadczenie">Doświadczenie</option>
              </> 
            }

          </select>

          <label htmlFor="frequency">Częstotliwość:</label>
          <select name="frequency" value={formData.frequency} onChange={handleChange} className="form-control">
            <option value="">Wybierz:</option>
            <option value="Dzienna">Dzienna</option>
            <option value="Miesięczna">Miesięczna</option>
            <option value="Roczna">Roczna</option>
          </select>
        </div>
        <button id="submit" type="submit" className="btn btn-dark">Wybierz</button>
      </form>
    </>
  );
};

export default ChartForm;
