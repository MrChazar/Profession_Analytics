import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobStatistics from './pages/JobStatistic';
import ChartCreator from './pages/ChartCreator';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/JobStatistic" element={<JobStatistics />} />
          <Route path="/ChartCreator" element={<ChartCreator />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
