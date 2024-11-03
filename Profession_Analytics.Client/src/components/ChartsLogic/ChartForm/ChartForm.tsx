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
    <div className="container">
    <h1 className="text-dark text-center my-4">Kreator Wykresów</h1>
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-3">
          <label htmlFor="chartType" className="form-label">Typy Wykresów:</label>
          <select
            name="chartType"
            value={formData.chartType}
            onChange={handleChange}
            className="form-select form-select-sm bg-dark text-light"
          >
            <option value="">Wybierz:</option>
            <option value="Liniowy">Liniowy</option>
            <option value="Kołowy">Kołowy</option>
            <option value="Powierzchniowy">Powierzchniowy</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="xAxis" className="form-label">Oś x:</label>
          <select
            name="xAxis"
            value={formData.xAxis}
            onChange={handleChange}
            className="form-select form-select-sm bg-dark text-light"
          >
            <option value="">Wybierz:</option>
            {(formData.chartType === 'Liniowy' || formData.chartType === 'Powierzchniowy') && (
              <option value="Data">Data</option>
            )}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="yAxis" className="form-label">Oś y:</label>
          <select
            name="yAxis"
            value={formData.yAxis}
            onChange={handleChange}
            className="form-select form-select-sm bg-dark text-light"
          >
            <option value="">Wybierz:</option>
            {formData.chartType === 'Liniowy' && (
              <>
                <option value="Dodane Oferty">Dodane Oferty</option>
                <option value="Zarobki">Zarobki</option>
              </>
            )}
            {formData.chartType === 'powierzchniowy' && (
              <option value="Doświadczenie">Doświadczenie</option>
            )}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="frequency" className="form-label">Częstotliwość:</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="form-select form-select-sm bg-dark text-light"
          >
            <option value="">Wybierz:</option>
            <option value="Dzienna">Dzienna</option>
            <option value="Miesięczna">Miesięczna</option>
            <option value="Roczna">Roczna</option>
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
  );
};

export default ChartForm;
